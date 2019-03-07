import React, { Component } from "react";
// import { withRouter } from 'react-router-dom';

import {
  LoginContainer,
  LoginForm,
  LoginInput,
  LoginImage,
  Button
} from "./style/style";
import { colour } from "../../style/colour";
import toastr from 'toastr';

import { connect } from 'react-redux';
import * as actions from '../../store/actions';



class Login extends Component {
  state = {
    userInput: {
      email: "",
      password: ""
    }
  };


  doLogin = e => {
    e.preventDefault();

    const { email, password,userInput } = this.state;
    const { history } = this.props;
    
    if (email === "" && password === "") {
      toastr.error("This field can't be empty");
      return false;
    }
    
    
    // action dispatch
    this.props.authAction(userInput, history);
    
  };

  handleChangeEvent = e => {

    const { userInput } = this.state;

    this.setState({
      userInput: {
        ...userInput,
        [e.target.name]: e.target.value
      }
    });
    
  };

  render() {
    const { email, password } = this.state.userInput;

    return (
      <LoginContainer>
        <LoginImage src={require("../../assets/imgs/logo.svg")} />

        <LoginForm onSubmit={this.doLogin}>
          <LoginInput
            type="text"
            placeholder="email address"
            name="email"
            onChange={this.handleChangeEvent}
            value={email}
          />
          <LoginInput
            type="password"
            placeholder="password"
            name="password"
            onChange={this.handleChangeEvent}
            value={password}
          />

          <Button
            width="368px"
            height="50px"
            fontColor={colour.white}
            bgColor={colour.secondary}
          >
            Login
          </Button>
        </LoginForm>
      </LoginContainer>
    );
  }
}

// to expose my actions to react
const mapDispatchToProps = dispatch => ({
  authAction : (params, history)=>dispatch(actions.authAction(params, history)),
  
});

export default connect(null, mapDispatchToProps)(Login);
