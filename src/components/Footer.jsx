import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Typography from "@material-ui/core/Typography/Typography";
import {withStyles} from "@material-ui/core";

const styles = theme => ({
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing.unit * 2,
    }
});
class Footer extends Component {
    render() {
        const { classes } = this.props;
        return (
            <footer className={classes.footer}>
                <Typography variant="body2" color="textSecondary" align="center" gutterBottom>
                    Ankur Sharma
                </Typography>
                <Typography variant="body2" align="center" color="textSecondary" component="p">
                    <i className="material-icons md-12">copyright</i>
                </Typography>
            </footer>
        );
    }
}

Footer.propTypes = {};

export default withStyles(styles)(Footer);