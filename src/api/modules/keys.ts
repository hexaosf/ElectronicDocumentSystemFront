import { IEncryption } from "@/api/interface";

import http from "@/api";

// * 获取sm4密钥列表
export const getSm4KeyListApi = () => {
	return http.get<IEncryption.ResSm4List>(`/key/sm4_list`);
};
