import React, {Component} from 'react';
import PropTypes from 'prop-types';

class InvalidUrl extends Component {
    render() {
        return (
            <div>
                <h3> Sorry, this page does not exist. Invalid URL. </h3>
            </div>
        );
    }
}

InvalidUrl.propTypes = {};

export default InvalidUrl;