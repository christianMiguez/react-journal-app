import { types } from "../types/types";

export const authReducer = (state = {}, action) => {
	switch (action.types) {
		case types.login:
			return {
				uid: action.payload.uid,
				name: action.payload.displayName,
			};

		case types.logout:
			return {};
		default:
		return state
	}
};
