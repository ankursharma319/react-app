import React, {Component} from 'react';
import {FacebookLoginButton, TwitterLoginButton, GoogleLoginButton} from "react-social-login-buttons";
import Grid from "@material-ui/core/Grid/Grid";

//const api_host = "https://localhost:8000/";
let api_host = "https://django-rest-api.us-east-2.elasticbeanstalk.com/";
let client_host = window.location.origin + "/";
if(window.location.hostname.toLowerCase() === "localhost") {
    api_host = "https://localhost:8000/";
}

const oauth2_callback = client_host + "oauth2callback";

const fb_app_id = "257376735105718";
const fb_state_obj = {"provider": "facebook", "referrer": client_host + "#/score_prediction"};
const fb_state_param = encodeURIComponent(JSON.stringify(fb_state_obj));
const fb_req_url = "https://www.facebook.com/v3.1/dialog/oauth?client_id=" +
    fb_app_id + "&redirect_uri=" + encodeURIComponent(oauth2_callback) +
    "&state=" + fb_state_param;

const google_client_id = "870854307699-pags3aepeefo6qprr9822g9qqt5kuo56.apps.googleusercontent.com";
const google_scope = "profile";
const google_state_obj = {"provider": "google-oauth2", "referrer": client_host + "#/score_prediction"};
const google_state_param = encodeURIComponent(JSON.stringify(google_state_obj));
const google_access_type = "offline";
const google_req_url = "https://accounts.google.com/o/oauth2/v2/auth?client_id=" +
    google_client_id + "&redirect_uri=" + encodeURIComponent(oauth2_callback) +
    "&scope=" + google_scope + "&state=" + google_state_param + "&response_type=code" +
    "&access_type=" + google_access_type;

class Playground extends Component {
    loginWithTwitter = () => {
        alert("Not in working state yet, please use facebook or google instead")
    };

    loginWithFacebook = () => {
        window.location.href = fb_req_url;
    };

    loginWithGoogle = () => {
        window.location.href = google_req_url;
    };

    render() {
        return (
            <div>
                <h2>Code Playground</h2>
                <h4>For testing and development purposes</h4>
                <Grid container spacing={8} alignContent="center" alignItems="center" justify="center">
                    <Grid item sm={4} md={3} lg={2}>
                        <FacebookLoginButton align={"center"} style={{"maxWidth": "350px"}}
                                             onClick={this.loginWithFacebook}/>
                    </Grid>
                    <Grid item sm={4} md={3} lg={2}>
                        <GoogleLoginButton align={"center"} style={{"maxWidth": "350px"}}
                                           onClick={this.loginWithGoogle}/>
                    </Grid>
                    <Grid item sm={4} md={3} lg={2}>
                        <TwitterLoginButton align={"center"} style={{"maxWidth": "350px"}}
                                            onClick={this.loginWithTwitter}/>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

Playground.propTypes = {};

export default Playground;