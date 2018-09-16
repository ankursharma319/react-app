import React, {Component} from 'react';
import queryString from 'query-string';

console.log(window.location.search);
const parsed = queryString.parse(window.location.search);
console.log(parsed);

console.log(window.location.hash);
const parsedHash = queryString.parse(window.location.hash);
console.log(parsedHash);

class FacebookLoginResponse extends Component {
    render() {
        return (
            <div>
                Redirected from facebook here. Parsed from url :
                {JSON.stringify(parsed)}
                {JSON.stringify(parsedHash)}
            </div>
        );
    }
}

export default FacebookLoginResponse;