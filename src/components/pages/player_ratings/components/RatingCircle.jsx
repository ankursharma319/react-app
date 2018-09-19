import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar/Avatar";

const styles = {
    avatar: {
        margin: 5,
        color: '#fff',
        backgroundColor: "#ff2d3f",
        width: 50,
        height: 50,
    },
    avatarText: {
        fontSize: "16px",
    }
};

class RatingCircle extends Component {
    getBackgroundColor(value) {
        if(value<5) {
            return "#ff0000";
        } else if (value<6 && value>=5) {
            return "#ff7d00";
        } else if (value<7 && value>=6) {
            return "#cad400";
        } else if (value<8 && value>=7) {
            return "#87ba01";
        } else if (value<9 && value>=8) {
            return "#37a502";
        } else {
            return "#008315";
        }
    };

    render() {
        const { value, classes } = this.props;
        return (
            <Avatar className={classes.avatar} style={{
                backgroundColor: this.getBackgroundColor(value)
            }}
            >
               <div className={classes.avatarText}>
                   {Number(Math.round(value+'e2')+'e-2').toFixed(2)}
               </div>
            </Avatar>
        );
    }
}

RatingCircle.propTypes = {
    classes: PropTypes.object.isRequired
};

RatingCircle.defaultProps = {
    value: 6.5
};

export default withStyles(styles)(RatingCircle);