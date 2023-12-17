import { IFile } from "@/api/interface";

import http from "@/api";

export const uploadSm2Api = (data: IFile.ISm2Upload) => {
	return http.post<null>(`/file/sm2/upload`, data);
};
export const uploadSm3Api = (data: IFile.ISm3Upload) => {
	return http.post<null>(`/file/sm3/upload`, data);
};
export const uploadSm4Api = (data: IFile.ISm4Upload) => {
	return http.post<null>(`/file/sm4/upload`, data);
};

export const getFileListApi = () => {
	return http.get<IFile.ResFile[]>(`/file/file_list`);
};

export const deleteFileApi = (fileId: string) => {
	return http.delete<null>(`/file/delete/${fileId}`);
};

export const downloadSm2Api = (fileId: string) => {
	return http.get<string>(`/file/sm2/${fileId}`);
};

export const downloadSm3Api = (fileId: string) => {
	return http.get<IFile.ResDownloadSm3File>(`/file/sm3/${fileId}`);
};

export const downloadSm4Api = (fileId: string) => {
	return http.get<string>(`/file/sm4/${fileId}`);
};
