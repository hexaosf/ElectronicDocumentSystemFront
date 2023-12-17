import JSEncrypt from "jsencrypt";

const RSA_PUBLIC_KEY =
	"-----BEGIN PUBLIC KEY-----\n" +
	"MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzyBsLimlxchBBj3FSTKQ\n" +
	"ZpZIUba/Ga0TwsAD0ZkC4rAq+gF5D3evQ7aA3lw3QjhZ54SnVZ2Cja5lkp38hnmz\n" +
	"sJOwYfWc8Vt4fwckDr64W1qx6/gBiT+dO12SjPwfWpFyzSeoYFe4JEZEZTfjkTBT\n" +
	"M3D9qe1lSzx7iokuf0+uJhk6c85ldTeu0SvBIC+RYi4XFfYon5QtVEqYDre3qjZl\n" +
	"BJA3ExKxjRTomcgh8PjfTrL67cmj02CkriJig1XekT9jQbg37EAABqGC8H7JqFNK\n" +
	"Z0aat5AkUl3DupkY2a0fHEQiKreo8IjX3isAJMvV7ZzKkX47xVEbvic9m3PCqF+H\n" +
	"wQIDAQAB\n" +
	"-----END PUBLIC KEY-----\n";

const RSA_PRIVATE_KEY =
	"-----BEGIN PRIVATE KEY-----\n" +
	"MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDRJ0F7ksDngO9F\n" +
	"0UnCnY7g7zBO4+Rp2D5sbACYben+pl1pzAbqQVR0LX8oEHvFlOkTJkVz1ZlFPBKm\n" +
	"VGybicwTOmjRdxjsbnY36vvxOm9lb2sv+6mK9DcYEBXdU8DeXh1Ak/3MlTTb7cr/\n" +
	"OSqIloPAwJIdALayDAR4KkJPQtgG60mz3gold3ZLVkTkb9NGp9Hd4h0LzM7H0kSv\n" +
	"EAdcrOYX8Ghet6d6EOfXHRof153R0KRKAtMyLwer0Srz/gIK7Af+ZphkYZGCE1Wo\n" +
	"Jp19GD7j5Rt4eeeIH3mkwbcl/TUTv5qb/1JU78WdEf/UWmK9BCCRuoUbCLvEaoou\n" +
	"CVJT85DJAgMBAAECggEAGZ+IbFAN6bawKZKiqZDlpY0sEwgkjiqHuD7xgjsZ+wBs\n" +
	"6oaMNNPw2aROwwzk6u9rr/TE9rRM+RBLXRzz6siyi4sA9yNy9lkwirhzKeoNpmTE\n" +
	"Yg4f5tX1L3GeCh3F/8ASL5yJz+/aGFT9JPAfE7lz1fAJnnu9RhoGjKWptr3iyxL8\n" +
	"txVE7Co5yXuvi5WY1RHOxS+jycPuy0U2/+JhYKNe7btyNc31hEWBPP791Iaar0dU\n" +
	"F8ih6cZJfAMFDk42fEVaRqqQY7gPB1KKY87Z0uGTEAkLsSnJ/er4lrez+Z9LrXK+\n" +
	"FFeDRTfnUROy5tVv3nHHB0DZNbGsww7Kgz+gdHF08QKBgQDxS2zga/voTA8zAm/F\n" +
	"pwHSsm4cp6eDrQvFkCIWksdXSusDqV9D2h3OZjh0dQIpdk8G4xE2eeuimrkHWHHC\n" +
	"joM3TrMTeUL4iQK+nqrxokgjEaD/hT/ZXCqIL6mE7pIvJPVDt9ZnTUFmm+F2LRBu\n" +
	"RU0dFDQVzto/j0orClVC1tUBMQKBgQDd5mBBfiwF9R+GEBXXW7BxtWHV/sjSPQP4\n" +
	"VQev8S7W1F/hcTCaPH7yQSBPMeNw+TFXOEfwNJaO7yD2CaVXEcJyN/yIrQJlOjxA\n" +
	"67PvnmTt6FW+BLlnGqYCBQODPNV3I+7h9GHgfRiE1Cjdt44qkG3ToEibar84XnKW\n" +
	"sI//BJjjGQKBgQCJ/oC9uAPQze7DVVlmyCQaw0CF0rvSalyZF9zm2/p0ybut1GdO\n" +
	"/qadK4iN0XzzCV4YqjNl3EQOMj4vHT2x7p7MOo3fTTInwPN44HUSy6RFqgdRGntx\n" +
	"a2xHhjqEc4vWumQp3jEX0u7cJ7nBQ/Rpm+iGAM/oyOu3/dKE2tv35bTbgQKBgBIS\n" +
	"46AyAK/ziT/IK59A7pw0Y+WkPQMyyRH/CwM/p8sDvVOFfqnxZ32f5FvO+nGHOoea\n" +
	"I/HitqipvYuMuZTf83COMtmHDfzkw2eeSyenRR1DoUg65kcJmp/rfJ/B4rkzig+J\n" +
	"cjdwuQCIr1Nv0fqRjQCBu6g9B5o1xyuS8geZfkJxAoGAAQwPbXsv9UkiIoAFFXqS\n" +
	"atcVCZMJMUHYVlg1VRka443ZxiG/ML/834BqyJV7VTYf99CtpVgrrqvSOKV+M78h\n" +
	"FCnpekuFKinfG3Pp4Y2IsFZpKyWme171HhgifGo5VomJlmp0kQnUuuysvEfruqPI\n" +
	"Dr4kFUQgfXfRmZTiRUdo970=\n" +
	"-----END PRIVATE KEY-----";

export const encrypt = (content: string) => {
	const encryptor = new JSEncrypt();
	encryptor.setPublicKey(RSA_PUBLIC_KEY);
	return encryptor.encrypt(content);
};

export const decrypt = (content: string) => {
	let decrypt = new JSEncrypt();
	decrypt.setPrivateKey(RSA_PRIVATE_KEY);
	return decrypt.decrypt(content);
};
