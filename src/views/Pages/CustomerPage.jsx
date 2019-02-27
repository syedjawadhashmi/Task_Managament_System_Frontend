import React, { Component } from 'react';
// @material-ui/core
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Table from '../Components/Table';
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
                    <GridItem xs={12} sm={12} md={12}>
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
                    {/* <main className={classes.content}> */}
                        <div className={classes.toolbar} />
                        <Table />
                    {/* </main> */}
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}
CustomerPage.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(CustomerPage);