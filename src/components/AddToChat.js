import React, { Component } from "react";
import { URL_FOR_FREIND_INVITE } from "../global/constant.js";
import APICallPOST from "../services/APICallPOST";

class AddToChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userType: 0,
      redirect: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.onStateChange = this.onStateChange.bind(this);
  }
  onStateChange(data) {
    this.setState(data);
  }

  handleClick() {
    if (this.state.userType === 1) {
      return alert("request is Receiced.You can start the conversation now!!!")
    }

    if (this.state.userType === 2) {
      return alert("friend request is already sent!!!!!!")
    }

    if (this.state.userType === 3) {
      this.onStateChange({ redirect: true });
      return alert("you can continue the conversation!!")
    }

    let accessToken = this.props.accessToken? this.props.accessToken: localStorage.getItem("access_token");

    if (this.state.userType === 4) {
      const data = "friend_user_id=" + this.props.userId;
      const headers = { access_token: accessToken };

      APICallPOST(URL_FOR_FREIND_INVITE,data, headers).then((result)=>{
        this.onStateChange({
          userType: 2,
        });
        alert('Friend request is sent just now!!!!');
      }).catch((err)=>{
        console.error(err)
      })
    }
  }
 componentDidMount() {
    let accessToken = this.props.accessToken? this.props.accessToken: localStorage.getItem("access_token");

    const data = "friend_user_id=" + this.props.userId;
    const headers = { access_token: accessToken };

    APICallPOST(URL_FOR_FREIND_INVITE,data, headers).then((result)=>{
     
    this.setState({
      userType: result.responseData.friendship_type,
    });

    if (
      result.responseData.friendship_type === 3 ||
      result.responseData.friendship_type === 1
    ) {
      this.props.onStateChange({ redirect: true });
    }
    }).catch((err)=>{
      console.error(err)
    })
  }

  render() {
    let displayButton = this.state.userType ? true : false;
    let text = displayButton? this.state.userType === 1 ? "Start conversation" : this.state.userType === 2? "Request is Sent": this.state.userType === 3? "connected" : "Send friend request": "";
    return (
      <div>
        <button onClick={this.handleClick}>{text}</button>
      </div>
    );
  }
}

export default AddToChat;
