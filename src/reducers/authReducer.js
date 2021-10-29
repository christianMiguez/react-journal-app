import { types } from "../types/types";

// este es el estado inicial de nuestro reducer, recibe el estado anterior y el action que se dispara en el dispatch
export const authReducer = (state = {}, action) => {
	switch (action.type) {
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
