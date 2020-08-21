import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Search = ({ onSearch, updateAlert }) => {
    const [searchText, setSearchText] = useState('');
    const updateSearch = ({ target: { value } }) => {
        setSearchText(value);
    };
    const onSubmit = (e) => {
        e.preventDefault();
        const parameter = searchText;
        if (parameter !== '') {
            onSearch(parameter);
            setSearchText('');
        } else {
            updateAlert('Please enter something', 'info');
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

Search.propTypes = {
    onSearch: PropTypes.func.isRequired,
    updateAlert: PropTypes.func.isRequired,
};

export default Search;
