import React, {Component} from 'react';
import './App.css';
import Album from './components/pages/home/Album';
import AboutMe from './components/pages/about_me/AboutMe';

import {
    HashRouter as Router,
    BrowserRouter,
    Route,
    Redirect
} from "react-router-dom";
import TopBar from "./components/TopBar";
import {Switch} from "react-router";
import fakeAuth from "./services/AuthService";
import PrivateRoute from "./components/PrivateRoute";
import Footer from "./components/Footer";
import ScorePrediction from "./components/pages/score_prediction/ScorePrediction";
import Home from "./components/pages/home/Home";
import PlayerRatings from "./components/pages/player_ratings/PlayerRatings";
import PlayerRatingResults from "./components/pages/player_ratings/PlayerRatingResults"
import CricketManager from "./components/pages/cricket_manager/CricketManager";
import InvalidUrl from "./components/pages/error/InvalidUrl";
import MessiVsRonaldo from "./components/pages/messi_vs_ronaldo/MessiVsRonaldo";
import OtherWork from "./components/pages/other_work/OtherWork";
import Playground from "./components/pages/playground/Playground";
import PrivacyPolicy from "./components/pages/common/PrivacyPolicy";
import TermsOfServices from "./components/pages/common/TermsOfServices";
import OAuth2Callback from "./components/pages/auth/OAuth2Callback";
import queryString from 'query-string';

class App extends Component {
    render() {
        return (
            <React.Fragment>
            <BrowserRouter>
                <React.Fragment>
                <Switch>
                    <Route exact path="/oauth2callback" component={RedirectToOAuth2}/>
                    <Route exact path="/privacy_policy" render={()=>(
                        <Redirect to="/#/privacy_policy"/>
                    )}/>
                    <Route exact path="/terms_of_service" render={()=>(
                        <Redirect to="/#/terms_of_service"/>
                    )}/>
                </Switch>
                </React.Fragment>
            </BrowserRouter>
            <HashRouters/>
            </React.Fragment>
        );
    }
}

class RedirectToOAuth2 extends Component {
    render() {
        const parsedObj = queryString.parse(window.location.search);
        let str = "";
        for (const key in parsedObj) {
            if (str !== "") {
                str += "&";
            }
            str += key + "=" + encodeURIComponent(parsedObj[key]);
        }
        return <Redirect to={"/?" + str +"/#/auth/oauth2/callback"}/>;
    }
}

class HashRouters extends Component {
    render() {
        return <Router>
            <div className="App">
                <TopBar/>
                <Switch>
                    <Route path="/" component={Home} exact/>
                    <Route path="/login" component={Login} />
                    <Route path="/album" component={Album} />
                    <Route path="/about_me" component={AboutMe} exact/>
                    <Route path="/other_work" component={OtherWork} />
                    <Route path="/realmadrid_subreddit_analysis" render={()=>(
                        window.location.replace("https://ankursharma.surge.sh/r-realmadrid-behaviour.html")
                    )}/>
                    <Route path="/player_ratings" component={PlayerRatings} />
                    <Route path="/player_rating_results" component={PlayerRatingResults} />
                    <Route path="/cricket_manager" component={CricketManager} />
                    <Route path="/messi_vs_ronaldo" component={MessiVsRonaldo} />
                    <Route path="/playground" component={Playground} />
                    <PrivateRoute path="/score_prediction" component={ScorePrediction} />
                    <Route path="/privacy_policy" component={PrivacyPolicy} />
                    <Route path="/terms_of_service" component={TermsOfServices} />
                    <Route path="/auth/oauth2/callback" component={OAuth2Callback} />
                    <Route path="/auth/oauth/callback" component={OAuth2Callback} />
                    <Route component={InvalidUrl} />
                </Switch>
                <Footer/>
            </div>
        </Router>
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
