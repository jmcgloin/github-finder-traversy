import React, {useEffect, useContext} from 'react';

import GithubContext from '../../context/github/githubContext';
import UserItem from './UserItem';

const Users = ({ getUser }) => {
    const githubContext = useContext(GithubContext);
    const {loading, users, updated, searchUsers} = githubContext;

     useEffect(() => {
        searchUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if(loading) {
        return <h1>Loading...</h1>
    } else {
        return (
            <div className='card-container'>
                {users.length > 0 ? users.map((user) => (
                    <UserItem user={user} key={user.id} getUser={getUser} />
                )) : (
                    updated && <div>No search results found.</div>
                )}
            </div>
        )
    }
};

export default Users;
