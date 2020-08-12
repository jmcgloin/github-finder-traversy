import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const UserItems = ({ user: { id, login, avatar_url, html_url } }) => {
    return (
        <Link to={`/user/${login}`}>
            <div className='card'>
                <img src={avatar_url} alt='avatar' />
                <p>{id}</p>
                <p>{login}</p>
            </div>
        </Link>
    );
};

UserItems.propTypes = {
    user: PropTypes.object.isRequired,
};
export default UserItems;
