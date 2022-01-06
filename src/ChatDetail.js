import React, { Component } from "react";
import ChatComponent from "./ChatComponent";
import ChatMessage from "./ChatMessage";
import RedirectPage from "./RedirectPage";
import { APICall } from "./APICall";

class ChatDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chat_messages: [],
      new_message: "",
      redirect: false,
    };
    this.setStateChange = this.setStateChange.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  setStateChange(data) {
    this.setState(data);
  }

  onSubmitHandler() {
    console.log("on submit handler....")
    console.log(this.props.other_user_id)
    if (this.state.new_message === "") {
      return alert("Cannot send empty text!!!!...please type some thing");
    }
    let otherUserId = this.props.other_user_id
    ? this.props.other_user_id
    : localStorage.getItem("other_user_id");

    let chatMessages = [
      ...this.state.chat_messages,
      {
        message_id:
          this.state.chat_messages[this.state.chat_messages.length - 1]
            .message_id + 1,
        sender_name: this.props.user_name,
        message: this.state.new_message,
      },
    ];

    localStorage.setItem("chat_messages_"+otherUserId, JSON.stringify(chatMessages));
    this.setStateChange({
      redirect: true,
      chat_messages: chatMessages,
      new_message: "",
    });
  }

  onChangeHandler(e) {
    let message = e.target.value;

    this.setStateChange({
      new_message: message,
    });
  }
  async componentDidMount() {
    console.log("did mount....")
    let otherUserId = this.props.other_user_id
      ? this.props.other_user_id
      : localStorage.getItem("other_user_id");
    let header = { access_token: this.props.accessToken };
    let result = await APICall(
      "chat/messages?chat_type=0&user_id=" + otherUserId,
      "GET",
      header
    );
    console.log(otherUserId)
    console.log("djjddjjdjagghafaa")
    console.log(this.props.other_user_id)
    let messages = localStorage.getItem("chat_messages_"+otherUserId)
      ? JSON.parse(localStorage.getItem("chat_messages_"+otherUserId))
      : result.responseData.messages;
      console.log(messages)
    localStorage.setItem("chat_messages_"+otherUserId, JSON.stringify(messages));
     return this.setStateChange({ chat_messages: messages });
  }

  render() {
    console.log("djdjjd")
    console.log(this.props.other_user_id)
    let otherUserId = this.props.other_user_id
    ? this.props.other_user_id
    : localStorage.getItem("other_user_id");
    let messages = localStorage.getItem("chat_messages_"+otherUserId)
      ? JSON.parse(localStorage.getItem("chat_messages_"+otherUserId))
      : this.state.chat_messages;
    return (
      <div>
        <ChatComponent
          user_name={this.props.other_user_name}
          user_id={this.props.user_id}
          redirect={false}
        />
        <RedirectPage />
        {messages.map((user) => {
          return (
            <ChatMessage
              key={user.message_id}
              sender_name={user.sender_name}
              message={user.message}
            />
          );
        })}
        <input
          type="text"
          name="message"
          value={this.state.new_message}
          onChange={this.onChangeHandler}
        />
        <button type="submit" onClick={this.onSubmitHandler}>
          SEND
        </button>
      </div>
    );
  }
}

export default ChatDetail;
