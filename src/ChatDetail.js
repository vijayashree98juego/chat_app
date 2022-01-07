import React, { Component } from "react";
import ChatComponent from "./components/ChatComponent";
import ChatMessage from "./components/ChatMessage";
import RedirectPage from "./components/RedirectPage";
import  APICallGET  from "./components/APICallGET";
import {URL_FOR_CHAT_MESSAGES} from './components/constant'

class ChatDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chat_messages: [],
      new_message: "",
      redirect: false,
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
      alert('Cannot send empty text!!!!...please type some thing')
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

   componentDidMount() {
    let otherUserId = this.props.other_user_id
      ? this.props.other_user_id
      : localStorage.getItem("other_user_id");
    let header = { access_token: this.props.accessToken };
    let result = APICallGET(URL_FOR_CHAT_MESSAGES+'?chat_type=0&user_id='+otherUserId,header);

    let messages = localStorage.getItem("chat_messages_"+otherUserId)
      ? JSON.parse(localStorage.getItem("chat_messages_"+otherUserId))
      : result.responseData.messages;

    localStorage.setItem("chat_messages_"+otherUserId, JSON.stringify(messages));
     return this.onStateChange({ chat_messages: messages ,other_user_id:otherUserId});
  }

  render() {
    let messages =this.state.chat_messages;
    return (
      <div>
        <ChatComponent user_name={this.props.other_user_name} user_id={this.props.user_id} redirect={false}/>
        <RedirectPage />
        {messages.map((user) => {
          return (
            <ChatMessage key={user.message_id} sender_name={user.sender_name} message={user.message} />
          );
        })}
        <input type="text" name="message" value={this.state.new_message} onChange={this.onChangeHandler}/>
        <button type="submit" onClick={this.onSubmitHandler}>SEND</button>
      </div>
    );
  }
}

export default ChatDetail;
