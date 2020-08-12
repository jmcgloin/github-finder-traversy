import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Clear from './components/users/Clear';
import Alert from './components/layout/Alert';
import About from './components/pages/About';

class App extends Component {
    state = {
        updated: false,
        users: [],
        loading: false,
        alert: {
            message: '',
            type: null,
        },
        user: {},
    };
    componentDidMount() {
        this.onSearch();
    }
    onSearch = async (parameter = null) => {
        this.setState((prevState, props) => {
            return {
                loading: true,
                updated: !!parameter,
            };
        });
        const res = await axios.get(
            `https://api.github.com/${
                parameter != null
                    ? 'search/users?&q=' + parameter + '&'
                    : 'users?'
            }client_id=${
                process.env.REACT_APP_GITHUB_CLIENT_ID
            }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );
        this.setState((prevState, props) => {
            return {
                users: !!res.data.items ? res.data.items : res.data,
                loading: false,
            };
        });
    };
    onClear = (e) => {
        this.onSearch();
    };
    getUser = async (username) => {
        this.setState((prevState, props) => {
            return {
                ...this.state,
                loading: true,
            };
        });

        const res = await axios.get(
            `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );

        this.setState((prevState, props) => {
            return {
                user: res.data,
                loading: false,
            };
        });
    };
    setAlert = (message, type) => {
        this.setState((prevState, props) => {
            return {
                ...this.state,
                alert: {
                    message,
                    type,
                },
            };
        });
        setTimeout(() => {
            this.setState({
                ...this.state,
                alert: {
                    message: '',
                    type: null,
                },
            });
        }, 5000);
    };
    render() {
        const { loading, updated, users, user, alert } = this.state;
        return (
            <Router>
                <Fragment>
                    <Navbar title='GitHub Finder' />
                    <Link to='/'>Home</Link>
                    <Link to='/about'>About</Link>
                    <Alert message={alert.message} type={alert.type} />
                    <Switch>
                        <Route
                            exact
                            path='/'
                            render={(props) => (
                                <Fragment>
                                    <Search
                                        onSearch={this.onSearch}
                                        setAlert={this.setAlert}
                                    />
                                    {updated && (
                                        <Clear onClear={this.onClear} />
                                    )}
                                    <Users
                                        users={users}
                                        loading={loading}
                                        getUser={this.getUser}
                                        user={user}
                                    />
                                </Fragment>
                            )}
                        />
                        <Route path='/about'>
                            <About />
                        </Route>
                        <Route
                            exact
                            path='/user/:login'
                            render={(props) => (
                                <User
                                    {...props}
                                    user={user}
                                    getUser={this.getUser}
                                    loading={loading}
                                />
                            )}
                        />
                    </Switch>
                </Fragment>
            </Router>
        );
    }
}

export default App;
