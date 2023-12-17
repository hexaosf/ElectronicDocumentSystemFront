import { Button, Input } from "antd";
import React, { createRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { setFile } from "@/redux/modules/file/action";

const FileSelector = (props: any) => {
	const { file, setFile: setFileAction } = props;
	const inputRef = createRef<HTMLInputElement>();
	const { t } = useTranslation();
	const selectFileHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target) {
			const { files } = event.target;
			if (!files || files.length < 1) {
				return;
			}
			const file = files[0];
			setFileAction(file);
		}
	};
	const onSelectFile = async () => {
		const input = inputRef.current;
		if (input) {
			input.click();
		}
	};

	useEffect(() => {
		if (inputRef.current) {
			// @ts-ignore
			inputRef.current.onchange = selectFileHandler;
		}
	}, [inputRef]);
	return (
		<div className="file-input">
			<input type="file" hidden ref={inputRef} />
			<Input disabled value={file ? file.name : ""} />
			<Button type="dashed" htmlType="button" onClick={() => onSelectFile()}>
				{t("upload.selectFile")}
			</Button>
		</div>
	);
};

const mapStateToProps = (state: any) => state.file;
const mapDispatchToProps = { setFile };
export default connect(mapStateToProps, mapDispatchToProps)(FileSelector);
