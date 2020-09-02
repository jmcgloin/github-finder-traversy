import React, {useReducer} from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
	GET_USER,
	SEARCH_USERS,
	GET_REPOS,
	SET_LOADING,
	SET_UPDATED
} from '../../types';

const GithubState = props => {
	const initialState = {
		users: [],
		user: {},
		loading: false,
		repos: [],
		updated: false,
		alert: { message: '', type: null }
	}

	const [state, dispatch] = useReducer(GithubReducer, initialState);

	//Search users
	const searchUsers = async (parameter = null) => {
    setLoading();
    setUpdated(!!parameter);
    const res = await axios.get(
        `https://api.github.com/${
            parameter != null
                ? 'search/users?&q=' + parameter + '&'
                : 'users?'
        }client_id=${
            process.env.REACT_APP_GITHUB_CLIENT_ID
        }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    dispatch({
    	type: SEARCH_USERS,
    	payload: !!res.data.items ? res.data.items : res.data
    });
	};

	//Get user
	const getUser = async (username) => {
	  setLoading();

	  const res = await axios.get(
	      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
	  );
	  dispatch({
	  	type: GET_USER,
	  	payload: res.data
	  })
    };

	//Get repos
	const getUserRepos = async (username) => {
    setLoading();

    const res = await axios.get(
        `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    dispatch({
    	type: GET_REPOS,
    	payload: res.data
    });
  };

	//Clear search
	const onClear = () => {
        searchUsers();
    };

	//Set loading
	const setLoading = () => dispatch({ type: SET_LOADING })

	const setUpdated = isUpdated => dispatch({ type:SET_UPDATED, isUpdated })

	return <GithubContext.Provider
		value={{
			users: state.users,
			user: state.user,
			repos: state.repos,
			loading: state.loading,
			updated: state.updated,
			searchUsers,
			onClear,
			getUser,
			getUserRepos
		}}
	>{props.children}</GithubContext.Provider>

}

export default GithubState;