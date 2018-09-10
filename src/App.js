import React, {Component} from 'react';
import './App.css';
import Album from './components/pages/home/Album';
import AboutMe from './components/pages/about_me/AboutMe';

import {
    HashRouter as Router,
    Route,
    Redirect
} from "react-router-dom";
import TopBar from "./components/TopBar";
import {Switch} from "react-router";
import fakeAuth from "./services/AuthService";
import AuthStatus from "./components/AuthStatus";
import PrivateRoute from "./components/PrivateRoute";
import Footer from "./components/Footer";

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <TopBar/>
                    <Switch>
                        <Route path="/" component={Home} exact/>
                        <Route path="/about_me" component={AboutMe} exact/>
                        <Route path="/other_work" component={Album} />
                        <Route path="/login" component={Login} />
                        <PrivateRoute path="/score_prediction" component={ScorePrediction} />
                        <Route render={() => (<h3> Sorry, this page does not exist. </h3>)} />
                    </Switch>
                    <Footer/>
                </div>
            </Router>
        );
    }
}

const Home = () => <h3>Home</h3>;
const ScorePrediction = () => <h3>Score Prediction</h3>;

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
