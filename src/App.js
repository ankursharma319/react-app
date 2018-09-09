import React, {Component} from 'react';
import './App.css';
import Album from './components/Album';

import {
    withRouter,
    BrowserRouter as Router,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import TopBar from "./components/TopBar";
import {Switch} from "react-router";

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <TopBar/>
                    <AuthButton />
                    <div>
                        <ul>
                            <li>
                                <Link to="/public">Public Page</Link>
                            </li>
                            <li>
                                <Link to="/protected">Protected Page</Link>
                            </li>
                            <li>
                                <Link to="/ran/dom/deep">Deep Page</Link>
                            </li>
                        </ul>
                        <Switch>
                            <Route path="/" component={Public} exact/>
                            <Route path="/public" component={Public} exact/>
                            <Route path="/login" component={Login} />
                            <Route path="/ran/dom/deep" component={Deep} />
                            <PrivateRoute path="/protected" component={Protected} />
                        </Switch>
                        <Album/>
                    </div>
                </div>
            </Router>
        );
    }
}

const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
        this.isAuthenticated = true;
        setTimeout(cb, 100); // fake async
    },
    signout(cb) {
        this.isAuthenticated = false;
        setTimeout(cb, 100);
    }
};

const AuthButton = withRouter(
    ({ history }) =>
        fakeAuth.isAuthenticated ? (
            <p>
                Welcome!{" "}
                <button
                    onClick={() => {
                        fakeAuth.signout(() => history.push("/"));
                    }}
                >
                    Sign out
                </button>
            </p>
        ) : (
            <p>You are not logged in.</p>
        )
);

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            fakeAuth.isAuthenticated ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/login",
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);

const Public = () => <h3>Public</h3>;
const Deep = () => <h3>Deep</h3>;
const Protected = () => <h3>Protected</h3>;

class Login extends React.Component {
    state = {
        redirectToReferrer: false
    };

    login = () => {
        fakeAuth.authenticate(() => {
            this.setState({ redirectToReferrer: true });
        });
    };

    render() {
        const { from } = this.props.location.state || { from: { pathname: "/" } };
        const { redirectToReferrer } = this.state;

        if (redirectToReferrer) {
            return <Redirect to={from} />;
        }

        return (
            <div>
                <p>You must log in to view the page at {from.pathname}</p>
                <button onClick={this.login}>Log in</button>
            </div>
        );
    }
}

export default App;
