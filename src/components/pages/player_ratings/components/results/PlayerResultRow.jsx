import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid/Grid";
import Avatar from "@material-ui/core/Avatar/Avatar";
import Typography from "@material-ui/core/Typography/Typography";
import RatingCircle from "../RatingCircle";
import Divider from "@material-ui/core/Divider/Divider";

const styles = {
    root: {
        flexGrow: 1
    },
    bigAvatar: {
        width: 60,
        height: 60,
        float: "right",
        //marginLeft: "auto",
        //marginRight: "auto",
    },
    slides: {
        flexGrow: 1,
    },
    typographyStyle: {
        float: "left",
        marginRight: "4px",
        marginLeft: "4px",
    },
    gridRoot: {
        marginTop: "5px",
        marginBottom: "5px",
    }
};

class PlayerResultRow extends Component {
    state = {};

    render() {
        const {player_data, classes} = this.props;
        const images_folder = window.location.origin + "/images/players/";
        return (
            <div>
                <Grid container={true} spacing={8} alignItems={"center"} alignContent={"center"}
                      justify={"space-evenly"} className={classes.gridRoot}>
                    <Grid item xs={3}>
                        <Avatar alt={player_data.first_name.charAt(0) + player_data.last_name.charAt(0)}
                                src={images_folder + player_data.common_name.toLowerCase() + ".jpg"}
                                className={classes.bigAvatar}/>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant={"body2"}>
                            {player_data.first_name} {player_data.last_name}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <RatingCircle value={player_data["rating"]}/>
                    </Grid>
                </Grid>
                <Divider/>
            </div>
        );
    }
}

PlayerResultRow.propTypes = {
    classes: PropTypes.object.isRequired
};

PlayerResultRow.defaultProps = {};

export default withStyles(styles)(PlayerResultRow);