import {
	GET_USER,
	SEARCH_USERS,
	GET_REPOS,
	SET_LOADING,
	SET_UPDATED
} from '../../types';

export default (state, action) => {
	switch(action.type) {
		case SET_LOADING:
			return {
				...state,
				loading: true
			}
		case SEARCH_USERS:
			return {
				...state,
				users: action.payload,
				loading: false
			}
		case GET_USER:
			return {
				...state,
				user: action.payload,
				loading: false
			}
		case GET_REPOS:
			return {
				...state,
				repos: action.payload,
				loading: false
			}
		case SET_UPDATED:
			return {
				...state,
				updated: action.isUpdated
			}
		default:
			return state;
	}
}