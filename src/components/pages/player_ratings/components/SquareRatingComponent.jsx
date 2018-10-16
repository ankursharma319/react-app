import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography/Typography";

const styles = {
    root: {
        width: "30px",
        display: "inline-block",
        float: "left",
        marginRight: "2px",
        marginLeft: "2px",
        align: "left",
    },
    typography:{
        color: "#ffffff"
    },
};

class SquareRatingComponent extends Component {
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
        const {value, classes} = this.props;
        return (
            <div className={classes.root}>
                <Typography variant={"body1"} className={classes.typography}
                            style={{
                                backgroundColor: this.getBackgroundColor(value)
                            }}
                >
                    {Number(Math.round(value+'e1')+'e-1').toFixed(1)}
                </Typography>
            </div>
        );
    }
}

SquareRatingComponent.propTypes = {
    classes: PropTypes.object.isRequired
};

SquareRatingComponent.defaultProps = {
    value: 5
};

export default withStyles(styles)(SquareRatingComponent);