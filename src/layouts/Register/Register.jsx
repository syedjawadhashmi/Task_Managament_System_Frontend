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
import './register.css'
import axios from 'axios';
import { baseUrl, _register } from '../../constant/apis/api';

class Register extends React.Component {
  constructor(){
    super();
    this.state = {
      user_name: '',
      first_name: '',
      last_name: '',
      password: '',
    }
  }

  handleEmailChange = (e) => {
    this.setState({ user_name : e.target.value})
  }

  handleFirstNameChange = (e) => {
    this.setState({ first_name : e.target.value})
  }

  handleLastNameChange = (e) => {
    this.setState({ last_name : e.target.value})
  }

  handlePassChange = (e) => {
    this.setState({ password : e.target.value})
  }
  
  handleRegister = () => {
    const {user_name, password} = this.state
    console.log('login pressed', user_name, password)
    debugger
    axios.post(
      `${baseUrl}${_register}`,
      {
        username: user_name,
        password: password,
        firstName: first_name,
        lastName: last_name
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
                  <MDBIcon icon="lock" /> Register:
                </h3>
              </MDBCardHeader>
              <div className="form-body">
                <label
                htmlFor="defaultFormNameEx"
                className="grey-text font-weight-light"
              >
                Your Name
              </label>
              <input
                type="name"
                id="defaultFormNameEx"
                className="form-control"
              />

              <label
                htmlFor="defaultFormEmailEx"
                className="grey-text font-weight-light"
              >
                Your Email
              </label>
              <input
                type="email"
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
                type="password"
                id="defaultFormPasswordEx"
                className="form-control"
              />
            <label
                htmlFor="defaultFormConfirmPasswordEx"
                className="grey-text font-weight-light"
              >
                Confirm Your password
              </label>
              <input
                type="password"
                id="defaultFormConfirmPasswordEx"
                className="form-control"
              />
              <div className="text-center mt-4">
                <MDBBtn style={{backgroundColor: '#dc3500', boxShadow: '0 5px 11px 0 rgba(0,0,0,.18), 0 4px 15px 0 rgba(0,0,0,.15)', color: '#ffff', marginTop: 10}} className="mb-3" type="submit">
                  Register
                </MDBBtn>
              </div>
            </div>
              <MDBModalFooter>
                <div className="font-weight-light">
                  <p>Already Have an Account? <a href="#">Login</a></p>
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

export default Register;