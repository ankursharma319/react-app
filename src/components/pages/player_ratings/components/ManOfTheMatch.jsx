import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";

const styles = {
    gridRoot: {
        marginTop: "5px",
        marginBottom: "5px",
    }
};

class ManOfTheMatch extends Component {
    render() {
        const {classes, players_data, handleChange} = this.props;
        return (
            <div>
                <Grid container={true} spacing={8} alignItems={"center"} alignContent={"center"}
                      justify={"space-evenly"} className={classes.gridRoot}>
                    <Grid item xs={6}>
                        <Typography align={"center"} variant={"body1"}>
                            Player of the match :
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        {Object.keys(players_data).map( i => (
                            players_data[i].common_name
                        ))}
                    </Grid>
                </Grid>
            </div>
        );
    }
}

ManOfTheMatch.propTypes = {
    classes: PropTypes.object.isRequired
};

ManOfTheMatch.defaultProps = {
    value: ""
};

export default withStyles(styles)(ManOfTheMatch);