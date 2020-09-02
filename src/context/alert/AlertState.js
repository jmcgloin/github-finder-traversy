import React, {useReducer} from 'react';
import AlertContext from './alertContext';
import AlertReducer from './alertReducer';
import {
	SET_ALERT,
	CLEAR_ALERT
} from '../../types';

const AlertState = props => {
	const initalState = null;

	const [state, dispatch] = useReducer(AlertReducer, initalState);

	const setAlert = (message, type) => {
		dispatch({
			type: SET_ALERT,
			alert: {
				message,
				type
			}
		});
		setTimeout(() => {
			dispatch({
				type: CLEAR_ALERT,
			})
		}, 5000);
	};

	return <AlertContext.Provider
		value = {{
			alert: state,
			setAlert
		}}
	>{props.children}</AlertContext.Provider>
}

export default AlertState;