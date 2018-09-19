import {Component} from "react";
import Grid from "@material-ui/core/Grid/Grid";
import Avatar from "@material-ui/core/Avatar/Avatar";
import Typography from "@material-ui/core/Typography/Typography";
import Slider from "@material-ui/lab/Slider/Slider";
import PropTypes from "prop-types";
import React from "react";
import {withStyles} from "@material-ui/core";
import RatingCircle from "./RatingCircle";
import SquareRatingComponent from "./SquareRatingComponent";
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

class PlayerRatingComponent extends Component {
    render() {
        const {player_data, classes, handleChange} = this.props;
        const images_folder = window.location.origin + "/images/";
        return (
            <div className={classes.root}>
                <Grid container={true} spacing={8} alignItems={"center"} alignContent={"center"}
                      justify={"space-evenly"} className={classes.gridRoot}>
                    <Grid item md={1} xs={2}>
                        <Avatar alt={player_data.first_name.charAt(0) + player_data.last_name.charAt(0)}
                                src={images_folder + player_data.common_name.toLowerCase() + ".jpg"}
                                className={classes.bigAvatar}/>
                    </Grid>
                    <Grid item md={2} xs={2}>
                        <Typography variant={"body2"}>
                            {player_data.first_name} {player_data.last_name}
                        </Typography>
                    </Grid>
                    <Grid item md={5} xs={5}>
                        <Slider value={player_data["rating"]} className={classes.slides} min={0} max={10} step={0.25} aria-labelledby="label" onChange={(event, value)=> handleChange(event, player_data.id, value)} />
                    </Grid>
                    <Grid item md={1} xs={2}>
                        <RatingCircle value={player_data["rating"]}/>
                    </Grid>
                    <Grid item md={3} xs={6}>
                        <div className={classes.root}>
                            <Typography variant={"body1"} align={"left"} className={classes.typographyStyle}>Previous</Typography>
                            {
                                player_data.last_3_ratings.map( (rating, i) => (
                                    <SquareRatingComponent key={i} value={rating}/>
                                ))
                            }
                        </div>
                    </Grid>
                </Grid>
                <Divider/>
            </div>
        );
    }
}

PlayerRatingComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PlayerRatingComponent);