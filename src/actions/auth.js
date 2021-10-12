import {types} from '../types/types';

export const startLoginEmailPassword = (email, password) => {
	// callback
	return (dispatch) => {
		setTimeout(() => {
			dispatch(login(123, 'Chris'))
		}, 3000);

	}
}

export const login = (uid, displayName) => ({
	type: types.login,
	payload: {
		uid,
		displayName
	}
})