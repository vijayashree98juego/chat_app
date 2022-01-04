import React, { Component } from "react";
import "./ChatComponent.css";
import "./ChatList.css";
import profile from "./profile.png";
import { Link } from "react-router-dom";

class ChatComponent extends Component {
  constructor(props) {
    super(props);
    this.onChangeHandle = this.onChangeHandle.bind(this);
  }

  onChangeHandle() {
    this.props.setStateChange({
      other_user_id: this.props.user_id,
      other_user_name: this.props.user_name,
    });
  }

  render() {
    return (
      <div>
        <Link
          to="/chatDetail"
          onClick={this.onChangeHandle}
          className="profile-redirect"
          style={!this.props.redirect ? { pointerEvents: "none" } : null}
        >
          <div
            className="user-data"
            style={
              !this.props.redirect ? { backgroundColor: "lightblue" } : null
            }
          >
            <img className="circular-square" src={profile} alt={profile} />
            <p
              className="profile-name"
              style={!this.props.redirect ? { fontWeight: "bold" } : null}
            >
              {this.props.user_name}{" "}
            </p>
          </div>
        </Link>
      </div>
    );
  }
}

export default ChatComponent;
