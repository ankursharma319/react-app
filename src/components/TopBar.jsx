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
                <SideBar id="side-bar" isDrawerOpen={this.state.isSideBarOpen} doToggle={this.toggleSideBar}/>
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