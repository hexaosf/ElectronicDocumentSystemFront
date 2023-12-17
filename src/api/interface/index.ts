// * 请求响应参数(不包含data)
export interface Result {
	code: string;
	msg: string;
}

// * 请求响应参数(包含data)
export interface ResultData<T = any> extends Result {
	data?: T;
}

// * 分页响应参数
export interface ResPage<T> {
	datalist: T[];
	pageNum: number;
	pageSize: number;
	total: number;
}

// * 分页请求参数
export interface ReqPage {
	pageNum: number;
	pageSize: number;
}

// * 登录
export namespace Login {
	export interface ReqLoginForm {
		username: string;
		password: string;
	}

	export interface ResLogin {
		access_token: string;
	}

	export interface ResAuthButtons {
		[propName: string]: any;
	}
}
// * 注册
export namespace Register {
	export interface ReqRegisterForm {
		username: string;
		password: string;
	}

	export interface ResRegister {
		access_token: string;
	}

	export interface ResAuthButtons {
		[propName: string]: any;
	}
}

// * 用户
export namespace IUser {
	export type ResUserNameList = string[];
	export type ResUserSM2PubKey = string;
	export type ResUserSM2PriKey = string;
}

// * 密钥
export namespace IEncryption {
	export type ResSm4List = string[];

	export interface ResAuthButtons {
		[propName: string]: any;
	}
}

// * 文件
export namespace IFile {
	export interface IBaseUpload {
		filename: string;
		size: number;
		type: string;
		content: string;
	}
	export interface ISm4Upload extends IBaseUpload {
		sm4Key: string;
	}
	export interface ISm3Upload extends IBaseUpload {
		enContent: string;
	}
	export interface ISm2Upload extends IBaseUpload {
		targetUsername: string;
	}
	export interface ResFile {
		encryption: string;
		filename: string;
		id: string;
		size: number;
		type: string;
		uploadTime: string;
		username: string;
	}

	export interface ResDownloadSm3File {
		enContent: string;
		hexContent: string;
	}
}
