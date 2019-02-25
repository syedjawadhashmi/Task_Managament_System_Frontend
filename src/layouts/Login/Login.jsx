import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBModalFooter,
  MDBIcon,
  MDBCardHeader,
  MDBBtn
} from "mdbreact";
import './login.css'
import axios from 'axios';
import { baseUrl, _login } from '../../constant/apis/api';

class Login extends React.Component {
  constructor(){
    super();
    this.state = {
      user_name: '',
      password: '',
    }
  }

  handleEmailChange = (e) => {
    this.setState({ user_name : e.target.value})
  }

  handlePassChange = (e) => {
    this.setState({ password : e.target.value})
  }
  
  handleLogin = () => {
    const {user_name, password} = this.state
    console.log('login pressed', user_name, password)
    debugger
    axios.post(
      `${baseUrl}${_login}`,
      {
        username: user_name,
        password: password
      }, 
      {
          headers: {
              'Content-Type': 'application/json', 
          }
      },
  )
      .then((res) => {
          console.log("success repsonse", res)
          alert('successfull login')    
})
      .catch((err) => {
          console.log("error", err);
          alert('error login')
    })
  }

  render() {
    return (
      <MDBContainer>
        <MDBRow>
          <MDBCol md="6" className="col-md-offset-3">
            <MDBCard>
              <MDBCardBody className="form-body">
                <MDBCardHeader className="form-header warm-flame-gradient rounded">
                  <h3 className="my-3">
                    <MDBIcon icon="lock" /> Login:
                </h3>
                </MDBCardHeader>
                <div className="form-body">
                  <label
                    htmlFor="defaultFormEmailEx"
                    className="grey-text font-weight-light"
                  >
                    Your UseName
                </label>
                  <input
                    onChange={this.handleEmailChange}
                    value={this.state.user_name}
                    type="text"
                    id="defaultFormEmailEx"
                    className="form-control"
                  />
                  <label
                    htmlFor="defaultFormPasswordEx"
                    className="grey-text font-weight-light"
                  >
                    Your password
                </label>
                  <input
                    value={this.state.password}
                    onChange={this.handlePassChange}
                    type="password"
                    id="defaultFormPasswordEx"
                    className="form-control"
                  />
                  <div className="text-center mt-4">
                    <MDBBtn 
                      onClick = {this.handleLogin}
                      style={{ backgroundColor: '#dc3500', boxShadow: '0 5px 11px 0 rgba(0,0,0,.18), 0 4px 15px 0 rgba(0,0,0,.15)', color: '#ffff', marginTop: 10 }} className="mb-3" type="submit">
                      Login
                </MDBBtn>
                  </div>
                </div>
                <MDBModalFooter>
                  <div className="font-weight-light">
                    <p>Not a member ? <a href="#">Sign Up</a></p>
                    <p>Forgot <a href="#">Password ?</a></p>
                  </div>
                </MDBModalFooter>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
};

export default Login;