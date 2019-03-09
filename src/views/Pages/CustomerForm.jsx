/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React from "react";
import ReactDOM from "react-dom";
// @material-ui/core components
import firebase from "../../constant/api/firebase";

// eslint-disable-next-line no-unused-vars
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
});

class CustomerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: "",
      password: "",
      phone: "",
      contact: "",
      address: "",
      city: "",
      zip_code: "",
      currency: "",
      firstName: "",
      lastName: "",
      email: "",
      USD: "",
      Country: "",
      Consultant: "",
      ProductOwner: "",
      labelWidth: 0,
      ProductOwnerfirstName: "",
      ProductOwnerlastName: "",
      ProductOwneremail: "",
      ProductOwnerpassword: "",
      ProductOwnerstatus: "",
      ConsultantfirstName: "",
      ConsultantlastName: "",
      Consultantemail: "",
      Consultantpassword: "",
      Consultantstatus: "",
      edit: false
    };
  }
  componentDidMount() {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth
    });
  }
  handleCustomerChange = e => {
    this.setState({ customer: e.target.value });
  };
  handlePassChange = e => {
    this.setState({ password: e.target.value });
  };
  handlePhoneChange = e => {
    this.setState({ phone: e.target.value });
  };
  handleContactChange = e => {
    this.setState({ contact: e.target.value });
  };
  handleAddressChange = e => {
    this.setState({ address: e.target.value });
  };
  handleCityChange = e => {
    this.setState({ city: e.target.value });
  };
  handleZipChange = e => {
    this.setState({ zip_code: e.target.value });
  };
  handleFirstNameChange = e => {
    this.setState({ firstName: e.target.value });
  };
  handleLastNameChange = e => {
    this.setState({ lastName: e.target.value });
  };
  handleEmailChange = e => {
    this.setState({ email: e.target.value });
  };
  handleProductOwnerFirstNameChange = e => {
    this.setState({ ProductOwnerfirstName: e.target.value });
  };
  handleProductOwnerLastNameChange = e => {
    this.setState({ ProductOwnerlastName: e.target.value });
  };
  handleProductOwnerEmailChange = e => {
    this.setState({ ProductOwneremail: e.target.value });
  };
  handleProductOwnerPassChange = e => {
    this.setState({ ProductOwnerpassword: e.target.value });
  };
  handleProductOwnerStatusChange = e => {
    this.setState({ ProductOwnerstatus: e.target.value });
  };
  handleConsultantFirstNameChange = e => {
    this.setState({ ConsultantfirstName: e.target.value });
  };
  handleConsultantLastNameChange = e => {
    this.setState({ ConsultantlastName: e.target.value });
  };
  handleConsultantEmailChange = e => {
    this.setState({ Consultantemail: e.target.value });
  };
  handleConsultantPassChange = e => {
    this.setState({ Consultantpassword: e.target.value });
  };
  handleConsultantStatusChange = e => {
    this.setState({ Consultantstatus: e.target.value });
  };
  handleChange1 = event => {
    this.setState({ USD: event.target.value });
  };
  handleChange2 = event => {
    this.setState({ Country: event.target.value });
  };
  handleChange3 = event => {
    this.setState({ Consultant: event.target.value });
  };
  handleChange4 = event => {
    this.setState({ ProductOwner: event.target.value });
  };

  addProductOwner = e => {
    e.preventDefault();
    const {
      ProductOwnerfirstName,
      ProductOwnerlastName,
      ProductOwneremail,
      ProductOwnerpassword,
      ProductOwnerstatus
    } = this.state;
    firebase.auth().createUserWithEmailAndPassword(ProductOwneremail, ProductOwnerpassword)
      .then(() => {
        var userId = firebase.auth().currentUser.uid;
        var user = firebase.auth().currentUser;
        console.log("user", user)
        const ref = firebase.database().ref("ProductOwners/" + userId);
        ref.set(
          {
            uid: userId,
            name: ProductOwnerfirstName + ProductOwnerlastName,
            email: ProductOwneremail,
            type: "Product Owner",
            status: ProductOwnerstatus
          })
          .catch(error => {
            console.log("Error during user creating on firebase", error);
          });
        alert("Product Owner Registered Successfully");
      })
      .catch(error => {
        alert(error);
      });
    this.setState({
      ProductOwnerfirstName: "",
      ProductOwnerlastName: "",
      ProductOwneremail: "",
      ProductOwnerpassword: "",
      ProductOwnerstatus: ""
    });
  };
  addConsultant = e => {
    e.preventDefault();
    const {
      ConsultantfirstName,
      ConsultantlastName,
      Consultantemail,
      Consultantpassword,
      Consultantstatus
    } = this.state;
    firebase.auth().createUserWithEmailAndPassword(Consultantemail, Consultantpassword)
      .then(() => {
        var userId = firebase.auth().currentUser.uid;
        var user = firebase.auth().currentUser;
        console.log("user", user)
        const ref = firebase.database().ref("Consultants/" + userId);
        ref.set(
          {
            uid: userId,
            name: ConsultantfirstName + ConsultantlastName,
            email: Consultantemail,
            type: "Consultant",
            status: Consultantstatus
          })
          .catch(error => {
            console.log("Error during user creating on firebase", error);
          });
        alert("Consultant Registered Successfully");
      })
      .catch(error => {
        alert(error);
      });
    this.setState({
      ConsultantfirstName: "",
      ConsultantlastName: "",
      Consultantemail: "",
      Consultantpassword: "",
      Consultantstatus: ""
    });
  };
  addCustomer = e => {
    e.preventDefault();
    const {
      email,
      customer,
      phone,
      contact,
      address,
      city,
      zip_code,
      USD,
      Country,
      Consultant,
      ProductOwner
    } = this.state
    const customer_data = {
      email,
      customer,
      phone,
      contact,
      address,
      city,
      zip_code,
      USD,
      Country,
      Consultant,
      ProductOwner,
      role: "Customer",
      // key: key
    };
    console.log("user", customer_data)
    const ref = firebase.database().ref("Customer");
    ref.push(customer_data)
      .catch(error => {
        console.log("Error during user add on firebase", error);
      });
    alert("Customer Registered Successfully");
    this.setState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      customer: "",
      phone: "", contact: "",
      address: "",
      city: "",
      zip_code: "",
      USD: "",
      Country: "",
      Consultant: "",
      ProductOwner: ""
    });
  };

  render() {
    const { classes } = this.props;
    const {
      customer,
      phone,
      contact,
      address,
      city,
      zip_code,
      email,
      ProductOwnerfirstName,
      ProductOwnerlastName,
      ProductOwneremail,
      ProductOwnerpassword,
      ConsultantfirstName,
      ConsultantlastName,
      Consultantemail,
      Consultantpassword
    } = this.state;

    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
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
                <Grid className="dropdowngrid" spacing={8}>
                  <GridItem xs={6} sm={6} md={4}>
                    <FormControl
                      variant="outlined"
                      className={[classes.formControl, "form-control"]}
                    >
                      <InputLabel
                        style={{ fontSize: 10 }}
                        ref={ref => {
                          this.InputLabelRef = ref;
                        }}
                      >
                        USD - US. dollar
                      </InputLabel>
                      <Select
                        value={this.state.USD}
                        onChange={this.handleChange1}
                        input={
                          <OutlinedInput
                            labelWidth={80}
                            name="age"
                            id="outlined-age-simple"
                          />
                        }
                      >
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={30}>30</MenuItem>
                      </Select>
                    </FormControl>
                  </GridItem>
                  <GridItem xs={6} sm={6} md={4}>
                    <FormControl
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
                        Country
                      </InputLabel>
                      <Select
                        value={this.state.Country}
                        onChange={this.handleChange2}
                        // displayEmpty
                        input={
                          <OutlinedInput
                            // style={{ fontSize: 10 }}
                            labelWidth={40}
                            name="Country"
                            id="outlined-age-simple"
                          />
                        }
                      >
                        <MenuItem value={"USA"}>USA</MenuItem>
                        <MenuItem value={"UK"}>UK</MenuItem>
                        <MenuItem value={"UAE"}>UAE</MenuItem>
                      </Select>
                    </FormControl>
                  </GridItem>
                </Grid>
                <Grid
                  className="dropdowngrid"
                  style={{
                    marginTop: 10
                  }}
                  spacing={8}
                >
                  <GridItem xs={6} sm={6} md={4}>
                    <FormControl
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
                        Consultants
                      </InputLabel>
                      <Select
                        value={this.state.Consultant}
                        onChange={this.handleChange3}
                        input={
                          <OutlinedInput
                            labelWidth={60}
                            name="Consultants"
                            id="outlined-age-simple"
                          />
                        }
                      >
                        <MenuItem value={"Consultant1"}>Consultant1</MenuItem>
                        <MenuItem value={"Consultant2"}>Consultant2</MenuItem>
                        <MenuItem value={"Consultant3"}>Consultant3</MenuItem>
                      </Select>
                    </FormControl>
                  </GridItem>
                  <GridItem xs={6} sm={6} md={4}>
                    <FormControl
                      className={[classes.formControl, "form-control"]}
                      variant="outlined"
                    >
                      <InputLabel
                        style={{ fontSize: 10 }}
                        ref={ref => {
                          this.InputLabelRef = ref;
                        }}
                        htmlFor="outlined-dropdown4-simple"
                      >
                        Product Owners
                      </InputLabel>
                      <Select
                        value={this.state.ProductOwner}
                        onChange={this.handleChange4}
                        input={
                          <OutlinedInput
                            labelWidth={80}
                            name="Product Owners"
                            id="outlined-dropdown4-simple"
                          />
                        }
                      >
                        <MenuItem value={"Product Owner1"}>
                          Product Owner1
                        </MenuItem>
                        <MenuItem value={"Product Owner2"}>
                          Product Owner2
                        </MenuItem>
                        <MenuItem value={"Product Owner3"}>
                          Product Owner3
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </GridItem>
                </Grid>
                {
                  this.props.edit ?
                    <Button
                      color="rose"
                      onClick={()=>console.log("edit customer")}
                      className={classes.registerButton}
                    >
                      Edit
                    </Button>
                    :

                    <Button
                      color="rose"
                      onClick={this.addCustomer}
                      className={classes.registerButton}
                    >
                      Add
                </Button>
                }
                {/* </Grid> */}
              </form>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="rose" icon>
              <CardIcon color="rose">
                <h4>Add a Product Owner</h4>
              </CardIcon>
              <CardBody>
                <CustomInput
                  labelText="First Name *"
                  formControlProps={{
                    fullWidth: true
                  }}
                  onChange={this.handleProductOwnerFirstNameChange}
                  value={ProductOwnerfirstName}
                  inputProps={{
                    type: "text"
                  }}
                />
                <CustomInput
                  labelText="Last Name *"
                  onChange={this.handleProductOwnerLastNameChange}
                  value={ProductOwnerlastName}
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
                  onChange={this.handleProductOwnerEmailChange}
                  value={ProductOwneremail}
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
                  onChange={this.handleProductOwnerPassChange}
                  value={ProductOwnerpassword}
                  inputProps={{
                    type: "password"
                  }}
                />
                <FormControl
                  style={{ marginBottom: 10 }}
                  className={["form-control"]}
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
                    value={this.state.ProductOwnerstatus}
                    onChange={this.handleProductOwnerStatusChange}
                    // displayEmpty
                    inputProps={{
                      name: "age",
                      id: "age-simple",
                    }}
                  >
                    <MenuItem value={"Active"}>Active</MenuItem>
                    <MenuItem value={"Suspended"}>Suspended</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  color="rose"
                  onClick={this.addProductOwner}
                  className={classes.registerButton}
                >
                  Add Product Owner
                </Button>
              </CardBody>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader color="rose" icon>
              <CardIcon color="rose">
                <h4>Add a Consultant</h4>
              </CardIcon>
              <CardBody>
                <CustomInput
                  labelText="First Name *"
                  formControlProps={{
                    fullWidth: true
                  }}
                  onChange={this.handleConsultantFirstNameChange}
                  value={ConsultantfirstName}
                  inputProps={{
                    type: "text"
                  }}
                />
                <CustomInput
                  labelText="Last Name *"
                  onChange={this.handleConsultantLastNameChange}
                  value={ConsultantlastName}
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
                  onChange={this.handleConsultantEmailChange}
                  value={Consultantemail}
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
                  onChange={this.handleConsultantPassChange}
                  value={Consultantpassword}
                  inputProps={{
                    type: "password"
                  }}
                />
                <FormControl
                  style={{
                    marginBottom: 10
                  }}
                  className={["form-control"]}
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
                    value={this.state.Consultantstatus}
                    onChange={this.handleConsultantStatusChange}
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
                <Button
                  color="rose"
                  onClick={this.addConsultant}
                  className={classes.registerButton}
                >
                  Add Consultant
                </Button>
              </CardBody>
            </CardHeader>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(styles)(CustomerForm);
