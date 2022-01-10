import React, { Component } from "react";
import SignIn from "./pages/SignIn.js";
import ChatList from "./pages/ChatList.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatDetail from "./pages/ChatDetail.js";
import SearchList from "./pages/SearchList.js";
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: 0,
      accessToken: "",
      otherUserId: 0,
      otherUserName: "",
      userName: "",
      searchText: "",
    };
    this.setStateChange = this.setStateChange.bind(this);
  }

  setStateChange(data) {
    return this.setState(data);
  }

  render() {
  
    return (
      <div>
        <BrowserRouter>     
          <Routes>
            <Route exact path="/" element={<SignIn setStateChange={this.setStateChange} />}/>
            <Route exact path="/chat" element={ 
              <ChatList setStateChange={this.setStateChange} accessToken={this.state.accessToken} user_id={this.state.userId}/>
            }/>
            <Route path="/chatDetail" exact={true} element={
              <ChatDetail accessToken={ this.state.accessToken} userName={ this.state.userName} otherUserName={ this.state.otherUserName}
                otherUserId={this.state.otherUserId} userId={this.state.userId} setStateChange={this.setStateChange}
              />
            }/>
            <Route path="/search" element={
              <SearchList searchText={this.state.searchText} userId={this.state.userId} setStateChange={this.setStateChange}/>
            }/>
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
