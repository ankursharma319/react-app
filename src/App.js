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
import ScorePrediction from "./components/pages/score_prediction/ScorePrediction";
import Home from "./components/pages/home/Home";
import PlayerRatings from "./components/pages/player_ratings/PlayerRatings";
import CricketManager from "./components/pages/cricket_manager/CricketManager";
import InvalidUrl from "./components/pages/error/InvalidUrl";
import MessiVsRonaldo from "./components/pages/messi_vs_ronaldo/MessiVsRonaldo";
import OtherWork from "./components/pages/other_work/OtherWork";
import Playground from "./components/pages/playground/Playground";
import PrivacyPolicy from "./components/pages/common/PrivacyPolicy";
import TermsOfServices from "./components/pages/common/TermsOfServices";
import FacebookLoginResponse from "./components/pages/auth/FacebookLoginResponse";

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <TopBar/>
                    <Switch>
                        <Route path="/" component={Home} exact/>
                        <Route path="/login" component={Login} />
                        <Route path="/album" component={Album} />
                        <Route path="/about_me" component={AboutMe} exact/>
                        <Route path="/other_work" component={OtherWork} />
                        <Route path="/player_ratings" component={PlayerRatings} />
                        <Route path="/cricket_manager" component={CricketManager} />
                        <Route path="/messi_vs_ronaldo" component={MessiVsRonaldo} />
                        <Route path="/playground" component={Playground} />
                        <PrivateRoute path="/score_prediction" component={ScorePrediction} />
                        <Route path="/privacy_policy" component={PrivacyPolicy} />
                        <Route path="/terms_of_service" component={TermsOfServices} />
                        <Route path="/auth/facebook/login_response" component={FacebookLoginResponse} />
                        <Route component={InvalidUrl} />
                    </Switch>
                    <Footer/>
                </div>
            </Router>
        );
    }
}

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
