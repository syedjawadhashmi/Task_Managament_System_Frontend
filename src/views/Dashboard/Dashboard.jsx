import React from 'react';
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from "components/CustomButtons/Button.jsx";
import extendedTablesStyle from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.jsx";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import Fab from '@material-ui/core/Fab';



import ExtendedTables from "../Tables/ExtendedTables";

class DeveloperLis extends React.Component {
    render(){
        const { classes } = this.props;
        const simpleButtons = [
            { color: "success", icon: Edit },
            { color: "danger", icon: Close }
          ].map((prop, key) => {
            return (
              <Button
                color={prop.color}
                simple
                className={classes.actionButton}
                key={key}
              >
                <prop.icon className={classes.icon} />
              </Button>
            );
          });

        const tableHead = [
            "#",
            "First Name",
            "Last Name",
            "Email",
            "Password ",
            "Status  ",
            "Rate ",
            "Rate Unit",
            "Currency",
            "Actions"
        ]
        const tableData = [
            [
              "1",
              "Andrew",
              "Mike",
              "Andrew@Mike.com",
              "*******",
              "Active",
              "$50",
              "Hourly",
              "$",
              simpleButtons
            ],
            [
              "2",
              "John",
              "Doe",
              "John@doe.com",
              "*******",
              "Active",
              "$80",
              "Hourly",
              "$",
              simpleButtons
            ],
            [
              "3",
              "Mike ",
              "Monday",
              "Monday@doe.com",
              "*******",
              "Suspended",
              "$20",
              "Man Day",
              "$",
              simpleButtons
            ],
            [
              "4",
              "Alex",
              "Mike",
              "Mike@Mike.com",
              "*******",
              "Active",
              "$100",
              "Man Day",
              "$",
              simpleButtons
            ],
            [
              "4",
              "Paul",
              "Dones",
              "Dones@Paul.com",
              "*******",
              "Suspend",
              "N/A",
              "Man Day",
              "$",
              simpleButtons
            ],
          ]
          console.log('data', tableData)

        return(
            <div>
                <GridContainer>
                    <Card>
                        <CardBody>
                            <GridContainer>
                                <GridItem xs={9} sm={9} md={9}>
                                    <h4>Developer</h4>
                                </GridItem>
                                <GridItem xs={3} sm={3} md={3}>
                                <Fab
                                  variant="extended"
                                  size="medium"
                                  color="primary"
                                  aria-label="Add"
                                  style={{fontSize: 10, textTransform: 'capitalize'}}
                                  // className={classes.margin}
                                >
                                  {/* <NavigationIcon className={classes.extendedIcon} /> */}
                                  Add a Developer
                                </Fab>
                                </GridItem>
                                <ExtendedTables tableHead={tableHead} tableData={tableData}/>
                            </GridContainer>                        
                        </CardBody>
                    </Card>
                </GridContainer>
            </div>
        );
    }
}

export default withStyles(extendedTablesStyle)(DeveloperLis);
