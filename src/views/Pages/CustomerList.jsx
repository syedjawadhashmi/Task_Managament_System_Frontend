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

class CustomerList extends React.Component {
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
            "Name",
            "Email",
            "Phone",
            "Actions"
        ]
        const tableData = [
            [
              "1",
              "Andrew Mike",
              "Andrew@Mike.com",
              "+920231231",
              simpleButtons
            ],
            ["2", "John Doe", "John@doe.com", "+920231231", 
            simpleButtons
            ],
            [
              "3",
              "Alex Mike",
              "Alex@Mike.com",
              "+2443324234",
              simpleButtons
            ],
            [
              "4",
              "Mike Monday",
              "Mike@Monday",
              "+324263464",
              simpleButtons
            ],
            [
              "5",
              "Paul Dickens",
              "Paul@Dickens.com",
              "+4537534215",
              simpleButtons
            ]
          ]
          console.log('data', tableData)

        return(
            <div>
                <GridContainer>
                    <Card>
                        <CardBody>
                            <GridContainer>
                                <GridItem xs={9} sm={9} md={9}>
                                    <h4>Customer</h4>
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
                                    Add a Customer
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

export default withStyles(extendedTablesStyle)(CustomerList);
