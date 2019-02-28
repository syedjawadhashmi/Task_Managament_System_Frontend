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
                <h4 className={classes.cardTitle}>Edit a Customer</h4>
              {/* </CardText> */}
            </CardHeader>
            <CardBody>
              <form>
                <GridContainer>
                  <GridItem xs={12} sm={2}>
                    <FormLabel className={classes.labelHorizontal}>
                      Customer 
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={10}>
                    <CustomInput
                      id="help-text"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text"
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
                      Phone
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={10}>
                    <CustomInput
                      id="phone"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "Phone"
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={2}>
                    <FormLabel className={classes.labelHorizontal}>
                      Contact
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={10}>
                    <CustomInput
                    //   id="disabled"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "Phone"
                        // placeholder: "Disabled",
                        // disabled: true
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                    <GridItem xs={6} sm={2}>
                        <FormLabel className={classes.labelHorizontal}>
                        Address Line 1
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
                            City
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
                        Postal / Zip
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
                    <Grid style={{display: 'flex', marginLeft: 60}} spacing={8}>
                            <GridItem xs={3} sm={3} md={3} style={{marginTop: '25px'}}>
                                <label style={{fontSize: 12}}>Currency</label>
                            </GridItem>
                            <GridItem xs={6} sm={6} md={6}>
                                                    <FormControl style={{minWidth: 300,}} variant="outlined" >
                                <InputLabel
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
                                        name="USD- US. dollar"
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
                        <GridItem xs={3} sm={3} md={3} style={{marginTop: '25px'}}>
                            <label style={{fontSize: 12}}>Country</label>
                        </GridItem>
                            
                        <GridItem xs={6} sm={6} md={6}>
                            <FormControl style={{minWidth: 300,}} variant="outlined" >
                                <InputLabel
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
                                    input={
                                    <OutlinedInput
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
                    <Button style={{textAlign: 'center', backgroundColor: 'green'}}>
                        Add
                    </Button>

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
