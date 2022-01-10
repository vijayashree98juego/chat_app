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
      chatMessages: [],
      newMessage: "",
      redirect: false,
      otherUserId:0
    };

    this.onStateChange = this.onStateChange.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  onStateChange(data) {
    this.setState(data);
  }

  onSubmitHandler() {
    if (this.state.newMessage === "") {
     return alert('Cannot send empty text!!!!...please type some thing')
    }
 
    let chatMessages = [
      ...this.state.chatMessages,
      {
        message_id:
          this.state.chatMessages[this.state.chatMessages.length - 1]
            .message_id + 1,
        sender_name: this.props.userName,
        message: this.state.newMessage,
      },
    ];

    localStorage.setItem("chat_messages_"+this.state.otherUserId, JSON.stringify(chatMessages));

    this.onStateChange({
      redirect: true,
      chatMessages: chatMessages,
      newMessage: "",
    });
  }

  onChangeHandler(e) {
    let message = e.target.value;

    this.onStateChange({
      newMessage: message,
    });
  }

   componentDidMount() {
    let otherUserId = this.props.otherUserId ? this.props.otherUserId : localStorage.getItem("other_user_id");
    let header = { access_token: this.props.accessToken };

    new Promise((resolve)=>{
      resolve(APICallGET(URL_FOR_CHAT_MESSAGES+'?chat_type=0&user_id='+otherUserId,header))
    }).then((result)=>{
    
    let messages = localStorage.getItem("chat_messages_"+otherUserId) ? JSON.parse(localStorage.getItem("chat_messages_"+otherUserId)): result.responseData.messages;

    localStorage.setItem("chat_messages_"+otherUserId, JSON.stringify(messages));
     return this.onStateChange({ chatMessages: messages ,otherUserId:otherUserId});
    }).catch((err)=>{
      alert('Something went wrong!!!')
    })
  }

  render() {
    let messages =this.state.chatMessages;
  
    return (
      <div>
        <ChatComponent userName={this.props.otherUserName} userId={this.props.userId} redirect={false} setStateChange={this.props.setStateChange}/>
        <RedirectPage path='/chat'/>
        {messages.map((user) => {
          return (
            <ChatMessage key={user.message_id} senderName={user.sender_name} message={user.message} />
          );
        })}
        <input type="text" name="message" value={this.state.newMessage} onChange={this.onChangeHandler}/>
        <button type="submit" onClick={this.onSubmitHandler}>SEND</button>
      </div>
    );
  }
}

export default ChatDetail;
