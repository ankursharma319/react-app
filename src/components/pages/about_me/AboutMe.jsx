import React, {Component} from 'react';
import Typography from "@material-ui/core/Typography/Typography";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar/Avatar";

const styles = {
    row: {
        display: 'flex',
        justifyContent: 'center',
        marginLeft: '20vw',
        marginRight: '20vw',
        marginTop: 10,
    },
    avatar: {
        margin: 10,
        width: 200,
        height: 200,
        display: 'flex',
        justifyContent: 'center',
    },
};

const images_folder = window.location.origin + "/images/";

class AboutMe extends Component {
    render() {
        const {classes} = this.props;
        return (
            <div>
                <h1>
                    About Me
                </h1>
                <div className={classes.row}>
                <Avatar
                    alt="Ankur Sharma"
                    src={images_folder+"me.jpg"}
                    className={classes.avatar}
                />
                </div>
                <div className={classes.row}>
                <Typography>
                    <p>
                    I am a MSc Computer Science student at University of Southampton. I am passionate about Machine Learning and Computer Vision. Other than software development,
                    I love to play football, cricket, badminton, watch Real Madrid play and watch Cristiano Ronaldo play.
                    </p>
                    <p>
                    If you would like to get in touch for whatever reason, please contact me at ankur underscore sharma 309 at yahoo dot com.
                    </p>
                </Typography>
                </div>
            </div>
        );
    }
}

AboutMe.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AboutMe);