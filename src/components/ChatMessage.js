import React, { Component } from "react";
import "./ChatMessage.css";

class ChatMessage extends Component {
  render() {
    return (
      <div className="container">
        <label>{this.props.sender_name}:</label>
        <p>{this.props.message}</p>
      </div>
    );
  }
}

export default ChatMessage;
