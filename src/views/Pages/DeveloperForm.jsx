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
            <CardHeader text>
              {/* <CardText> */}
                <h4 className={classes.cardTitle}>Edit a Developer</h4>
              {/* </CardText> */}
            </CardHeader>
            <CardBody>
              <form>
              <GridContainer>
                    <GridItem xs={6} sm={2}>
                        <FormLabel className={classes.labelHorizontal}>
                        First Name
                        </FormLabel>
                    </GridItem>
                    <GridItem xs={6} sm={4}>
                        <CustomInput
                        //   id="disabled"
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
                    <GridItem xs={6} sm={2}>
                        <FormLabel className={classes.labelHorizontal}>
                            Last Name
                        </FormLabel>
                    </GridItem>
                    <GridItem xs={6} sm={4}>
                        <CustomInput
                        //   id="disabled"
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
                  <GridItem xs={12} sm={2}>
                    <FormLabel className={classes.labelHorizontal}>
                      Email
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={10}>
                    <CustomInput
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
                  <GridItem xs={12} sm={2}>
                    <FormLabel className={classes.labelHorizontal}>
                      Password
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={10}>
                    <CustomInput
                      id="pass"
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
                    <GridItem xs={6} sm={2}>
                        <FormLabel className={classes.labelHorizontal}>
                            Status
                        </FormLabel>
                    </GridItem>
                    <GridItem xs={6} sm={4}>
                        <CustomInput
                        //   id="disabled"
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
                    <GridItem xs={6} sm={2}>
                        <FormLabel className={classes.labelHorizontal}>
                            Rate
                        </FormLabel>
                    </GridItem>
                    <GridItem xs={6} sm={4}>
                        <CustomInput
                        //   id="disabled"
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
                    <GridItem xs={6} sm={2}>
                        <FormLabel className={classes.labelHorizontal}>
                            Rate Unit
                        </FormLabel>
                    </GridItem>
                    <GridItem xs={6} sm={4}>
                        <CustomInput
                        //   id="disabled"
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
                    <GridItem xs={6} sm={2}>
                        <FormLabel className={classes.labelHorizontal}>
                            Currency
                        </FormLabel>
                    </GridItem>
                    <GridItem xs={6} sm={4}>
                        <CustomInput
                        //   id="disabled"
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
                    <GridItem xs={6} sm={5}>
                    </GridItem>

                    <GridItem xs={6} sm={4}>
                        <Button style={{textAlign: 'center', backgroundColor: 'green'}}>
                            Add
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
