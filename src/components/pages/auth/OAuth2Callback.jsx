import React, {Component} from 'react';
import queryString from 'query-string';

const parsedGET = queryString.parse(window.location.search)
const parsedHash = queryString.parse(window.location.hash);
let api_host = "https://django-rest-api.us-east-2.elasticbeanstalk.com/";
if(window.location.hostname.toLowerCase() === "localhost") {
    api_host = "https://localhost:8000/";
}

class OAuth2Callback extends Component {
    getAccessToken = (code, provider) => {
        const url = api_host + "api/login/social/token_user/";
        const content = {"code":code, "provider":provider};
        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        const init = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(content),
            mode: 'cors'
        };
        const request = new Request(url, init);

        fetch(request).then(res => res.json()).then(
            (result) => {
                alert(JSON.stringify(result))
            },
            (error) => {
                alert(error)
            }
        )
    };

    componentDidMount() {
        if("code" in parsedGET && "state" in parsedGET) {
            const stateObj = JSON.parse(parsedGET["state"])
            if("provider" in stateObj) {
                this.getAccessToken(parsedGET["code"], stateObj["provider"])
            }
        }
    }

    render() {
        return (
            <div>
                Redirected from oauth2 here.
                <br/>Parsed GET params from url : {JSON.stringify(parsedGET)}
                <br/>Parsed hash params from url : {JSON.stringify(parsedHash)}
            </div>
        );
    }
}

export default OAuth2Callback;