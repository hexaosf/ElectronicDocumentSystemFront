import { sm2, sm3, sm4 } from "sm-crypto";

const cipherMode = 1; // 选择加密策略，1 - C1C3C2，0 - C1C2C3，默认为1

export const arrayByteToHex = (bytes: ArrayBufferLike) => {
	const array = Array.from(new Uint8Array(bytes), bit => ("00" + bit.toString(16)).slice(-2));
	return array.join("");
};
export const hexToArrayByte = (hex: string) => {
	// @ts-ignore
	const array = hex.match(/.{1,2}/g).map(byte => parseInt(byte, 16));
	return new Uint8Array(array);
};

/**
 * sm2加密
 * @param content
 * @param public_key
 */
export const sm2_encrypt = (content: ArrayBufferLike, public_key: string) => {
	if (!public_key.startsWith("04")) {
		public_key = "04" + public_key;
	}
	// 将Blob数据转换为16进制字符串
	const hexArr = arrayByteToHex(content);
	return "04" + sm2.doEncrypt(hexArr, public_key, cipherMode);
};

/**
 * sm2解密
 * @param content
 * @param prikey
 */
export const sm2_decrypt = (content: string, prikey: string) => {
	if (content.startsWith("04")) {
		content = content.substring(2);
	}
	return sm2.doDecrypt(content, prikey, cipherMode);
};

/**
 * sm3加密
 * @param content
 */
export const sm3_encrypt = (content: string) => {
	return sm3(content);
};

/**
 * sm4加密
 * @param data
 * @param key
 */
export const sm4_encrypt = (data: string, key: string) => {
	return sm4.encrypt(data, key);
};

/**
 * sm4解密
 * @param data
 * @param key
 */
export const sm4_decrypt = (data: string, key: string) => {
	return sm4.decrypt(data, key);
};
