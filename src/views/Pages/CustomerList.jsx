/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import Fab from "@material-ui/core/Fab";

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
import { Link } from "react-router-dom";

import firebase from "../../constant/api/firebase";

class CustomerList extends React.Component {
  constructor() {
    super();
    this.state = {
      posts: "",
      customers: []
    };

    let currentUser = JSON.parse(localStorage.getItem('currentUser'))
    let email = currentUser.email;

    // Calling Data from Firebase and render into the DOM...!
    firebase
      .database()
      .ref("Customer")
      .on("child_added", customer => {

        let currentpost = this.state.customers;

        let obj = {
          all_customers: customer.val(),
          key: customer.key
        };

        if (email == 'admin@gmail.com') {
          currentpost.push(obj);

          this.setState({
            customers: currentpost,
            posts: ""
          });
        }

        const found = obj.all_customers.users.some(el => (el.email === email));
        if (found) {
          currentpost.push(obj);

          this.setState({
            customers: currentpost,
            posts: ""
          });
        }
      });

    // Binding functions here...!
    this.deleteCustomer = this.deleteCustomer.bind(this);
  }

  deleteCustomer = (key, index) => {
    console.log("key", key, index);
    let fetchpost = this.state.customers;
    firebase
      .database()
      .ref("Customer")
      .child(key)
      .remove()
      .then(() => {
        fetchpost.splice(index, 1);
        this.setState({
          customers: fetchpost
        });
      });
  };

  render() {
    const { customers } = this.state;
    const tableData = customers;

    console.log("customer", tableData);
    // const keys = keys;

    const tableHead = [
      "#",
      "Name",
      "Email",
      "Phone",
      "City",
      "Address",
      "Contact",
      "Zip Code",
      "Actions"
    ];
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
                <GridItem
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end"
                  }}
                  xs={12}
                  sm={12}
                  md={12}
                >
                  <Link
                    to={{
                      pathname: "add-customer-form",
                      state: {
                        _param: ""
                      }
                    }}
                  >
                    <Button
                      variant="contained"
                      size="medium"
                      color="primary"
                      style={{ fontSize: 10, textTransform: "capitalize" }}
                    >
                      Add a Customer
                    </Button>
                  </Link>
                </GridItem>
                <ExtendedTables
                  tableHead={tableHead}
                  tableData={tableData}
                  deleteUser={this.deleteCustomer}
                />
              </GridContainer>
            </CardBody>
          </Card>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(extendedTablesStyle)(CustomerList);
