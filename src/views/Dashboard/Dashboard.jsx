import React from 'react';

// @material-ui/core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from "components/CustomButtons/Button.jsx";
import extendedTablesStyle from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.jsx";
import ExtendedTables from "../Tables/ExtendedTables";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Fab from '@material-ui/core/Fab';

// import link for routing
import { Link } from 'react-router-dom';

import firebase from "../../constant/api/firebase";



class DeveloperLis extends React.Component {
  constructor(){
    super();
    this.state = {
      developers : ''
    }
  }

  componentDidMount() {
    let arrdata = [];
    let dataabase = firebase.database().ref("/Developer/");
    dataabase.on("value", object => {
      let data = object.val();
      for (var x in data) arrdata.push(data[x]);
      this.setState({
        developers : arrdata
      })
      console.log("fetched data", arrdata);
    });
  }

  render() {
    const { developers } = this.state
    console.log('dev', developers)
    const tableData = developers;
    
    const tableHead = [
      "#",
      "First Name",
      "Last Name",
      "Email",
      // "Password ",
      "Status  ",
      "Rate ",
      "Rate Unit",
      "Currency",
      "Actions"
    ]

    // const tableData = [
    //   {
    //     num :  "1",
    //     firstName:  "Andrew",
    //     lastName:   "Mike",
    //     Email:   "Andrew@Mike.com",
    //     Password:  "*******",
    //     Status:  "Active",
    //     rate:  "$50",
    //     Rate_Unit:  "Hourly",
    //     Currency:  "$",
    //     Actions:  simpleButtons
    //   },
    //   // [
    //   //   "2",
    //   //   "John",
    //   //   "Doe",
    //   //   "John@doe.com",
    //   //   "*******",
    //   //   "Active",
    //   //   "$80",
    //   //   "Hourly",
    //   //   "$",
    //   //   simpleButtons
    //   // ],
    //   // [
    //   //   "3",
    //   //   "Mike ",
    //   //   "Monday",
    //   //   "Monday@doe.com",
    //   //   "*******",
    //   //   "Suspended",
    //   //   "$20",
    //   //   "Man Day",
    //   //   "$",
    //   //   simpleButtons
    //   // ],
    //   // [
    //   //   "4",
    //   //   "Alex",
    //   //   "Mike",
    //   //   "Mike@Mike.com",
    //   //   "*******",
    //   //   "Active",
    //   //   "$100",
    //   //   "Man Day",
    //   //   "$",
    //   //   simpleButtons
    //   // ],
    //   // [
    //   //   "4",
    //   //   "Paul",
    //   //   "Dones",
    //   //   "Dones@Paul.com",
    //   //   "*******",
    //   //   "Suspend",
    //   //   "N/A",
    //   //   "Man Day",
    //   //   "$",
    //   //   simpleButtons
    //   // ],
    // ]
    // console.log('data', tableData)

    return (
      <div>
        <GridContainer>
          <Card>
            <CardHeader color="rose" icon>
              <CardIcon color="rose">
                <h4>Developer</h4>
              </CardIcon>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem style={{display:'flex',flexDirection:'row',justifyContent:'flex-end'}} xs={12} sm={12} md={12} lg={12}>
                  <Link to='developer-form'>
                    <Button
                      variant="contained"
                      // size="medium"
                      color="primary"
                      // className={classes.button}
                      // aria-label="Add"
                      style={{ fontSize: 10, textTransform: 'capitalize' }}
                    // className={classes.margin}
                    >
                      {/* <NavigationIcon className={classes.extendedIcon} /> */}
                      Add a developer
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

export default withStyles(extendedTablesStyle)(DeveloperLis);
