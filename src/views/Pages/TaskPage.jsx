/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { Component } from "react";
// @material-ui/core
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
// eslint-disable-next-line no-unused-vars
import CssBaseline from "@material-ui/core/CssBaseline";

// core components
// eslint-disable-next-line no-unused-vars
import GridContainer from "components/Grid/GridContainer.jsx";
// eslint-disable-next-line no-unused-vars
import GridItem from "components/Grid/GridItem.jsx";
// eslint-disable-next-line no-unused-vars
import TaskTable from "../Components/TaskTable";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Card from "components/Card/Card.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CardBody from "components/Card/CardBody.jsx";
// import link for routing
import { Link } from "react-router-dom";
const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  toolbar: theme.mixins.toolbar
});

class TaskPage extends Component {
  state = {
    open: false
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
      <div>
        <GridContainer>
          <Card>
            <CardHeader color="rose" icon>
              <CardIcon color="rose">
                <h4>Tasks</h4>
              </CardIcon>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end"
                  }}
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                >
                  <CssBaseline />
                  <div className={classes.toolbar} />
                  <TaskTable />
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridContainer>
      </div>
    );
  }
}
TaskPage.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(TaskPage);
