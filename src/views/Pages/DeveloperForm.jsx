import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormLabel from "@material-ui/core/FormLabel";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import { Grid } from '@material-ui/core';

import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";

class DeveloperForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [24, 22],
      selectedValue: null,
      selectedEnabled: "b"
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

  render() {
    const { classes } = this.props;
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
                    />
                  </GridItem>
                  <GridItem xs={6} sm={6} lg={6}>
                    <CustomInput
                      labelText="Last Name"
                      formControlProps={{
                        fullWidth: true
                      }}
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
                        // placeholder: "Disabled",
                        // disabled: true
                      }}
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
                    />
                  </GridItem>
                  <GridItem xs={6} sm={4}>
                    <Button color={"rose"}>Add</Button>
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
