import { AnyAction } from "redux";
import { FileState } from "@/redux/interface";
import produce from "immer";
import * as types from "@/redux/mutation-types";

const fileState: FileState = {
	file: null,
	encryption: "sm2",
	encryptionKey: "",
	encryptionId: 0,
	sm2TargetUsername: ""
};

// menu reducer
const file = (state: FileState = fileState, action: AnyAction) =>
	produce(state, draftState => {
		switch (action.type) {
			case types.SET_UPLOAD_FILE:
				draftState.file = action.file;
				break;
			case types.SET_UPLOAD_ENCRYPTION:
				draftState.encryption = action.encryption;
				break;
			case types.SET_UPLOAD_ENCRYPTION_KEY:
				draftState.encryptionKey = action.encryptionKey;
				break;
			case types.SET_SM2_TARGET_USERNAME:
				draftState.sm2TargetUsername = action.sm2TargetUsername;
				break;
			default:
				return draftState;
		}
	});

export default file;
