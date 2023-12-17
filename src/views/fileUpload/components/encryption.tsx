import { Radio, RadioChangeEvent } from "antd";
import { setEncryption } from "@/redux/modules/file/action";
import { connect } from "react-redux";

const Encryption = (props: any) => {
	const { encryption, setEncryption: setEncryptionAction } = props;
	const onEncryptionChange = (e: RadioChangeEvent) => {
		setEncryptionAction(e.target.value);
	};
	return (
		<>
			<Radio.Group onChange={onEncryptionChange} value={encryption}>
				<Radio value="sm2">sm2</Radio>
				<Radio value="sm3">sm3</Radio>
				<Radio value="sm4">sm4</Radio>
			</Radio.Group>
		</>
	);
};

const mapStateToProps = (state: any) => state.file;
const mapDispatchToProps = { setEncryption };
export default connect(mapStateToProps, mapDispatchToProps)(Encryption);
