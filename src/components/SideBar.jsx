import * as PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer/SwipeableDrawer";
import Divider from "@material-ui/core/Divider/Divider";
import React from "react";

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
        <Divider />
    ),
    isDrawerOpen : false
};

export default withStyles(styles)(SideBar);