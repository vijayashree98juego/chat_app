import React, { Component } from "react";
import { Navigate } from "react-router";
import ChatComponent from "./ChatComponent";
import "./ChatList.css";
import { APICall } from "./APICall.js";

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

  userLogout() {
    this.setState({
      logout: true,
    });
    localStorage.clear();
  }

  onStateChange(data) {
    this.setState(data);
  }

  onChangeHandler(e) {
    let text = e.target.value;
    this.onStateChange({ search_text: text });
  }

  async searchHandler() {
    if (!this.state.on_search) {
      return this.onStateChange({ on_search: true });
    }
    if (this.state.search_text.length < 3) {
      return alert("invalid search!!!!");
    }

    this.props.setStateChange({
      search_text: this.state.search_text,
    });

    if (localStorage.getItem("search_list"))
      localStorage.removeItem("search_list");
    this.onStateChange({ on_search_redirect: true });
  }
  async componentDidMount() {
    let accessToken = this.props.accessToken
      ? this.props.accessToken
      : localStorage.getItem("access_token");
    let url = "https://api-us.juegogames.com/NOMOS-V3/chat?chat_type=0";

    let header = { access_token: accessToken };

    // Simple GET request using fetch
    let result = await APICall("chat?chat_type=0", "GET", header);
    this.setState({
      friendList: [...result.responseData.chat_conversations],
    });
  }

  render() {
    let friendList = this.state.friendList.length
      ? this.state.friendList
      : localStorage.getItem("friend_list")
      ? JSON.parse(localStorage.getItem("friend_list"))
      : [];

    return (
      <div>
        <div className="header">
          <h1 className="header-content">ChatApp</h1>
          <input
            type="text"
            style={
              this.state.on_search ? { display: "inline" } : { display: "none" }
            }
            value={this.state.search_text}
            onChange={this.onChangeHandler}
          />
          <button onClick={this.searchHandler}>Search</button>
          <h2 className="sub-header">Chats</h2>
        </div>
        <button onClick={this.userLogout} style={{ float: "right" }}>
          Logout
        </button>
        {friendList.map((friend) => {
          return (
            <ChatComponent
              key={friend.user_id}
              user_id={friend.user_id}
              user_name={friend.user_name}
              setStateChange={this.props.setStateChange}
              redirect={true}
              buttonIsRequired={false}
            />
          );
        })}
        {this.state.logout && <Navigate to="/" />}
        {this.state.on_search_redirect && <Navigate to="/search" />}
      </div>
    );
  }
}

export default ChatList;
