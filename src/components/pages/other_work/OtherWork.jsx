import React, {Component} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
    otherWorkRoot: {
        //minHeight: '60vh',
        maxHeight: '70vh',
        maxWidth: '90vw',
        flexGrow: 1,
        margin: 'auto'
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
});

class OtherWork extends Component {
    state = {}

    componentDidMount() {
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.otherWorkRoot}>
                <h2>Other Work</h2>
            </div>
        );
    }
}

OtherWork.propTypes = {};

export default withStyles(styles)(OtherWork);