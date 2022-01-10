import React, { Component } from "react";
import "./ChatMessage.css";

class ChatMessage extends Component {
  render() {
    return (
      <div className="container">
        <label>{this.props.senderName}:</label>
        <p>{this.props.message}</p>
      </div>
    );
  }
}

export default ChatMessage;
