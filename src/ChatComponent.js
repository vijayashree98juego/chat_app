import React, { Component } from "react";
import "./ChatComponent.css";
import "./ChatList.css";
import profile from "./profile.png";
import { Link } from "react-router-dom";
import AddToChat from "./AddToChat";

class ChatComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: this.props.redirect,
    };
    this.onChangeHandle = this.onChangeHandle.bind(this);
    this.onStateChange = this.onStateChange.bind(this);
  }

  onStateChange(data) {
    this.setState(data);
  }
  
  onChangeHandle() {
    localStorage.setItem("other_user_id", this.props.user_id);
    localStorage.setItem("other_user_name", this.props.user_name);
    localStorage.removeItem("chat_messages");
    this.props.setStateChange({
      other_user_id: this.props.user_id,
      other_user_name: this.props.user_name,
    });
  }

  render() {
    return (
      <div>
        <Link
          onClick={this.onChangeHandle}
          to="/chatDetail"
          className="profile-redirect"
          style={!this.state.redirect ? { pointerEvents: "none" } : null}
        >
          <div
            className="user-data"
            style={
              !this.state.redirect
                ? { backgroundColor: "lightblue" }
                : { backgroundColor: "lightblue" }
            }
          >
            <img className="circular-square" src={profile} alt={profile} />
            <p
              className="profile-name"
              style={!this.state.redirect ? { fontWeight: "bold" } : null}
            >
              {this.props.user_name}{" "}
            </p>
          </div>
        </Link>
        {this.props.buttonIsRequired && (
          <AddToChat
            key={this.props.user_id}
            userId={this.props.user_id}
            onStateChange={this.onStateChange}
          />
        )}
      </div>
    );
  }
}

export default ChatComponent;
