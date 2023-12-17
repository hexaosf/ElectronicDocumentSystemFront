import { message, Select } from "antd";
import { useEffect, useState } from "react";
import { getSm4KeyListApi } from "@/api/modules/keys";
import { getSm2PubKeyApi, getUserListApi } from "@/api/modules/user";
import { serSm2TargetUsername, setEncryptionKey } from "@/redux/modules/file/action";
import { connect } from "react-redux";
import { decrypt } from "@/utils/rsa";

const KeySelector = (props: any) => {
	const { encryption, setEncryptionKey: setEncryptionKeyAction, serSm2TargetUsername: serSm2TargetUsernameAction } = props;
	const [loading, setLoading] = useState<boolean>(false);
	const [keyList, setKeyList] = useState<{ value: string; label: string }[]>([]);
	const [value, setValue] = useState<string>("");

	const handleChange = async (value: string) => {
		if (encryption === "sm2") {
			const data = await getSm2PublicKey(value);
			if (!data) {
				message.error("Failed to obtain the user's public key");
				setEncryptionKeyAction("");
				return;
			}
			const decrypt_value = decrypt(data);
			if (!decrypt_value) {
				message.error("Failed to obtain the user's public key");
				setEncryptionKeyAction("");
				return;
			}
			setEncryptionKeyAction(decrypt_value);
			serSm2TargetUsernameAction(value);
		} else {
			setEncryptionKeyAction(value);
		}
		setValue(value);
	};

	const getSm2PublicKey = async (value: string) => {
		const { data } = await getSm2PubKeyApi({ username: value });
		return data;
	};

	const getSm4List = async () => {
		setLoading(true);
		const { data } = await getSm4KeyListApi();
		if (!data) {
			setLoading(false);
			message.error("get sm4 keys failed");
			return;
		}
		setKeyList(data.map((item: string) => ({ value: item, label: item })));
		setLoading(false);
	};
	const getUserList = async () => {
		setLoading(true);
		const { data } = await getUserListApi();
		if (!data) {
			setLoading(false);
			message.error("get user list failed");
			return;
		}
		setKeyList(data.map((item: string) => ({ value: item, label: item })));
		setLoading(false);
	};

	useEffect(() => {
		setKeyList([]);
		setValue("");
		switch (encryption) {
			case "sm2":
				getUserList();
				break;
			case "sm3":
				break;
			case "sm4":
				getSm4List();
				break;
		}
	}, [encryption]);

	return (
		<>
			<Select value={value} style={{ width: "100%" }} onChange={handleChange} loading={loading} options={keyList} />
		</>
	);
};
const mapStateToProps = (state: any) => state.file;
const mapDispatchToProps = { setEncryptionKey, serSm2TargetUsername };
export default connect(mapStateToProps, mapDispatchToProps)(KeySelector);
