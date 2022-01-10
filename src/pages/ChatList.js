import React, { Component } from "react";
import ChatComponent from "../components/ChatComponent";
import "../styles/ChatList.css";
import APICallGET from "../services/APICallGET";
import {URL_FOR_CHAT_LIST} from '../global/constant'
import SearchComponent from "../components/SearchComponent";
import { Navigate } from "react-router";
class ChatList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friendList: [],
      logout: false,
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
    this.onStateChange({ searchText: text });
  }

  searchHandler() {
    if (!this.state.on_search) {
      return this.onStateChange({ onSearch: true });
    }

    if (this.state.search_text.length < 3) {
      return alert('Invalid search.Minimum of 3 characters are required!!!');
    }

    this.props.setStateChange({
      searchText: this.state.searchText,
    });

    this.onStateChange({ onSearchRedirect: true });
  }
  
  componentDidMount() {
    let accessToken = this.props.accessToken ? this.props.accessToken: localStorage.getItem("access_token");
    let header = { access_token: accessToken };

    APICallGET(URL_FOR_CHAT_LIST+"?chat_type=0", header).then((result)=>{
      this.setState({
        friendList: [...result.responseData.chat_conversations],
      });
    }).catch((err)=>{
      alert("something went wrong !!!!")
    })
  }

  render() {
    let friendList = this.state.friendList;
  
    return (
      <div>
        <div className="header">
          <h1 className="header-content">ChatApp</h1>
          <SearchComponent setStateChange={this.props.setStateChange}/>
          <h2 className="sub-header">Chats</h2>
        </div>
        <button onClick={this.userLogout} style={{ float: "right" }}>Logout</button>
        {friendList.map((friend) => {
          return (
            <ChatComponent key={friend.user_id} userId={friend.user_id} userName={friend.user_name} setStateChange={this.props.setStateChange} redirect={true}/>
          );
        })}
        {this.state.logout &&  <Navigate to="/" />}
      </div>
    );
  }
}

export default ChatList;
