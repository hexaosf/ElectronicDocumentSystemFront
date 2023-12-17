import "./index.less";
import { Button, message, Modal, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { deleteFileApi, downloadSm2Api, downloadSm3Api, downloadSm4Api, getFileListApi } from "@/api/modules/file";
import { IFile } from "@/api/interface";
import { hexToArrayByte, sm2_decrypt, sm3_encrypt, sm4_decrypt } from "@/utils/commercial_cryptography";
import { saveUint8ArrayToLocal } from "@/utils/local";
import { connect } from "react-redux";
import KeySelector from "@/views/fileUpload/components/keySelector";
import { setEncryption } from "@/redux/modules/file/action";
import { getSm2PriKeyApi } from "@/api/modules/user";
import { decrypt } from "@/utils/rsa";

interface DataType extends IFile.ResFile {
	key: number;
}

const FileList = (props: any) => {
	const { encryptionKey, setEncryption: setEncryptionAction } = props;
	const [fileList, setFileList] = useState<DataType[]>([]);
	const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
	const [downloadLoading, setDownloadLoading] = useState<boolean>(false);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [row, setRow] = useState<DataType | null>(null);
	const deleteHandler = async (value: DataType) => {
		setDeleteLoading(true);
		try {
			await deleteFileApi(value.id);
			const newList = [...fileList.filter(item => item.key !== value.key)];
			setFileList(newList);
		} finally {
			setDeleteLoading(false);
		}
	};

	const downloadHandler = async (value: DataType) => {
		setDownloadLoading(true);
		setRow(value);
		setEncryptionAction(value.encryption);
		try {
			switch (value.encryption) {
				case "sm2":
					await downloadSm2Handler(value);
					break;
				case "sm3":
					await downloadSm3Handler(value);
					break;
				case "sm4":
					setIsModalOpen(true);
					break;
			}
		} finally {
			setDownloadLoading(false);
		}
	};

	const downloadSm2Handler = async (value: DataType) => {
		const { data: enPrivateKey } = await getSm2PriKeyApi();
		if (!enPrivateKey) {
			message.error("获取密钥失败");
			return;
		}
		let privateKey = "";
		const parts = enPrivateKey.split("+~~+");
		parts.forEach(item => {
			privateKey += decrypt(item);
		});
		const { data: enContent } = await downloadSm2Api(value.id);
		if (!enContent || !privateKey) {
			message.error("获取文件失败");
			return;
		}
		const sm2Decrypt = sm2_decrypt(enContent, privateKey);
		const content = sm2Decrypt ? hexToArrayByte(sm2Decrypt) : new Uint8Array();
		saveUint8ArrayToLocal(content, value.filename);
	};

	const downloadSm3Handler = async (value: DataType) => {
		const { data } = await downloadSm3Api(value.id);
		if (!data) return;
		const sm3Encrypt = sm3_encrypt(data.hexContent);
		if (sm3Encrypt !== data.enContent) {
			message.error("The file has been tampered with");
			return;
		}
		const array = hexToArrayByte(data.hexContent);
		saveUint8ArrayToLocal(array, value.filename);
	};
	const downloadSm4Handler = async () => {
		if (!row) return;
		const { data } = await downloadSm4Api(row.id);
		if (!data) {
			message.error("File download failed");
			return;
		}
		let bytesData;
		try {
			const decrypt = sm4_decrypt(data, encryptionKey);
			bytesData = hexToArrayByte(decrypt);
		} catch (e) {
			bytesData = new Uint8Array();
		}

		saveUint8ArrayToLocal(bytesData, row.filename);
	};

	const columns: ColumnsType<DataType> = [
		{
			title: "id",
			width: 150,
			dataIndex: "id",
			key: "id",
			fixed: "left",
			align: "center"
		},
		{
			title: "filename",
			width: 150,
			dataIndex: "filename",
			key: "filename",
			align: "center"
		},
		{
			title: "encryption",
			dataIndex: "encryption",
			key: "encryption",
			width: 150,
			align: "center"
		},
		{
			title: "size(kb)",
			dataIndex: "size",
			key: "size",
			width: 150,
			align: "center"
		},
		{
			title: "type",
			dataIndex: "type",
			key: "type",
			width: 150,
			align: "center"
		},
		{
			title: "uploadTime",
			dataIndex: "uploadTime",
			key: "uploadTime",
			width: 150,
			align: "center"
		},
		{
			title: "owner",
			dataIndex: "username",
			key: "username",
			width: 150,
			align: "center"
		},
		{
			title: "Action",
			key: "operation",
			fixed: "right",
			width: 160,
			render: (value: DataType) => (
				<div style={{ display: "flex", gap: "5px" }}>
					<Button size="middle" type="dashed" danger onClick={() => deleteHandler(value)} loading={deleteLoading}>
						Delete
					</Button>
					<Button size="middle" type="dashed" onClick={() => downloadHandler(value)} loading={downloadLoading}>
						Download
					</Button>
				</div>
			)
		}
	];

	useEffect(() => {
		getFileListApi().then(response => {
			const { data } = response;
			if (data) {
				setFileList(data.map<DataType>((item: IFile.ResFile, index: number) => ({ ...item, key: index })));
			}
		});
	}, []);

	return (
		<div className="table-container">
			<Table style={{ width: "80%", height: "80%" }} columns={columns} dataSource={fileList} scroll={{ x: 1500, y: 900 }} />
			<Modal title="选择sm4密钥" visible={isModalOpen} onOk={() => downloadSm4Handler()} onCancel={() => setIsModalOpen(false)}>
				<KeySelector />
			</Modal>
		</div>
	);
};
const mapStateToProps = (state: any) => state.file;
const mapDispatchToProps = { setEncryption };
export default connect(mapStateToProps, mapDispatchToProps)(FileList);
