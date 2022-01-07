import React, { Component } from "react";
import { URL_FOR_FREIND_INVITE } from "./constant.js";
import APICallPOST from "./APICallPOST";

class AddToChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_type: 0,
      redirect: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.onStateChange = this.onStateChange.bind(this);
  }
  onStateChange(data) {
    this.setState(data);
  }

  handleClick() {
    if (this.state.user_type === 1) {
      alert("request is Receiced.You can start the conversation now!!!")
    }

    if (this.state.user_type === 2) {
      alert("friend request is already sent!!!!!!")
    }

    if (this.state.user_type === 3) {
      this.props.onStateChange({ redirect: true });
      alert("you can continue the conversation!!")
    }

    let accessToken = this.props.accessToken
      ? this.props.accessToken
      : localStorage.getItem("access_token");

    if (this.state.user_type === 4) {
      const data = "friend_user_id=" + this.props.userId;
      const headers = { access_token: accessToken };

      // Simple GET request using fetch
      let result = APICallPOST(URL_FOR_FREIND_INVITE,data, headers);
       this.onStateChange({
        user_type: 2,
      });
      alert('Friend request is sent just now!!!!')
    }
  }
 componentDidMount() {
    let accessToken = this.props.accessToken
      ? this.props.accessToken
      : localStorage.getItem("access_token");

    const data = "friend_user_id=" + this.props.userId;
    const headers = { access_token: accessToken };
    // Simple GET request using fetch
    let result =  APICallPOST(URL_FOR_FREIND_INVITE,data, headers);

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
      </div>
    );
  }
}

export default AddToChat;
