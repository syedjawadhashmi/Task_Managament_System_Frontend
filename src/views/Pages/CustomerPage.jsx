import React, { Component } from 'react';
// @material-ui/core
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
// import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
// import Divider from '@material-ui/core/Divider';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
import MenuIcon from '@material-ui/icons/Menu';
// import MailIcon from '@material-ui/icons/Mail';
import IconButton from '@material-ui/core/IconButton';
import classNames from 'classnames';
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
// import GridItem from "components/Grid/GridItem.jsx";
import Table from '../Components/Table';
// import { Table, GridContainer, GridItem, Main_Drawer } from '../../component'
const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
    toolbar: theme.mixins.toolbar,
});
class CustomerPage extends Component {
    state = {
        open: false,
    };

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };
    render() {
        const { classes } = this.props;
        const { open } = this.state;
        return (
            <div >
                <GridContainer>
                    {/* <GridItem xs={12} sm={6} md={3}> */}
                    <CssBaseline />
                    {/* <AppBar position="fixed" className={classes.appBar}>
                        <Toolbar>
                            <Typography variant="h6" color="inherit" noWrap>
                                SysBrilliance
                                </Typography>
                            <IconButton
                                color="inherit"
                                aria-label="Open drawer"
                                onClick={this.handleDrawerOpen}
                                className={classNames(classes.menuButton, open && classes.hide)}
                            >
                                <MenuIcon />
                            </IconButton>
                        </Toolbar>
                    </AppBar> */}
                    {/* <Main_Drawer /> */}
                    <main className={classes.content}>
                        <div className={classes.toolbar} />
                        <Table />
                    </main>
                </GridContainer>
            </div>
        );
    }
}
CustomerPage.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(CustomerPage);