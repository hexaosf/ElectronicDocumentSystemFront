import { Button, message } from "antd";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { useState } from "react";
import { arrayByteToHex, sm2_encrypt, sm3_encrypt, sm4_encrypt } from "@/utils/commercial_cryptography";
import { uploadSm2Api, uploadSm3Api, uploadSm4Api } from "@/api/modules/file";
import { encrypt } from "@/utils/rsa";

const Submit = (props: any) => {
	const { encryption, encryptionKey, sm2TargetUsername, file } = props;
	const { t } = useTranslation();
	const [loadings, setLoadings] = useState<boolean>(false);
	const submit = async () => {
		if (file) {
			setLoadings(true);
			const reader = new FileReader();
			reader.onload = upload_load;
			reader.onerror = function () {
				message.error("There was an error reading the file");
				setLoadings(false);
			};
			reader.readAsArrayBuffer(file);
		} else {
			message.warning("No files are selected");
		}
	};
	const upload_load = async (event: ProgressEvent<FileReader>) => {
		if (!event.target) {
			setLoadings(false);
			message.error("There was an error reading the file");
			return;
		}
		const content = event.target.result;
		switch (encryption) {
			case "sm2":
				sm2Upload(content as ArrayBuffer);
				break;
			case "sm3":
				sm3Upload(content as ArrayBuffer);
				break;
			case "sm4":
				sm4Upload(content as ArrayBuffer);
				break;
		}
	};
	const sm2Upload = async (content: ArrayBuffer) => {
		const enData = sm2_encrypt(content, encryptionKey);
		try {
			await uploadSm2Api({
				filename: file.name,
				size: file.size,
				targetUsername: sm2TargetUsername,
				content: enData,
				type: file.type
			});
		} finally {
			setLoadings(false);
		}
	};
	const sm3Upload = async (content: ArrayBuffer) => {
		// 将Blob数据转换为16进制字符串
		const hexArr = arrayByteToHex(content);
		const enData = sm3_encrypt(hexArr);
		try {
			await uploadSm3Api({
				filename: file.name,
				size: file.size,
				enContent: enData,
				content: hexArr,
				type: file.type
			});
		} finally {
			setLoadings(false);
		}
	};
	const sm4Upload = async (content: ArrayBuffer) => {
		// 将Blob数据转换为16进制字符串
		const hexArr = arrayByteToHex(content);
		const enData = sm4_encrypt(hexArr, encryptionKey);
		const enkey = encrypt(encryptionKey);
		try {
			await uploadSm4Api({
				filename: file.name,
				size: file.size,
				sm4Key: enkey as string,
				content: enData,
				type: file.type
			});
		} finally {
			setLoadings(false);
		}
	};
	return (
		<Button type="primary" htmlType="button" onClick={() => submit()} loading={loadings}>
			{t("upload.submitLabel")}
		</Button>
	);
};
const mapStateToProps = (state: any) => state.file;
export default connect(mapStateToProps, null)(Submit);
