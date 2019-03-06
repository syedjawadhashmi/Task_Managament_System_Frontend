import React from "react";
import ReactDOM from 'react-dom';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
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

import { Grid } from '@material-ui/core';

import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";

class CustomerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customer : '',
      phone : '',
      contact : '',
      address: '',
      city : '',
      zip_code: '',
      currency: '',
      firstName: '',
      lastName: '',
      email: '',

      // registerEmail: "",
      // registerEmailState: "",
      // registerPassword: "",
      // registerPasswordState: "",
      // registerConfirmPassword: "",
      // registerConfirmPasswordState: "",
      // registerCheckbox: false,
      // registerCheckboxState: "",
      // checked: [24, 22],
      // selectedValue: null,
      // selectedEnabled: "b",
      // // login form
      // loginEmail: "",
      // loginEmailState: "",
      // loginPassword: "",
      // loginPasswordState: "",
      // // type validation
      // required: "",
      // requiredState: "",
      // typeEmail: "",
      // typeEmailState: "",
      // number: "",
      // numberState: "",
      // url: "",
      // urlState: "",
      // equalTo: "",
      // whichEqualTo: "",
      // equalToState: "",
      // // range validation
      // minLength: "",
      // minLengthState: "",
      // maxLength: "",
      // maxLengthState: "",
      // range: "",
      // rangeState: "",
      // minValue: "",
      // minValueState: "",
      // maxValue: "",
      // labelWidth: 2,
      // maxValueState: ""
    };
    // this.handleChange = this.handleChange.bind(this);
    // this.handleChangeEnabled = this.handleChangeEnabled.bind(this);
  }

  // verifyEmail(value) {
  //   var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //   if (emailRex.test(value)) {
  //     return true;
  //   }
  //   return false;
  // }

  // componentDidMount() {
  //   this.setState({
  //     labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth
  //   });
  // }

  // // function that verifies if a string has a given length or not
  // verifyLength(value, length) {
  //   if (value.length >= length) {
  //     return true;
  //   }
  //   return false;
  // }
  // // function that verifies if two strings are equal
  // compare(string1, string2) {
  //   if (string1 === string2) {
  //     return true;
  //   }
  //   return false;
  // }
  // // function that verifies if value contains only numbers
  // verifyNumber(value) {
  //   var numberRex = new RegExp("^[0-9]+$");
  //   if (numberRex.test(value)) {
  //     return true;
  //   }
  //   return false;
  // }
  // // verifies if value is a valid URL
  // verifyUrl(value) {
  //   try {
  //     new URL(value);
  //     return true;
  //   } catch (_) {
  //     return false;
  //   }
  // }
  // change(event, stateName, type, stateNameEqualTo, maxValue) {
  //   switch (type) {
  //     case "email":
  //       if (this.verifyEmail(event.target.value)) {
  //         this.setState({ [stateName + "State"]: "success" });
  //       } else {
  //         this.setState({ [stateName + "State"]: "error" });
  //       }
  //       break;
  //     case "password":
  //       if (this.verifyLength(event.target.value, 1)) {
  //         this.setState({ [stateName + "State"]: "success" });
  //       } else {
  //         this.setState({ [stateName + "State"]: "error" });
  //       }
  //       break;
  //     case "equalTo":
  //       if (this.compare(event.target.value, this.state[stateNameEqualTo])) {
  //         this.setState({ [stateName + "State"]: "success" });
  //       } else {
  //         this.setState({ [stateName + "State"]: "error" });
  //       }
  //       break;
  //     case "checkbox":
  //       if (event.target.checked) {
  //         this.setState({ [stateName + "State"]: "success" });
  //       } else {
  //         this.setState({ [stateName + "State"]: "error" });
  //       }
  //       break;
  //     case "number":
  //       if (this.verifyNumber(event.target.value)) {
  //         this.setState({ [stateName + "State"]: "success" });
  //       } else {
  //         this.setState({ [stateName + "State"]: "error" });
  //       }
  //       break;
  //     case "length":
  //       if (this.verifyLength(event.target.value, stateNameEqualTo)) {
  //         this.setState({ [stateName + "State"]: "success" });
  //       } else {
  //         this.setState({ [stateName + "State"]: "error" });
  //       }
  //       break;
  //     case "max-length":
  //       if (!this.verifyLength(event.target.value, stateNameEqualTo + 1)) {
  //         this.setState({ [stateName + "State"]: "success" });
  //       } else {
  //         this.setState({ [stateName + "State"]: "error" });
  //       }
  //       break;
  //     case "url":
  //       if (this.verifyUrl(event.target.value)) {
  //         this.setState({ [stateName + "State"]: "success" });
  //       } else {
  //         this.setState({ [stateName + "State"]: "error" });
  //       }
  //       break;
  //     case "min-value":
  //       if (
  //         this.verifyNumber(event.target.value) &&
  //         event.target.value >= stateNameEqualTo
  //       ) {
  //         this.setState({ [stateName + "State"]: "success" });
  //       } else {
  //         this.setState({ [stateName + "State"]: "error" });
  //       }
  //       break;
  //     case "max-value":
  //       if (
  //         this.verifyNumber(event.target.value) &&
  //         event.target.value <= stateNameEqualTo
  //       ) {
  //         this.setState({ [stateName + "State"]: "success" });
  //       } else {
  //         this.setState({ [stateName + "State"]: "error" });
  //       }
  //       break;
  //     case "range":
  //       if (
  //         this.verifyNumber(event.target.value) &&
  //         event.target.value >= stateNameEqualTo &&
  //         event.target.value <= maxValue
  //       ) {
  //         this.setState({ [stateName + "State"]: "success" });
  //       } else {
  //         this.setState({ [stateName + "State"]: "error" });
  //       }
  //       break;
  //     default:
  //       break;
  //   }
  //   switch (type) {
  //     case "checkbox":
  //       this.setState({ [stateName]: event.target.checked });
  //       break;
  //     default:
  //       this.setState({ [stateName]: event.target.value });
  //       break;
  //   }
  // }
  // registerClick() {
  //   if (this.state.registerEmailState === "") {
  //     this.setState({ registerEmailState: "error" });
  //   }
  //   if (this.state.registerPasswordState === "") {
  //     this.setState({ registerPasswordState: "error" });
  //   }
  //   if (this.state.registerConfirmPasswordState === "") {
  //     this.setState({ registerConfirmPasswordState: "error" });
  //   }
  //   if (this.state.registerCheckboxState === "") {
  //     this.setState({ registerCheckboxState: "error" });
  //   }
  // }
  // loginClick() {
  //   if (this.state.loginEmailState === "") {
  //     this.setState({ loginEmailState: "error" });
  //   }
  //   if (this.state.loginPasswordState === "") {
  //     this.setState({ loginPasswordState: "error" });
  //   }
  // }
  // typeClick() {
  //   if (this.state.requiredState === "") {
  //     this.setState({ requiredState: "error" });
  //   }
  //   if (this.state.typeEmailState === "") {
  //     this.setState({ typeEmailState: "error" });
  //   }
  //   if (this.state.numberState === "") {
  //     this.setState({ numberState: "error" });
  //   }
  //   if (this.state.urlState === "") {
  //     this.setState({ urlState: "error" });
  //   }
  //   if (this.state.equalToState === "") {
  //     this.setState({ equalToState: "error" });
  //   }
  // }
  // rangeClick() {
  //   if (this.state.minLengthState === "") {
  //     this.setState({ minLengthState: "error" });
  //   }
  //   if (this.state.maxLengthState === "") {
  //     this.setState({ maxLengthState: "error" });
  //   }
  //   if (this.state.rangeState === "") {
  //     this.setState({ rangeState: "error" });
  //   }
  //   if (this.state.minValueState === "") {
  //     this.setState({ minValueState: "error" });
  //   }
  //   if (this.state.maxValueState === "") {
  //     this.setState({ maxValueState: "error" });
  //   }
  // }
  // handleChange(event) {
  //   this.setState({ selectedValue: event.target.value });
  // }
  // handleChangeEnabled(event) {
  //   this.setState({ selectedEnabled: event.target.value });
  // }
  // handleToggle(value) {
  //   const { checked } = this.state;
  //   const currentIndex = checked.indexOf(value);
  //   const newChecked = [...checked];

  //   if (currentIndex === -1) {
  //     newChecked.push(value);
  //   } else {
  //     newChecked.splice(currentIndex, 1);
  //   }

  //   this.setState({
  //     checked: newChecked
  //   });
  // }

  handleCustomerChange = (e) => {
    this.setState({ customer : e.target.value})
  }

  handlePhoneChange = (e) => {
    this.setState({ phone : e.target.value})
  }
  
  handleContactChange = (e) => {
    this.setState({ Contact : e.target.value})
  }

  handleAddressChange = (e) => {
    this.setState({ address : e.target.value})
  }
  
  handleCityChange = (e) => {
    this.setState({ City : e.target.value})
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

  render() {
    const { classes } = this.props;
    const { customer, phone, contact, address, city, zip_code, firstName, lastName, email } = this.state
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
                  success={this.state.requiredState === "success"}
                  error={this.state.requiredState === "error"}
                  id="required"
                  labelText="Customer"
                  formControlProps={{
                    fullWidth: true
                  }}
                  onChange={this.handleCustomerChange}
                  value={customer}                
                  inputProps={{
                    onChange: event =>
                      this.change(event, "required", "length", 0),
                    type: "min-value",
                    endAdornment:
                      this.state.requiredState === "error" ? (
                        <InputAdornment position="end">
                          <Close className={classes.danger} />
                        </InputAdornment>
                      ) : (undefined)
                  }}
                />
                <CustomInput
                  success={this.state.registerPasswordState === "success"}
                  error={this.state.registerPasswordState === "error"}
                  labelText="Phone *"
                  id="registerpassword"
                  formControlProps={{
                    fullWidth: true
                  }}
                  onChange={this.handlePhoneChange}
                  value={phone}
                  inputProps={{
                    onChange: event =>
                      this.change(event, "registerPassword", "password"),
                    type: "number"
                  }}
                />
                <CustomInput
                  success={this.state.registerPasswordState === "success"}
                  error={this.state.registerPasswordState === "error"}
                  labelText="Contact *"
                  id="registerpassword"
                  onChange={this.handleContactChange}
                  value={contact}
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    onChange: event =>
                      this.change(event, "registerPassword", "password"),
                    type: "number"
                  }}
                />
                <CustomInput
                  success={this.state.registerPasswordState === "success"}
                  error={this.state.registerPasswordState === "error"}
                  labelText="Address Line *"
                  id="registerpassword"
                  formControlProps={{
                    fullWidth: true
                  }}
                  onChange={this.handleAddressChange}
                  value={address}
                  inputProps={{
                    onChange: event =>
                      this.change(event, "registerPassword", "password"),
                    type: "text"
                  }}
                />
                <CustomInput
                  success={this.state.registerPasswordState === "success"}
                  error={this.state.registerPasswordState === "error"}
                  labelText="City *"
                  id="registerpassword"
                  formControlProps={{
                    fullWidth: true
                  }}
                  onChange={this.handleCityChange}
                  value={city}
                  inputProps={{
                    onChange: event =>
                      this.change(event, "registerPassword", "password"),
                    type: "text"
                  }}
                />
                <CustomInput
                  success={this.state.registerPasswordState === "success"}
                  error={this.state.registerPasswordState === "error"}
                  labelText="Postal / Zip *"
                  id="registerpassword"
                  formControlProps={{
                    fullWidth: true
                  }}
                  onChange={this.handleZipChange}
                  value={zip_code}
                  inputProps={{
                    onChange: event =>
                      this.change(event, "registerPassword", "password"),
                    type: "number"
                  }}
                />
                <Grid style={{ display: 'flex', flexWrap: "wrap" }} spacing={8}>
                  <GridItem xs={6} sm={6} md={4}>
                    <FormControl
                      style={{ minWidth: 150 }}
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
                        value={this.state.age}
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
                    </FormControl>
                  </GridItem>
                  <GridItem xs={6} sm={6} md={4}>
                    <FormControl style={{ minWidth: 150 }} variant="outlined">
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
                    <FormControl style={{ minWidth: 150 }} variant="outlined">
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
                        // style={{ marginRight: -10 }}
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
                    <FormControl style={{ minWidth: 150 }} variant="outlined">
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
                  success={this.state.registerPasswordState === "success"}
                  error={this.state.registerPasswordState === "error"}
                  labelText="First Name *"
                  id="registerpassword"
                  formControlProps={{
                    fullWidth: true
                  }}
                  onChange={this.handleFirstNameChange}
                  value={firstName}
                  inputProps={{
                    onChange: event =>
                      this.change(event, "registerPassword", "password"),
                    type: "number"
                  }}
                />
                <CustomInput
                  success={this.state.registerPasswordState === "success"}
                  error={this.state.registerPasswordState === "error"}
                  labelText="Last Name *"
                  id="registerpassword"
                  onChange={this.handleLastNameChange}
                  value={lastName}
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    onChange: event =>
                      this.change(event, "registerPassword", "password"),
                    type: "number"
                  }}
                />
                <CustomInput
                  success={this.state.registerEmailState === "success"}
                  error={this.state.registerEmailState === "error"}
                  labelText="Email Address *"
                  id="registeremail"
                  formControlProps={{
                    fullWidth: true
                  }}
                  onChange={this.handleEmailChange}
                  value={email}
                  inputProps={{
                    onChange: event =>
                      this.change(event, "registerEmail", "email"),
                    type: "email"
                  }}
                />
                {/* <CustomInput
                  success={this.state.registerEmailState === "success"}
                  error={this.state.registerEmailState === "error"}
                  labelText="Email Address *"
                  id="registeremail"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    onChange: event =>
                      this.change(event, "registerEmail", "email"),
                    type: "email"
                  }}
                /> */}
                <Button
                  color="rose"
                  onClick={this.registerClick}
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

export default withStyles(regularFormsStyle)(CustomerForm);
