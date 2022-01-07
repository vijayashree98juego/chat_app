import React, { Component } from "react";
import { Navigate } from "react-router";
import ChatComponent from "./components/ChatComponent";
import "./components/ChatList.css";
import APICallGET from "./components/APICallGET";
import {URL_FOR_CHAT_LIST} from './components/constant'

class ChatList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friendList: [],
      logout: false,
      on_search: false,
      search_text: "",
      on_search_redirect: false,     
    };
    this.userLogout = this.userLogout.bind(this);
    this.searchHandler = this.searchHandler.bind(this);
    this.onStateChange = this.onStateChange.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }


  onStateChange(data) {
    this.setState(data);
  }

  userLogout() {
    this.onStateChange({
      logout: true,
    });
    localStorage.clear()
  }

  onChangeHandler(e) {
    let text = e.target.value;
    this.onStateChange({ search_text: text });
  }

  searchHandler() {
    if (!this.state.on_search) {
      this.onStateChange({ on_search: true });
    }

    if (this.state.search_text.length < 3) {
      alert('Invalid search.Minimum of 3 characters are required!!!');
    }

    this.props.setStateChange({
      search_text: this.state.search_text,
    });

    this.onStateChange({ on_search_redirect: true });
  }
  
  componentDidMount() {
    let accessToken = this.props.accessToken ? this.props.accessToken: localStorage.getItem("access_token");
    let header = { access_token: accessToken };

    // Simple GET request using fetch
    let result =  APICallGET(URL_FOR_CHAT_LIST+"?chat_type=", header);
    this.setState({
      friendList: [...result.responseData.chat_conversations],
    });
  }

  render() {
    let friendList = this.state.friendList;
    return (
      <div>
        <div className="header">
          <h1 className="header-content">ChatApp</h1>
          <input type="text" style={this.state.on_search ? { display: "inline" } : { display: "none" }}value={this.state.search_text}onChange={this.onChangeHandler}/>
          <button onClick={this.searchHandler}>Search</button>
          <h2 className="sub-header">Chats</h2>
        </div>
        <button onClick={this.userLogout} style={{ float: "right" }}>Logout</button>
        {friendList.map((friend) => {
          return (
            <ChatComponent key={friend.user_id} user_id={friend.user_id} user_name={friend.user_name} setStateChange={this.props.setStateChange} redirect={true}buttonIsRequired={false}/>
          );
        })}
        {this.state.logout && <Navigate to="/" />}
        {this.state.on_search_redirect && <Navigate to="/search" />}
      </div>
    );
  }
}

export default ChatList;
