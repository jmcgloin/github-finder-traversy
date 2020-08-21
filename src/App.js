import React, { useState, useEffect, Fragment } from 'react';
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

const App = () => {
    const [updated, setUpdated] = useState(false);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({ message: '', type: null });
    const [user, setUser] = useState({});
    const [repos, setRepos] = useState([]);

    useEffect(() => {
        onSearch();
    }, []);
    const onSearch = async (parameter = null) => {
        setLoading(true);
        setUpdated(!!parameter);
        const res = await axios.get(
            `https://api.github.com/${
                parameter != null
                    ? 'search/users?&q=' + parameter + '&'
                    : 'users?'
            }client_id=${
                process.env.REACT_APP_GITHUB_CLIENT_ID
            }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );
        setUsers(!!res.data.items ? res.data.items : res.data);
        setLoading(false);
    };
    const onClear = (e) => {
        onSearch();
    };
    const getUser = async (username) => {
        setLoading(true);

        const res = await axios.get(
            `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );
        setUser(res.data);
        setLoading(false);
    };
    const getUserRepos = async (username) => {
        setLoading(true);

        const res = await axios.get(
            `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );
        setRepos(res.data);
        setLoading(false);
    };
    const updateAlert = (message, type) => {
        setAlert({ message, type });
        setTimeout(() => {
            setAlert({ message: '', type: null });
        }, 5000);
    };
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
                                    onSearch={onSearch}
                                    updateAlert={updateAlert}
                                />
                                {updated && <Clear onClear={onClear} />}
                                <Users
                                    users={users}
                                    loading={loading}
                                    getUser={getUser}
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
                                getUser={getUser}
                                getUserRepos={getUserRepos}
                                repos={repos}
                                loading={loading}
                            />
                        )}
                    />
                </Switch>
            </Fragment>
        </Router>
    );
};

export default App;
