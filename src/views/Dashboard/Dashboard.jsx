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
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";

// import link for routing
import { Link } from 'react-router-dom';
import firebase from "../../constant/api/firebase";
import axios from 'axios';
const rooturl = 'http://localhost:3000/developers';



class DeveloperLis extends React.Component {
  constructor(){
    super();
    this.state = {
      developers : [],
      posts: "",
    }
        
     // Binding functions here...!
     this.deleteUser = this.deleteUser.bind(this);

  }

  componentDidMount() {
    this.getUser();
  }

  getUser =() => {
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

  deleteUser = (key, index) => {
    console.log('key, uid', key, index);
    let fetchpost = this.state.developers;
    // return (
      debugger
      axios.post(`${rooturl}/delete-user`,{ uid: key }).then((res) => {
        console.log("response of delete req", res)
        console.log("select of delete req", key)
        fetchpost.splice(index , 1);
        this.setState({
          developers : fetchpost
        });         
      })
      .catch((err) => {
        console.log("error", err);
        let errorMessage = err; 
        alert(errorMessage)
      })
    // )
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
      "Password ",
      "Status  ",
      "Rate ",
      "Rate Unit",
      "Currency",
      "Actions"
    ]

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
                  <Link 
                    to={{
                      pathname: "developer-form",
                      state: {
                        _param: ''
                      }
                    }} 
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ fontSize: 10, textTransform: 'capitalize' }}
                    >
                      Add a developer
                    </Button>
                  </Link>
                </GridItem>
                <ExtendedTables tableHead={tableHead} tableData={tableData} deleteUser={this.deleteUser} />
              </GridContainer>
            </CardBody>
          </Card>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(extendedTablesStyle)(DeveloperLis);
