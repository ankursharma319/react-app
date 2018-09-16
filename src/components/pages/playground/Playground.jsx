import React, {Component} from 'react';

const my_host = "https://localhost:3000/#/";
const login_response_path = "auth/facebook/login_response";
const app_id = "257376735105718";
const redirect_uri = my_host + login_response_path;
const state_param = "random_state";
const fb_req_url = "https://www.facebook.com/v3.1/dialog/oauth?client_id=" +
    app_id + "&redirect_uri=" + encodeURIComponent(redirect_uri) + "&state=" + state_param;

class Playground extends Component {
    render() {
        return (
            <div>
                <h3>Code Playground</h3>
                <a href={fb_req_url}>Continue with Facebook</a>
            </div>
        );
    }
}

Playground.propTypes = {};

export default Playground;