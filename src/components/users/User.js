import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Repos from './repos/Repos';

const User = ({ user, repos, getUser, getUserRepos, loading, match }) => {
    // const [userLogin, setLogin] = useState(match.params.login);
    useEffect(() => {
        getUser(match.params.login);
        getUserRepos(match.params.login);
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

User.propTypes = {
    user: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    getUser: PropTypes.func.isRequired,
    getUserRepos: PropTypes.func.isRequired,
    repos: PropTypes.array.isRequired,
};

export default User;
