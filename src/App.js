import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import './App.css';

import GithubState from './context/github/GithubState';
import AlertState from './context/alert/AlertState';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Clear from './components/users/Clear';
import Alert from './components/layout/Alert';
import About from './components/pages/About';

const App = () => {

    return (
        <GithubState>
        <AlertState>
        <Router>
            <Fragment>
                <Navbar title='GitHub Finder' />
                <Link to='/'>Home</Link>
                <Link to='/about'>About</Link>
                <Alert />
                <Switch>
                    <Route
                        exact
                        path='/'
                        render={(props) => (
                            <Fragment>
                                <Search />
                                <Clear />
                                <Users />
                            </Fragment>
                        )}
                    />
                    <Route path='/about'>
                        <About />
                    </Route>
                    <Route
                        exact
                        path='/user/:login'
                        render={props => (
                            <User {...props} />
                        )}
                    />
                </Switch>
            </Fragment>
        </Router>
        </AlertState>
        </GithubState>
    );
};

export default App;
