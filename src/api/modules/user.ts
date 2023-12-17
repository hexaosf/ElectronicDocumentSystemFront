import { IUser, Login, Register } from "@/api/interface";

import http from "@/api";

// * 用户登录接口
export const loginApi = (params: Login.ReqLoginForm) => {
	return http.post<Login.ResLogin>(`/user/login`, params);
};
// * 用户注册接口
export const registerApi = (params: Login.ReqLoginForm) => {
	return http.post<Register.ResRegister>(`/user/register`, params);
};

// * 获取全部用户名
export const getUserListApi = () => {
	return http.get<IUser.ResUserNameList>(`/user/get_user_list`);
};

// * 获取用户公钥
export const getSm2PubKeyApi = (params: { username: string }) => {
	return http.get<IUser.ResUserSM2PubKey>(`/user/get_sm2_pub_key`, params);
};

// * 获取用户私钥
export const getSm2PriKeyApi = () => {
	return http.get<IUser.ResUserSM2PriKey>(`/user/get_sm2_pri_key`);
};
