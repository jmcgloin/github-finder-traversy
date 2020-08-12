import React from 'react';
import PropTypes from 'prop-types';

import UserItem from './UserItem';

const Users = ({ users, loading, getUser }) => {
    return (
        <div className='card-container'>
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                users.map((user) => (
                    <UserItem user={user} key={user.id} getUser={getUser} />
                ))
            )}
        </div>
    );
};

Users.propTypes = {
    users: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
};

export default Users;
