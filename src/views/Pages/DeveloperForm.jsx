/* eslint-disable no-debugger */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
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
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import firebase from "../../constant/api/firebase";
import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";
import axios from "axios";
const rooturl = "https://taskmanagment-1.herokuapp.com/developers";

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
      currency: ""
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

  handleFirstNameChange = e => {
    this.setState({ firstName: e.target.value });
  };

  handleLastNameChange = e => {
    this.setState({ lastName: e.target.value });
  };

  handleEmailChange = e => {
    this.setState({ email: e.target.value });
  };

  handlePassChange = e => {
    this.setState({ password: e.target.value });
  };

  handleStatusChange = e => {
    this.setState({ status: e.target.value });
  };

  handleRateChange = e => {
    this.setState({ rate: e.target.value });
  };

  handleRateUnitChange = e => {
    this.setState({ rate_unit: e.target.value });
  };

  handleCurrencyChange = e => {
    this.setState({ currency: e.target.value });
  };

  componentDidMount() {
    const { _param } = this.props.location.state;
    console.log("parms", _param);
    if (_param !== "") {
      this.setState({
        firstName: _param.firstName,
        lastName: _param.lastName,
        email: _param.email,
        password: _param.password,
        status: _param.status,
        rate: _param.rate,
        rate_unit: _param.rate_unit,
        currency: _param.currency
      });
    }
  }

  addDeveloper = e => {
    debugger;
    e.preventDefault();
    const {
      firstName,
      lastName,
      email,
      password,
      status,
      currency,
      rate,
      rate_unit
    } = this.state;
    const developer = {
      firstName,
      lastName,
      email,
      password,
      status,
      currency,
      rate,
      rate_unit
    };
    console.log("user", developer);
    firebase
      .auth()
      .createUserWithEmailAndPassword(developer.email, developer.password)
      .then(send => {
        var userId = firebase.auth().currentUser.uid;
        var user = firebase.auth().currentUser;
        console.log("user", user);
        const ref = firebase.database().ref("Developer/" + userId);
        ref
          .set({
            uid: userId,
            name: developer.firstName + developer.lastName,
            firstName: firstName,
            lastName: lastName,
            email: developer.email,
            password: developer.password,
            role: "Developer",
            rate: developer.rate,
            rate_unit: developer.rate_unit,
            currency: developer.currency,
            status: developer.status
          })
          .catch(error => {
            console.log("Error during user creating on firebase", error);
          });
        alert("Developer registered successfully");
      })
      .catch(error => {
        alert(error);
      });
    this.setState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      status: "",
      currency: "",
      rate: "",
      rate_unit: ""
    });
  };

  updateDeveloper = e => {
    e.preventDefault();
    const {
      firstName,
      lastName,
      password,
      status,
      currency,
      rate,
      rate_unit
    } = this.state;
    const { _param } = this.props.location.state;

    return axios
      .post(`${rooturl}/update-user`, {
        firstName: firstName,
        lastName: lastName,
        password: password,
        status: status,
        rate: rate,
        rate_unit: rate_unit,
        currency: currency,
        uid: _param.uid
      })
      .then(res => {
        alert("developer successfully update");
        console.log("response of upddate req", res);
        console.log("select of update req", _param.key);
      })
      .catch(err => {
        console.log("error", err);
        let errorMessage = err;
        alert(errorMessage);
      });
  };
  render() {
    const { classes } = this.props;
    const {
      firstName,
      lastName,
      email,
      password,
      status,
      rate,
      rate_unit,
      currency
    } = this.state;
    const { _param } = this.props.location.state;

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
                    {_param === "" ? (
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
                    ) : (
                      <CustomInput
                        labelText="E-Mail"
                        id="email"
                        formControlProps={{
                          fullWidth: true
                        }}
                        onChange={this.handleEmailChange}
                        disabled={true}
                        value={email}
                        inputProps={{
                          type: "email"
                        }}
                      />
                    )}
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
                    <FormControl
                      style={{ marginTop: 10 }}
                      className={[classes.formControl, "form-control"]}
                      variant="outlined"
                    >
                      <InputLabel
                        style={{ fontSize: 10 }}
                        ref={ref => {
                          this.InputLabelRef = ref;
                        }}
                        htmlFor="outlined-age-simple"
                      >
                        Status
                      </InputLabel>
                      <Select
                        value={this.state.status}
                        onChange={this.handleStatusChange}
                        // displayEmpty
                        inputProps={{
                          name: "age",
                          id: "age-simple"
                        }}
                      >
                        <MenuItem value={"Active"}>Active</MenuItem>
                        <MenuItem value={"Suspended"}>Suspended</MenuItem>
                      </Select>
                    </FormControl>
                  </GridItem>
                  <GridItem xs={6} sm={6} lg={6}>
                    <CustomInput
                      //   id="disabled"
                      labelText="Rate"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "number"
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
                  <FormControl
                      style={{ marginTop: 10 }}
                      className={[classes.formControl, "form-control"]}
                      variant="outlined"
                    >
                      <InputLabel
                        style={{ fontSize: 10 }}
                        ref={ref => {
                          this.InputLabelRef = ref;
                        }}
                        htmlFor="outlined-age-simple"
                      >
                        Rate Unit
                      </InputLabel>
                      <Select
                        value={this.state.rate_unit}
                        onChange={this.handleRateUnitChange}
                        // displayEmpty
                        inputProps={{
                          name: "age",
                          id: "age-simple"
                        }}
                      >
                        <MenuItem value={"Hourly"}>Hourly</MenuItem>
                        <MenuItem value={"Daily"}>Daily</MenuItem>
                        <MenuItem value={"Weekly"}>Weekly</MenuItem>
                        <MenuItem value={"Monthly"}>Monthly</MenuItem>
                      </Select>
                    </FormControl>
                    {/* <CustomInput
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
                    /> */}
                  </GridItem>
                  <GridItem xs={6} sm={6} lg={6}>
                  <FormControl
                      style={{ marginTop: 10 }}
                      className={[classes.formControl, "form-control"]}
                      variant="outlined"
                    >
                      <InputLabel
                        style={{ fontSize: 10 }}
                        ref={ref => {
                          this.InputLabelRef = ref;
                        }}
                        htmlFor="outlined-age-simple"
                      >
                        Currency
                      </InputLabel>
                      <Select
                        value={this.state.currency}
                        onChange={this.handleCurrencyChange}
                        // displayEmpty
                        inputProps={{
                          name: "age",
                          id: "age-simple"
                        }}
                      >
                        <MenuItem value={"USD"}>USD</MenuItem>
                        <MenuItem value={"EURO"}>EURO</MenuItem>
                        <MenuItem value={"AED"}>AED</MenuItem>
                      </Select>
                    </FormControl>
                    {/* <CustomInput
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
                    /> */}
                  </GridItem>
                  <GridItem xs={6} sm={4}>
                    <Button
                      onClick={
                        _param === "" ? this.addDeveloper : this.updateDeveloper
                      }
                      // onClick={this.addDeveloper}
                      color={"rose"}
                    >
                      {_param === "" ? "Add" : "Update"}
                    </Button>
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
