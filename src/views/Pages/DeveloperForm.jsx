import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import firebase from "../../constant/api/firebase";

import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";

class DeveloperForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [24, 22],
      selectedValue: null,
      selectedEnabled: "b",
      
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      status: "",
      rate: "",
      rate_unit: "",
      currency: "",

    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeEnabled = this.handleChangeEnabled.bind(this);
  }
  handleChange(event) {
    this.setState({ selectedValue: event.target.value });
  }
  handleChangeEnabled(event) {
    this.setState({ selectedEnabled: event.target.value });
  }
  handleToggle(value) {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  }

  handleFirstNameChange = (e) => {
    this.setState({ firstName : e.target.value})
  }

  handleLastNameChange = (e) => {
    this.setState({ lastName : e.target.value})
  }
  
  handleEmailChange = (e) => {
    this.setState({ email : e.target.value})
  }

  handlePassChange = (e) => {
    this.setState({ password : e.target.value})
  }
  
  handleStatusChange = (e) => {
    this.setState({ status : e.target.value})
  }

  handleRateChange = (e) => {
    this.setState({ rate : e.target.value})
  }

  handleRateUnitChange = (e) => {
    this.setState({ rate_unit : e.target.value})
  }

  handleCurrencyChange = (e) => {
    this.setState({ currency : e.target.value})
  }

  addDeveloper = (e) => {
    debugger
    e.preventDefault();
    const {firstName, lastName, email, password, status, currency, rate, rate_unit } = this.state
    const customer = {
      firstName, lastName, email, password, status, currency, rate, rate_unit
    }
    console.log('user', customer)
    firebase.auth().createUserWithEmailAndPassword(customer.email, customer.password)
      .then(send => {
        var userId = firebase.auth().currentUser.uid;
        var user = firebase.auth().currentUser;
          console.log('user', user) 
          const ref = firebase.database().ref("Developer/" + userId);
                  ref.set(
                    {
                      uid: userId,
                      name: customer.firstName + customer.lastName,
                      email: customer.email,
                      role: "Developer",
                      rate: customer.rate,
                      rate_unit: customer.rate_unit,
                      status: customer.status
                    }
              ).catch((error) => {
                console.log("Error during user creating on firebase", error);
              });
              alert('Developer registered successfully');  
            })
    .catch(error => {
      alert (error)
    });
    this.setState({
      firstName: '', lastName: '', email: '', password: '', status: '', currency: '', rate: '', rate_unit: ''
    })
  }
    
  render() {
    const { classes } = this.props;
    const { firstName, lastName, email, password, status, rate, rate_unit, currency } = this.state;

    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="rose" icon>
              <CardIcon color="rose">
                <h4>Developer</h4>
              </CardIcon>
              {/* <h4 className={classes.cardIconTitle}>Edit a Customer</h4> */}
            </CardHeader>
            <CardBody>
              <form>
                <GridContainer>
                  <GridItem xs={6} sm={6} lg={6}>
                    <CustomInput
                      labelText="First Name"
                      id="registerpassword"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text"
                      }}
                      onChange={this.handleFirstNameChange}
                      value={firstName}
                      
                    />
                  </GridItem>
                  <GridItem xs={6} sm={6} lg={6}>
                    <CustomInput
                      labelText="Last Name"
                      formControlProps={{
                        fullWidth: true
                      }}
                      onChange={this.handleLastNameChange}
                      value={lastName}
                      inputProps={{
                        type: "text"
                        // placeholder: "Disabled",
                        // disabled: true
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} lg={12}>
                    <CustomInput
                      labelText="E-Mail"
                      id="email"
                      formControlProps={{
                        fullWidth: true
                      }}
                      onChange={this.handleEmailChange}
                      value={email}
                      inputProps={{
                        type: "email"
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} lg={12}>
                    <CustomInput
                      id="pass"
                      labelText="Password"
                      formControlProps={{
                        fullWidth: true
                      }}
                      onChange={this.handlePassChange}
                      value={password}
                      
                      inputProps={{
                        type: "password"
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={6} sm={6} lg={6}>
                    <CustomInput
                      labelText="Status"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text"
                      }}
                      onChange={this.handleStatusChange}
                      value={status}
                      
                    />
                  </GridItem>
                  <GridItem xs={6} sm={6} lg={6}>
                    <CustomInput
                      //   id="disabled"
                      labelText="Rate"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text"
                        // placeholder: "Disabled",
                        // disabled: true
                      }}
                      onChange={this.handleRateChange}
                      value={rate}
                      
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={6} sm={6} lg={6}>
                    <CustomInput
                      //   id="disabled"
                      labelText="Rate Unit"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text"
                        // placeholder: "Disabled",
                        // disabled: true
                      }}
                      onChange={this.handleRateUnitChange}
                      value={rate_unit}
                    />
                  </GridItem>
                  <GridItem xs={6} sm={6} lg={6}>
                    <CustomInput
                      //   id="disabled"
                      labelText="Currency"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text"
                        // placeholder: "Disabled",
                        // disabled: true
                      }}
                      onChange={this.handleCurrencyChange}
                      value={currency}
                    />
                  </GridItem>
                  <GridItem xs={6} sm={4}>
                    <Button onClick={this.addDeveloper} color={"rose"}>Add</Button>
                  </GridItem>
                </GridContainer>
              </form>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(regularFormsStyle)(DeveloperForm);
