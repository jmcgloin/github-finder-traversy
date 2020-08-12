import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export class User extends Component {
    componentDidMount() {
        this.props.getUser(this.props.match.params.login);
    }
    static propTypes = {
        user: PropTypes.object.isRequired,
        loading: PropTypes.bool.isRequired,
        getUser: PropTypes.func.isRequired,
    };
    render() {
        const { name, avatar_url, login, html_url } = this.props.user;
        const { loading } = this.props;
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
            </div>
        );
    }
}

export default User;
