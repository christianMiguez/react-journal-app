import { types } from '../types/types'

const initialState = {
	loading: false,
	msgError: null
}

export const uiReducer = ( state = initialState, action ) => {
	switch (action.type) {
		case types.uiSetError:
			return {
				...state,
				msgError: action.payload
			}
		
		case types.uiRemoveError:
			return {
				...state,
				msgError: null
			}

		case types.uiStopLoading:
			return {
				...state,
				loading: false
			}

		case types.uiStartLoading:
			return {
				...state,
				loading: true
			}
	
		default:
		return state
	}
}
