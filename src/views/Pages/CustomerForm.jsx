import React from "react";
import ReactDOM from 'react-dom';
// @material-ui/core components
import firebase from "../../constant/api/firebase";

import FormLabel from "@material-ui/core/FormLabel";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';

// core components
import Check from "@material-ui/icons/Check";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import MailOutline from "@material-ui/icons/MailOutline";
import validationFormsStyle from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.jsx";
import Close from "@material-ui/icons/Close";
import InputAdornment from "@material-ui/core/InputAdornment";
import { withStyles } from '@material-ui/core/styles';

import { Grid } from '@material-ui/core';

import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 150,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class CustomerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customer : '',
      password: '',
      phone : '',
      contact : '',
      address: '',
      city : '',
      zip_code: '',
      currency: '',
      firstName: '',
      lastName: '',
      email: '',
    };
  }

  handleCustomerChange = (e) => {
    this.setState({ customer : e.target.value})
  }

  handlePassChange = (e) => {
    this.setState({ password : e.target.value})
  }

  handlePhoneChange = (e) => {
    this.setState({ phone : e.target.value})
  }
  
  handleContactChange = (e) => {
    this.setState({ contact : e.target.value})
  }

  handleAddressChange = (e) => {
    this.setState({ address : e.target.value})
  }
  
  handleCityChange = (e) => {
    this.setState({ city : e.target.value})
  }

  handleZipChange = (e) => {
    this.setState({ zip_code : e.target.value})
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

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  addCustomer = (e) => {
      debugger
      e.preventDefault();
      const { customer, phone, contact, password, address, city, zip_code, firstName, lastName, email } = this.state

      const customer_data = {
        firstName, lastName, email, password, customer, phone, contact, address, city, zip_code, 
      }
      console.log('user', customer_data)
      firebase.auth().createUserWithEmailAndPassword(customer_data.email, customer_data.password)
        .then(send => {
          var userId = firebase.auth().currentUser.uid;
          var user = firebase.auth().currentUser;
            console.log('user', user) 
            const ref = firebase.database().ref("Customer/" + userId);
                    ref.set(
                      {
                        uid: userId,
                        name: firstName + lastName,
                        email: email,
                        role: "Customer",
                        customer: customer,
                        phone: phone,
                        zip_code: zip_code,
                        contact: contact,
                        address: address,
                        city: city
                      }
                ).catch((error) => {
                  console.log("Error during user creating on firebase", error);
                });
                alert('Customer Registered Successfully');  
              })
      .catch(error => {
        alert (error)
      });
      this.setState({
        firstName: '', lastName: '', email: '', password: '', customer: '', phone: '', contact: '', address: '', city: '', zip_code: ''
      })    
  }

  render() {
    const { classes } = this.props;
    const { customer, phone, contact, address, city, zip_code, firstName, lastName, email, password } = this.state
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="rose" icon>
              <CardIcon color="rose">
                <h4>Edit a Customer</h4>
              </CardIcon>
            </CardHeader>
            <CardBody>
              <form>
                <CustomInput
                  id="required"
                  labelText="Customer"
                  formControlProps={{
                    fullWidth: true
                  }}
                  onChange={this.handleCustomerChange}
                  value={customer}                
                  inputProps={{
                    type: 'text'
                  }}
                />
                <CustomInput
                  labelText="Phone *"
                  formControlProps={{
                    fullWidth: true
                  }}
                  onChange={this.handlePhoneChange}
                  value={phone}
                  inputProps={{
                    type: "number"
                  }}
                />
                <CustomInput
                  labelText="Contact *"
                  formControlProps={{
                    fullWidth: true
                  }}
                  onChange={this.handleContactChange}
                  value={contact}
                  inputProps={{
                    type: "number"
                  }}
                />
                <CustomInput
                  labelText="Address Line *"
                  formControlProps={{
                    fullWidth: true
                  }}
                  onChange={this.handleAddressChange}
                  value={address}
                  inputProps={{
                    type: "text"
                  }}
                />
                <CustomInput

                  labelText="City *"
                  formControlProps={{
                    fullWidth: true
                  }}
                  onChange={this.handleCityChange}
                  value={city}
                  inputProps={{
                    type: "text"
                  }}
                />
                <CustomInput

                  labelText="Postal / Zip *"
                  formControlProps={{
                    fullWidth: true
                  }}
                  onChange={this.handleZipChange}
                  value={zip_code}
                  inputProps={{
                    type: "number"
                  }}
                />
                <Grid style={{ display: 'flex', flexWrap: "wrap" }} spacing={8}>
                  <GridItem xs={6} sm={6} md={4}>
                  <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel
                      ref={ref => {
                        this.InputLabelRef = ref;
                      }}
                      htmlFor="outlined-age-simple"
                    >
                      USD - US. dollar
                    </InputLabel>
                    <Select
                      value={this.state.age}
                      onChange={this.handleChange}
                      input={
                        <OutlinedInput
                          labelWidth={this.state.labelWidth}
                          name="age"
                          id="outlined-age-simple"
                        />
                      }
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                    {/* <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
                      <InputLabel
                        style={{ fontSize: 10 }}
                        ref={ref => {
                          this.InputLabelRef = ref;
                        }}
                        htmlFor="outlined-age-simple"
                      >
                        USD- US. dollar
                      </InputLabel>
                      <Select
                        value={this.state.currency}
                        onChange={this.handleChange}
                        input={
                          <OutlinedInput
                            labelWidth={this.state.labelWidth}
                            // name="USD- US. dollar"
                            id="outlined-age-simple"
                          />
                        }
                      >
                        <MenuItem value="" disabled>USD- US. dollar</MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                    </FormControl> */}
                  </GridItem>
                  <GridItem xs={6} sm={6} md={4}>
                    <FormControl className={classes.formControl} variant="outlined">
                      <InputLabel
                        style={{ fontSize: 10 }}
                        ref={ref => {
                          this.InputLabelRef = ref;
                        }}
                        htmlFor="outlined-age-simple"
                      >
                        Country
                      </InputLabel>
                      <Select
                        value={this.state.age}
                        onChange={this.handleChange}
                        displayEmpty
                        input={
                          <OutlinedInput
                            style={{ fontSize: 10 }}
                            labelWidth={this.state.labelWidth}
                            name="Country"
                            id="outlined-age-simple"
                          />
                        }
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                    </FormControl>
                  </GridItem>
                </Grid>
                <Grid style={{ marginTop: 10, display: 'flex', flexWrap: "wrap" }} spacing={8}>
                  <GridItem xs={6} sm={6} md={4}>
                    <FormControl className={classes.formControl} variant="outlined">
                      <InputLabel
                        style={{ fontSize: 10 }}
                        ref={ref => {
                          this.InputLabelRef = ref;
                        }}
                        htmlFor="outlined-age-simple"
                      >
                        Consultants
                      </InputLabel>
                      <Select
                        value={this.state.age}
                        onChange={this.handleChange}
                        input={
                          <OutlinedInput
                            labelWidth={this.state.labelWidth}
                            name="Consultants"
                            id="outlined-age-simple"
                          />
                        }
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                    </FormControl>
                  </GridItem>
                  <GridItem xs={6} sm={6} md={6}>
                    <FormControl className={classes.formControl} variant="outlined">
                      <InputLabel
                        style={{ fontSize: 10 }}
                        ref={ref => {
                          this.InputLabelRef = ref;
                        }}
                        htmlFor="outlined-age-simple"
                      >
                        Product Owners
                      </InputLabel>
                      <Select
                        value={this.state.age}
                        onChange={this.handleChange}
                        input={
                          <OutlinedInput
                            labelWidth={this.state.labelWidth}
                            name="Product Owners"
                            id="outlined-age-simple"
                          />
                        }
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                    </FormControl>
                  </GridItem>
                </Grid>
                {/* </GridContainer> */}
                {/* <GridContainer> */}
                <CustomInput

                  labelText="First Name *"
                  formControlProps={{
                    fullWidth: true
                  }}
                  onChange={this.handleFirstNameChange}
                  value={firstName}
                  inputProps={{
                    type: "text"
                  }}
                />
                <CustomInput
                  labelText="Last Name *"
                  onChange={this.handleLastNameChange}
                  value={lastName}
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    type: "text"
                  }}
                />
                <CustomInput
                  labelText="Email Address *"
                  id="registeremail"
                  formControlProps={{
                    fullWidth: true
                  }}
                  onChange={this.handleEmailChange}
                  value={email}
                  inputProps={{
                    type: "email"
                  }}
                />
                <CustomInput
                  labelText="Passwrod *"
                  id="registeremail"
                  formControlProps={{
                    fullWidth: true
                  }}
                  onChange={this.handlePassChange}
                  value={password}
                  inputProps={{
                    type: "password"
                  }}
                />
                <Button
                  color="rose"
                  onClick={this.addCustomer}
                  className={classes.registerButton}
                >
                  Add
                </Button>
                {/* </Grid> */}
              </form>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(styles)(CustomerForm);
