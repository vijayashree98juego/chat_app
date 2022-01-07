import React, { Component } from "react";
import "./SignIn.css";
import { Navigate } from "react-router-dom";
import { APICall } from "./APICall.js";
import PopUp from "./PopUp.js";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      redirect: false,
      errors: "",
      is_pop_up: false,
      pop_up_message: "",
    };
    this.onStateChange = this.onStateChange.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onStateChange(data) {
    this.setState(data);
  }
  onChangeUsername(e) {
    let errors = e.target.value
      ? { username: "", password: this.state.errors["password"] }
      : {
          username: "username cannot be empty",
          password: this.state.errors["password"],
        };
    this.onStateChange({
      username: e.target.value,
      errors: errors,
    });
  }
  onChangePassword(e) {
    let errors = e.target.value
      ? { password: "", username: this.state.errors["username"] }
      : {
          password: "password cannot be empty",
          username: this.state.errors["username"],
        };
    this.onStateChange({
      password: e.target.value,
      errors: errors,
    });
  }

  async onSubmitHandler() {
    let username = this.state.username;
    let password = this.state.password;
    let errors = {};
    if (!username) {
      errors["username"] = "username cannot be empty!!!";
    }
    if (!password) {
      errors["password"] = "password cannot be empty!!!";
    }

    if (localStorage.getItem("credential")) {
      let { userName, userPassword } = JSON.parse(
        localStorage.getItem("credential")
      );
      if (userName === username && userPassword === password) {
        return this.onStateChange({
          redirect: true,
        });
      } else if (userName === username) {
        errors["password"] = "Invalid password!!!";
      }
    }

    if (Object.entries(errors).length === 0) {
      const data =
        "type=2&email=" +
        this.state.username +
        "&password=" +
        this.state.password;
      let result = await APICall("users/sign_in", "POST", data);

      if (result.responseCode === 200) {
        let credentail = { userName: username, userPassword: password };
        localStorage.setItem("access_token", result.responseData.access_token);
        localStorage.setItem("user_name", result.responseData.user_name);
        localStorage.setItem("user_id", result.responseData.user_id);
        localStorage.setItem("credential", JSON.stringify(credentail));
        this.props.setStateChange({
          access_token: result.responseData.access_token,
          user_name: result.responseData.user_name,
          user_id: result.responseData.user_id,
        });
        this.onStateChange({
          redirect: true,
        });
      } else {
        return this.onStateChange({
          is_pop_up: true,
          pop_up_message: "Incorrect username or password",
        });
      }
    } else {
      this.onStateChange({
        errors: errors,
      });
    }
  }

  render() {
    return (
      <div>
        <h2 className="container-header">LOGIN PAGE</h2>
        <div className="container">
          <div className="row">
            <div className="col-10">
              <label htmlFor="username">Username:</label>
            </div>
            <div className="col-90">
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                onChange={this.onChangeUsername}
                required
              />
              <span style={{ color: "red" }}>
                {this.state.errors["username"]}
              </span>
            </div>
          </div>
          <div className="row">
            <div className="col-10">
              <label htmlFor="passsword">Password:</label>
            </div>
            <div className="col-90">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter password"
                onChange={this.onChangePassword}
                required
              />
              <span style={{ color: "red" }}>
                {this.state.errors["password"]}
              </span>
            </div>
          </div>
          <div className="row">
            <input
              type="submit"
              value="Sing In"
              onClick={this.onSubmitHandler}
            />
          </div>
        </div>
        {this.state.redirect && <Navigate to="/chat" />}
        {this.state.is_pop_up && (
          <PopUp
            message={this.state.pop_up_message}
            onStateChange={this.onStateChange}
            header={"Error!!!"}
            is_logout={false}
          />
        )}
      </div>
    );
  }
}

export default SignIn;
