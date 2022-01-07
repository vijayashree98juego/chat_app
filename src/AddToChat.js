import React, { Component } from "react";
import PopUp from "./PopUp.js";

import APICall from "./APICall.js";
class AddToChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_type: 0,
      redirect: false,
      is_pop_up: false,
      pop_up_message: "",
    };
    this.handleClick = this.handleClick.bind(this);
    this.onStateChange = this.onStateChange.bind(this);
  }
  onStateChange(data) {
    this.setState(data);
  }

  async handleClick() {
    if (this.state.user_type === 1) {
      return this.onStateChange({
        is_pop_up: true,
        pop_up_message:
          "request is Receiced.You can start the conversation now!!!",
      });
    }
    if (this.state.user_type === 2) {
      return this.onStateChange({
        is_pop_up: true,
        pop_up_message: "friend request is already sent!!!!!!",
      });
    }
    if (this.state.user_type === 3) {
      this.props.onStateChange({ redirect: true });
      return this.onStateChange({
        is_pop_up: true,
        pop_up_message: "you can continue the conversation!!",
      });
    }

    let accessToken = this.props.accessToken
      ? this.props.accessToken
      : localStorage.getItem("access_token");

    if (this.state.user_type === 4) {
      const data = "friend_user_id=" + this.props.userId;
      const headers = { access_token: accessToken };

      // Simple GET request using fetch
      let result = await APICall("friends", "POST", data, headers);
      return this.onStateChange({
        user_type: 2,
        is_pop_up: true,
        pop_up_message: "Friend request is sent just now!!!!",
      });
    }
  }
  async componentDidMount() {
    let accessToken = this.props.accessToken
      ? this.props.accessToken
      : localStorage.getItem("access_token");

    const data = "friend_user_id=" + this.props.userId;
    const headers = { access_token: accessToken };
    // Simple GET request using fetch
    let result = await APICall("friends", "POST", data, headers);

    this.setState({
      user_type: result.responseData.friendship_type,
    });
    if (
      result.responseData.friendship_type === 3 ||
      result.responseData.friendship_type === 1
    ) {
      this.props.onStateChange({ redirect: true });
    }
  }
  render() {
    let displayButton = this.state.user_type ? true : false;
    let text = displayButton
      ? this.state.user_type === 1
        ? "Start conversation"
        : this.state.user_type === 2
        ? "Request is Sent"
        : this.state.user_type === 3
        ? "connected"
        : "Send friend request"
      : "";
    return (
      <div>
        <button onClick={this.handleClick}>{text}</button>
        {this.state.is_pop_up && (
          <PopUp
            message={this.state.pop_up_message}
            onStateChange={this.onStateChange}
            header={"Message!!!"}
            is_logout={false}
          />
        )}
      </div>
    );
  }
}

export default AddToChat;
