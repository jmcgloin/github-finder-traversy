import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import GithubContext from '../../context/github/githubContext'
import Repos from './repos/Repos';

const User = ({ match }) => {

    const githubContext = useContext(GithubContext);
    const {getUser, user, getUserRepos, repos, loading} = githubContext;

    useEffect(() => {
        getUser(match.params.login);
        getUserRepos(match.params.login);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const { name, avatar_url, login, html_url } = user;
    return loading ? (
        <h1>Loading...</h1>
    ) : (
        <div>
            <img src={avatar_url} alt='avatar' />
            <h1>{login}</h1>
            <p>{name}</p>
            <a href={html_url} target='_blank' rel='noopener noreferrer'>
                Visit GitHub page
            </a>
            <Link to='/'>Back to search</Link>
            <h2>Repos</h2>
            <Repos repos={repos} />
        </div>
    );
};

export default User;
