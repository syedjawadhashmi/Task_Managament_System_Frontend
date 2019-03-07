import React from 'react';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import Fab from '@material-ui/core/Fab';

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from "components/CustomButtons/Button.jsx";
import extendedTablesStyle from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.jsx";
import ExtendedTables from "../Tables/ExtendedTables";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";

// import link for routing
import { Link } from 'react-router-dom';

import firebase from "../../constant/api/firebase";


class CustomerList extends React.Component {
  constructor(){
    super();
    this.state = {
      customers : ''
    }
  }

  componentDidMount() {
    let arrdata = [];
    let dataabase = firebase.database().ref("/Customer/");
    dataabase.on("value", object => {
      let data = object.val();
      for (var x in data) arrdata.push(data[x]);
      this.setState({
        customers : arrdata
      })
      console.log("fetched data", arrdata);
    });
  }


  render() {

    const { customers } = this.state
    console.log('customer', customers)
    const tableData = customers;

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
      "Customer",
      "Phone",
      "City",
      "Address",
      "Contact",
      "Zip Code",
      "Actions"
    ]
    // const tableData = [
    //   [
    //     "1",
    //     "Andrew Mike",
    //     "Andrew@Mike.com",
    //     "+920231231",
    //     simpleButtons
    //   ],
    //   ["2", "John Doe", "John@doe.com", "+920231231",
    //     simpleButtons
    //   ],
    //   [
    //     "3",
    //     "Alex Mike",
    //     "Alex@Mike.com",
    //     "+2443324234",
    //     simpleButtons
    //   ],
    //   [
    //     "4",
    //     "Mike Monday",
    //     "Mike@Monday",
    //     "+324263464",
    //     simpleButtons
    //   ],
    //   [
    //     "5",
    //     "Paul Dickens",
    //     "Paul@Dickens.com",
    //     "+4537534215",
    //     simpleButtons
    //   ]
    // ]
    console.log('data', tableData)

    return (
      <div>
        <GridContainer>
          <Card>
            <CardHeader color="rose" icon>
              <CardIcon color="rose">
                <h4>Customer</h4>
              </CardIcon>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }} xs={12} sm={12} md={12}>
                  <Link to='customer-form'>
                    <Button
                      variant="contained"
                      size="medium"
                      color="primary"
                      // aria-label="Add"
                      style={{ fontSize: 10, textTransform: 'capitalize' }}
                    // className={classes.margin}
                    >
                      {/* <NavigationIcon className={classes.extendedIcon} /> */}
                      Add a Customer
                    </Button>
                  </Link>
                </GridItem>
                <ExtendedTables tableHead={tableHead} tableData={tableData} />
              </GridContainer>
            </CardBody>
          </Card>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(extendedTablesStyle)(CustomerList);
