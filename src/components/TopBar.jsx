import React, {Component} from 'react';
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import AppBar from "@material-ui/core/AppBar/AppBar";
import IconButton from "@material-ui/core/IconButton/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import * as PropTypes from "prop-types";
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import SideBar from "./SideBar";
import AuthStatus from "./AuthStatus";
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
import {Link} from "react-router-dom";

const linkToHome = props => <Link to="/" exact {...props}/>;
const linkToPlayerRatings = props => <Link to="/player_ratings" {...props}/>;
const linkToMessiVsRonaldo = props => <Link to="/messi_vs_ronaldo" {...props}/>;
const linkToScorePrediction = props => <Link to="/score_prediction" {...props}/>;
const linkToCricketManager = props => <Link to="/cricket_manager" {...props}/>;
const linkToOtherWork = props => <Link to="/other_work" {...props}/>;
const linkToAboutMe = props => <Link to="/about_me" {...props}/>;

const styles = {
    root: {
        flexGrow: 1
    },
    grow: {
        flexGrow: 1
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20
    },
    front: {
        flex: 1,
        zIndex: 9999
    }
};

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
class TopBar extends Component {
    state = {
        isSideBarOpen : false
    };

    toggleSideBar = (open) => () => {
        this.setState({
            isSideBarOpen: open,
        });
    };

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <CssBaseline />
                <AppBar position="static" className={classes.front}>
                    <Toolbar>
                        <IconButton className={classes.menuButton}
                                    color="inherit"
                                    aria-label="SideBar"
                                    aria-owns={this.state.isSideBarOpen ? 'side-bar' : null}
                                    aria-haspopup="true"
                                    onClick={this.toggleSideBar(true)}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography
                            color="inherit"
                            className={classes.grow}
                            variant="display1"
                            align="center"
                        > {this.props.title}
                        </Typography>
                        {/*<img src={logo} className="App-logo" alt="logo"/>*/}
                        <AuthStatus/>
                    </Toolbar>
                </AppBar>
                <SideBar id="side-bar" isDrawerOpen={this.state.isSideBarOpen} doToggle={this.toggleSideBar}
                sideListDiv={sideListDiv}/>
            </React.Fragment>
        );
    }
}
TopBar.propTypes = {
    classes: PropTypes.object.isRequired
};

TopBar.defaultProps = {
    title : "Portfolio"
};

export default withStyles(styles)(TopBar);