import React, { Component } from "react";
import ChatComponent from "./ChatComponent";
import ChatMessage from "./ChatMessage";
import RedirectPage from "./RedirectPage";
import { APICall } from "./APICall";
import PopUp from './PopUp.js'

class ChatDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chat_messages: [],
      new_message: "",
      redirect: false,
      is_pop_up:false,
      pop_up_message:'',
      other_user_id:0
    };
    this.onStateChange = this.onStateChange.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  onStateChange(data) {
    this.setState(data);
  }

  onSubmitHandler() {
    if (this.state.new_message === "") {
     return this.onStateChange({is_pop_up:true,pop_up_message:'Cannot send empty text!!!!...please type some thing'})
    }

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

    localStorage.setItem("chat_messages_"+this.state.other_user_id, JSON.stringify(chatMessages));
    this.onStateChange({
      redirect: true,
      chat_messages: chatMessages,
      new_message: "",
    });
  }

  onChangeHandler(e) {
    let message = e.target.value;

    this.onStateChange({
      new_message: message,
    });
  }
  async componentDidMount() {

    let otherUserId = this.props.other_user_id
      ? this.props.other_user_id
      : localStorage.getItem("other_user_id");
    let header = { access_token: this.props.accessToken };
    let result = await APICall(
      "chat/messages?chat_type=0&user_id=" + otherUserId,
      "GET",
      header
    );

    let messages = localStorage.getItem("chat_messages_"+otherUserId)
      ? JSON.parse(localStorage.getItem("chat_messages_"+otherUserId))
      : result.responseData.messages;

    localStorage.setItem("chat_messages_"+otherUserId, JSON.stringify(messages));
     return this.onStateChange({ chat_messages: messages ,other_user_id:otherUserId});
  }

  render() {
    let messages = localStorage.getItem("chat_messages_"+this.state.other_user_id)
      ? JSON.parse(localStorage.getItem("chat_messages_"+this.state.other_user_id))
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
        {this.state.is_pop_up&&<PopUp message={this.state.pop_up_message} onStateChange={this.onStateChange} header={"Error!!!"} is_logout={false}/>}
      </div>
    );
  }
}

export default ChatDetail;
