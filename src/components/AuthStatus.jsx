import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from "@material-ui/core/Button/Button";
import {Link, withRouter} from "react-router-dom";
import fakeAuth from "../services/AuthService";

const LogInLink = (props) => (
    <Link to="/login" {...props} />
);

class AuthStatus extends Component {
    render() {
        return fakeAuth.isAuthenticated ?
            (LoggedInStatus):(LoggedOutStatus);
    }
}

const LoggedInStatus = (
    <Button onClick={fakeAuth.signout(null)} color="inherit" variant="flat" component={LogInLink}>
        Logout
    </Button>
);
const LoggedOutStatus = (
    <Button onClick={fakeAuth.authenticate(null)} color="primary" variant="outlined" component={LogInLink}>
        Login
    </Button>
);

const AuthButton = withRouter(
    ({ history }) =>
        fakeAuth.isAuthenticated ? (
            <p>
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

AuthStatus.propTypes = {};

export default AuthStatus;