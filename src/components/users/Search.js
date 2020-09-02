import React, { useState, useContext } from 'react';
import GithubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContext';

const Search = () => {
    const githubContext = useContext(GithubContext);
    const alertContext = useContext(AlertContext);
    const {searchUsers} = githubContext;
    const {setAlert} = alertContext;
    const [searchText, setSearchText] = useState('');
    const updateSearch = ({ target: { value } }) => {
        setSearchText(value);
    };
    const onSubmit = (e) => {
        e.preventDefault();
        const parameter = searchText;
        if (parameter !== '') {
            searchUsers(parameter);
            setSearchText('');
        } else {
            setAlert('Please enter something', 'info');
        }
    };
    return (
        <div className='form'>
            <form onSubmit={onSubmit}>
                <input
                    type='text'
                    name='searchText'
                    placeholder='Search users'
                    value={searchText}
                    onChange={updateSearch}
                />
                <input type='submit' value='Search' className='btn' />
            </form>
        </div>
    );
};

export default Search;
