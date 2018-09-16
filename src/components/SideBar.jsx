import * as PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer/SwipeableDrawer";
import React from "react";
import List from "@material-ui/core/List/List";
import Divider from "@material-ui/core/Divider/Divider";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import ModeCommentIcon from "@material-ui/icons/ModeComment";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import PollIcon from "@material-ui/icons/Poll";
import GamesIcon from "@material-ui/icons/Games";
import MoreIcon from "@material-ui/icons/More";
import WhatsHotIcon from "@material-ui/icons/Whatshot";
import DeveloperBoardIcon from "@material-ui/icons/DeveloperBoard";
import {Link} from "react-router-dom";

const styles = {
    list: {
        width: 250,
    }
};

const linkToHome = props => <Link to="/" exact {...props}/>;
const linkToPlayerRatings = props => <Link to="/player_ratings" {...props}/>;
const linkToMessiVsRonaldo = props => <Link to="/messi_vs_ronaldo" {...props}/>;
const linkToScorePrediction = props => <Link to="/score_prediction" {...props}/>;
const linkToCricketManager = props => <Link to="/cricket_manager" {...props}/>;
const linkToOtherWork = props => <Link to="/other_work" {...props}/>;
const linkToAboutMe = props => <Link to="/about_me" {...props}/>;
const linkToPlayground = props => <Link to="/playground" {...props}/>;

const sideListDiv = (
    <div>
        <List>
            <ListItem button component={linkToHome}>
                <ListItemIcon>
                    <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
            </ListItem>
            <ListItem button component={linkToMessiVsRonaldo}>
                <ListItemIcon>
                    <WhatsHotIcon/>
                </ListItemIcon>
                <ListItemText primary="Messi vs Ronaldo" />
            </ListItem>
            <ListItem button component={linkToPlayerRatings}>
                <ListItemIcon>
                    <PollIcon/>
                </ListItemIcon>
                <ListItemText primary="Player Ratings" />
            </ListItem>
            <ListItem button component={linkToScorePrediction}>
                <ListItemIcon>
                    <ModeCommentIcon/>
                </ListItemIcon>
                <ListItemText primary="Score Prediction" />
            </ListItem>
            <ListItem button component={linkToCricketManager}>
                <ListItemIcon>
                    <GamesIcon/>
                </ListItemIcon>
                <ListItemText primary="Cricket Manager" />
            </ListItem>
            <ListItem button component={linkToPlayground}>
                <ListItemIcon>
                    <DeveloperBoardIcon/>
                </ListItemIcon>
                <ListItemText primary="Playground" />
            </ListItem>
            <ListItem button component={linkToOtherWork}>
                <ListItemIcon>
                    <MoreIcon/>
                </ListItemIcon>
                <ListItemText primary="Other Work" />
            </ListItem>
            <ListItem button component={linkToAboutMe}>
                <ListItemIcon>
                    <PermIdentityIcon />
                </ListItemIcon>
                <ListItemText primary="About me" />
            </ListItem>
            <Divider />
        </List>
    </div>
);

class SideBar extends React.Component {
    render() {
        const { sideListDiv } = this.props;

        return (
            <div>
                <SwipeableDrawer
                    open={this.props.isDrawerOpen}
                    onClose={this.props.doToggle(false)}
                    onOpen={this.props.doToggle(true)}
                >
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.props.doToggle(false)}
                        onKeyDown={this.props.doToggle(false)}
                    >
                        {sideListDiv}
                    </div>
                </SwipeableDrawer>
            </div>
        );
    }
}

SideBar.propTypes = {
    classes: PropTypes.object.isRequired
};

SideBar.defaultProps = {
    sideListDiv : sideListDiv,
    isDrawerOpen : false
};

export default withStyles(styles)(SideBar);