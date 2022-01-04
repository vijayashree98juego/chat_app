import React, { Component } from "react";
import "./SignIn.css";
import { Navigate } from "react-router-dom";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      type: 2,
      redirect: false,
      errors: "",
    };

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onChangeUsername(e) {
    let errors = e.target.value
      ? { username: "", password: this.state.errors["password"] }
      : {
          username: "username cannot be empty",
          password: this.state.errors["password"],
        };
    this.setState({
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
    this.setState({
      password: e.target.value,
      errors: errors,
    });
  }

  onSubmitHandler() {
    let username = this.state.username;
    let password = this.state.password;
    let errors = {};
    if (!username) {
      errors["username"] = "username cannot be empty!!!";
    }
    if (!password) {
      errors["password"] = "password cannot be empty!!!";
    }

    if (Object.entries(errors).length === 0) {

      const data = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body:
          "type=" +
          this.state.type +
          "&email=" +
          this.state.username +
          "&password=" +
          this.state.password,
      };

      fetch("https://api-us.juegogames.com/NOMOS-V3/users/sign_in", data)
        .then((response) => response.json())
        .then((data) => {
          if (data.responseCode === 200) {
            this.props.setStateChange({
              access_token: data.responseData.access_token,
              user_name: data.responseData.user_name,
            });
            this.setState({
              redirect: true,
            });
          } else {
            alert("Incorrect username or password");
          }
        });
    } else {
      this.setState({
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
      </div>
    );
  }
}

export default SignIn;
