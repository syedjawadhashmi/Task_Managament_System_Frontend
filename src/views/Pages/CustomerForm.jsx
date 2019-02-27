import React from 'react';
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import TextField from '@material-ui/core/TextField';
import { Grid } from '@material-ui/core';
import ReactDOM from 'react-dom';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
  
export default class CustomerForm extends React.Component {
    state = {
        age: '',
        name: 'hai',
        labelWidth: 0,
      };
    
      componentDidMount() {
        this.setState({
          labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
        });
      }
    
      handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
      };
    
    render(){
        return(
            <div>
                <GridContainer>
                    <Card>
                        <CardBody>
                            <h4 style={{fontWeight: 600}}>Edit a Customer</h4>
                            <GridContainer fluid>
                                <GridItem xs={6} sm={6} md={6}>
                                    <h5>
                                        Contact
                                    </h5>
                                    <Grid spacing={8} style={{display: 'flex'}}>
                                        <GridItem xs={3} sm={3} md={3} style={{marginTop: '25px'}}>
                                            <label style={{fontSize: 12}}>Customer</label>
                                        </GridItem>
                                        <GridItem xs={10} sm={10} md={10}>
                                            <TextField
                                                variant="outlined"
                                                style={{padding: 10}}
                                                id="mui-theme-provider-outlined-input"
                                            />
                                        </GridItem>
                                    </Grid>
                                    <Grid spacing={8} style={{display: 'flex'}}>
                                        <GridItem xs={3} sm={3} md={3} style={{marginTop: '25px'}}>
                                            <label style={{fontSize: 12}}>Email</label>
                                        </GridItem>
                                        <GridItem xs={10} sm={10} md={10}>
                                            <TextField
                                                variant="outlined"
                                                style={{padding: 10}}
                                                id="mui-theme-provider-outlined-input"
                                            />
                                        </GridItem>
                                    </Grid>
                                    <Grid spacing={8} style={{display: 'flex'}}>
                                        <GridItem xs={3} sm={3} md={3} style={{marginTop: '25px'}}>
                                            <label style={{fontSize: 12}}>Phone</label>
                                        </GridItem>
                                        <GridItem xs={10} sm={10} md={10}>
                                            <TextField
                                                variant="outlined"
                                                style={{padding: 10}}
                                                id="mui-theme-provider-outlined-input"
                                            />
                                        </GridItem>
                                    </Grid>
                                    <Grid spacing={8} style={{display: 'flex'}}>
                                        <GridItem xs={3} sm={3} md={3} style={{marginTop: '25px'}}>
                                            <label style={{fontSize: 12}}>Contact</label>
                                        </GridItem>
                                        <GridItem xs={10} sm={10} md={10}>
                                            <TextField
                                                variant="outlined"
                                                style={{padding: 10}}
                                                id="mui-theme-provider-outlined-input"
                                            />
                                        </GridItem>
                                    </Grid>
                                    <Grid spacing={8} style={{display: 'flex'}}>
                                        <GridItem xs={3} sm={3} md={3} style={{marginTop: '25px'}}>
                                            {/* <label style={{fontSize: 12}}>Customer</label> */}
                                        </GridItem>
                                        <GridItem xs={10} sm={10} md={10}>
                                            <TextField
                                                variant="outlined"
                                                style={{padding: 10}}
                                                id="mui-theme-provider-outlined-input"
                                            />
                                        </GridItem>
                                    </Grid>
                                </GridItem>
                                <GridItem xs={6} sm={6} md={6}>
                                    <h5>
                                        Billing
                                    </h5>
                                    <Grid style={{display: 'flex'}} spacing={8}>
                                        <GridItem xs={3} sm={3} md={3} style={{marginTop: '25px'}}>
                                            <label style={{fontSize: 12}}>Currency</label>
                                        </GridItem>
                                        <GridItem xs={6} sm={6} md={6}>
                                        <FormControl style={{minWidth: 200,}} variant="outlined" >
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
                                    </Grid>
                                    <Grid spacing={8} style={{display: 'flex'}}>
                                        <GridItem xs={3} sm={3} md={3} style={{marginTop: '25px'}}>
                                            <label style={{fontSize: 12}}>Address Line 1</label>
                                        </GridItem>
                                        <GridItem xs={10} sm={10} md={10}>
                                            <TextField
                                                variant="outlined"
                                                style={{padding: 10}}
                                                id="mui-theme-provider-outlined-input"
                                            />
                                        </GridItem>
                                    </Grid>
                                    <Grid spacing={8} style={{display: 'flex'}}>
                                        <GridItem xs={3} sm={3} md={3} style={{marginTop: '25px'}}>
                                            <label style={{fontSize: 12}}>City</label>
                                        </GridItem>
                                        <GridItem xs={10} sm={10} md={10}>
                                            <TextField
                                                variant="outlined"
                                                style={{padding: 10}}
                                                id="mui-theme-provider-outlined-input"
                                            />
                                        </GridItem>
                                    </Grid>
                                    <Grid spacing={8} style={{display: 'flex'}}>
                                        <GridItem xs={3} sm={3} md={3} style={{marginTop: '25px'}}>
                                            <label style={{fontSize: 12}}>Postal/Zip code</label>
                                        </GridItem>
                                        <GridItem xs={10} sm={10} md={10}>
                                            <TextField
                                                variant="outlined"
                                                style={{padding: 10}}
                                                id="mui-theme-provider-outlined-input"
                                            />
                                        </GridItem>
                                    </Grid>
                                    <Grid spacing={8} style={{display: 'flex'}}>
                                        <GridItem xs={3} sm={3} md={3} style={{marginTop: '25px'}}>
                                            <label style={{fontSize: 12}}>Country</label>
                                        </GridItem>
                                        <GridItem xs={10} sm={10} md={10}>
                                            <TextField
                                                variant="outlined"
                                                style={{padding: 10}}
                                                id="mui-theme-provider-outlined-input"
                                            />
                                        </GridItem>
                                    </Grid>
                                </GridItem>
                            </GridContainer>
                        </CardBody>                  
                    </Card>
                </GridContainer>                
            </div>
        );
    }
}