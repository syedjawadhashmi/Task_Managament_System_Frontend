import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import { withRouter } from "react-router-dom";

// @material-ui/icons
import Face from "@material-ui/icons/Face";
import Email from "@material-ui/icons/Email";
// import LockOutline from "@material-ui/icons/LockOutline";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
// import axios from 'axios';
// import { baseUrl, _login } from '../../constant/api/api';
import firebase from "../../constant/api/firebase";
import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      user_name: '',
      password: '',

    };
  }

  handleEmailChange = (e) => {
    this.setState({ user_name: e.target.value })
  }

  handlePassChange = (e) => {
    this.setState({ password: e.target.value })
  }

  handleLogin = () => {
    const { user_name, password } = this.state
    console.log('login pressed', user_name, password)
    debugger
    firebase.auth().signInWithEmailAndPassword(user_name, password)
      .then(res => {
        const user = res.user;
        var token = '';
        firebase.auth().onAuthStateChanged(function (user) {
          if (user) {
            user.getIdToken().then(function (idToken) {
              token = idToken
              localStorage.setItem('user', user_name);
              localStorage.setItem('token', token);
              console.log('idToken', token);
            });
          }
        });
        this.props.history.push('/admin/developer');
        alert('login success')
      })
      .catch(error => {
        console.log('error', error)
      });
    //     axios.post(
    //       `${baseUrl}${_login}`,
    //       {
    //         username: user_name,
    //         password: password
    //       }, 
    //       {
    //           headers: {
    //               'Content-Type': 'application/json', 
    //           }
    //       },
    //   )
    //       .then((res) => {
    //           console.log("success repsonse", res.data)
    //           var user = res.data
    //           // alert('successfull login')    

    // this.props.history.push('/admin/developer');
    // localStorage.setItem('user', user.username);
    // localStorage.setItem('token', user.token);


    // })
    //       .catch((err) => {
    //           console.log("error", err);
    //           alert('error login')
    //     })
  }


  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    this.timeOutFunction = setTimeout(
      function () {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
  }
  componentWillUnmount() {
    clearTimeout(this.timeOutFunction);
    this.timeOutFunction = null;
  }
  render() {
    const { classes } = this.props;
    const { user_name, password } = this.state;
    return (
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={6} md={4}>
            <form>
              <Card login className={classes[this.state.cardAnimaton]}>
                <CardHeader
                  className={`${classes.cardHeader} ${classes.textCenter}`}
                  color="rose"
                >
                  <h4 className={classes.cardTitle}>Log in</h4>
                  <h5 className={classes.cardTitle}>SysProjects</h5>
                  <div className={classes.socialLine}>
                  </div>
                </CardHeader>
                <CardBody>
                  <CustomInput
                    labelText="User Name.."
                    id="firstname"
                    formControlProps={{
                      fullWidth: true
                    }}
                    onChange={this.handleEmailChange}
                    value={this.state.user_name}
                    inputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Face className={classes.inputAdornmentIcon} />
                        </InputAdornment>
                      )
                    }}
                  />
                  <CustomInput
                    labelText="Password"
                    id="password"
                    formControlProps={{
                      fullWidth: true
                    }}
                    type={'password'}
                    value={this.state.password}
                    onChange={this.handlePassChange}

                    inputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Icon className={classes.inputAdornmentIcon}>
                            lock_outline
                          </Icon>
                        </InputAdornment>
                      )
                    }}
                  />
                </CardBody>
                <CardFooter className={classes.justifyContentCenter}>
                  <Button onClick={this.handleLogin} color="rose" simple size="lg" block>
                    Let's Go
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(loginPageStyle)(LoginPage);
