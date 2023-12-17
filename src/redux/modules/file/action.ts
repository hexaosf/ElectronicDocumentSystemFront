import * as types from "@/redux/mutation-types";

export const setEncryption = (encryption: "sm2" | "sm3" | "sm4") => ({
	type: types.SET_UPLOAD_ENCRYPTION,
	encryption
});

export const setFile = (file: File) => ({
	type: types.SET_UPLOAD_FILE,
	file
});

export const setEncryptionKey = (encryptionKey: string) => ({
	type: types.SET_UPLOAD_ENCRYPTION_KEY,
	encryptionKey
});

export const serSm2TargetUsername = (sm2TargetUsername: string) => ({
	type: types.SET_SM2_TARGET_USERNAME,
	sm2TargetUsername
});
