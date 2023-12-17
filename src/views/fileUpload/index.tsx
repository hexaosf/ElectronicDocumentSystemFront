import "./index.less";
import { Form } from "antd";
import { useTranslation } from "react-i18next";
import Encryption from "@/views/fileUpload/components/encryption";
import FileSelector from "@/views/fileUpload/components/fileSelector";
import KeySelector from "@/views/fileUpload/components/keySelector";
import { connect } from "react-redux";
import Submit from "@/views/fileUpload/components/submit";

const layout = {
	labelCol: { span: 4 },
	wrapperCol: { span: 16 },
	style: { width: "70%", height: "70%" }
};

const FileUpload = (props: any) => {
	const { encryption } = props;
	const { t } = useTranslation();
	return (
		<div className="upload-container">
			<Form {...layout} name="nest-messages">
				<Form.Item label={t("upload.fileLabel")}>
					<FileSelector />
				</Form.Item>
				<Form.Item label={t("upload.encryptionLabel")}>
					<Encryption />
				</Form.Item>
				<Form.Item label={t("upload.keyLabel")} wrapperCol={{ span: 16 }} hidden={encryption === "sm3"}>
					<KeySelector />
				</Form.Item>
				<Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
					<Submit />
				</Form.Item>
			</Form>
		</div>
	);
};
const mapStateToProps = (state: any) => state.file;
export default connect(mapStateToProps, null)(FileUpload);
