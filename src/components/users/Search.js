import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Search extends Component {
    state = {
        searchText: '',
    };
    updateSearch = ({ target: { value, name } }) => {
        this.setState({
            [name]: value,
        });
    };
    onSubmit = (e) => {
        e.preventDefault();
        const parameter = this.state.searchText;
        if (parameter !== '') {
            this.props.onSearch(parameter);
            this.setState({
                searchText: '',
            });
        } else {
            this.props.setAlert('Please enter something', 'info');
        }
    };
    static propType = {
        onSearch: PropTypes.func.isRequired,
    };
    render() {
        return (
            <div className='form'>
                <form onSubmit={this.onSubmit}>
                    <input
                        type='text'
                        name='searchText'
                        placeholder='Search users'
                        value={this.state.searchText}
                        onChange={this.updateSearch}
                    />
                    <input type='submit' value='Search' className='btn' />
                </form>
            </div>
        );
    }
}

export default Search;
