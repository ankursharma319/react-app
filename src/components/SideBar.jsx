import * as PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer/SwipeableDrawer";
import List from "@material-ui/core/List/List";
import Divider from "@material-ui/core/Divider/Divider";
import React from "react";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";

import MailIcon from '@material-ui/icons/Mail';
import InboxIcon from '@material-ui/icons/Inbox';

const mailFolderListItems = (
    <div>
        <ListItem button>
            <ListItemIcon>
                <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
        </ListItem>
    </div>
);

const otherMailFolderListItems = (
    <div>
        <ListItem button>
            <ListItemIcon>
                <MailIcon />
            </ListItemIcon>
            <ListItemText primary="All mail" />
        </ListItem>
    </div>
);

const styles = {
    list: {
        width: 250,
    }
};

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
    sideListDiv : (
        <div>
            <List>{mailFolderListItems}</List>
            <Divider />
            <List>{otherMailFolderListItems}</List>
        </div>
    ),
    isDrawerOpen : false
};

export default withStyles(styles)(SideBar);