import React, {useContext} from 'react';

import GithubContext from '../../context/github/githubContext';

const Clear = props => {
    const githubContext = useContext(GithubContext);
    const {onClear, updated, users} = githubContext;
    const onClick = (e) => {
        e.preventDefault();
        onClear();
    };
    return (updated && (users.length > 0) ) && (
        <button onClick={onClick} className='btn'>
            Clear
        </button>
    );
};

export default Clear;
