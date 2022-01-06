import React, { Component } from "react";
import SignIn from "./SignIn.js";
import ChatList from "./ChatList.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatDetail from "./ChatDetail.js";
import SearchList from "./SearchList.js";
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user_id: 0,
      access_token: "",
      other_user_id: 0,
      other_user_name: "",
      user_name: "",
      search_text: "",
    };
    this.setStateChange = this.setStateChange.bind(this);
  }

  setStateChange(data) {
    this.setState(data);
  }
  render() {
    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route
              exact
              path="/"
              element={<SignIn setStateChange={this.setStateChange} />}
            />
            <Route
              exact
              path="/chat"
              element={
                <ChatList
                  setStateChange={this.setStateChange}
                  accessToken={this.state.access_token}
                />
              }
            />
            <Route
              path="/chatDetail"
              exact={true}
              element={
                <ChatDetail
                  accessToken={
                    this.state.access_token
                      ? this.state.access_token
                      : localStorage.getItem("access_token")
                  }
                  user_name={
                    this.state.user_name
                      ? this.state.user_name
                      : localStorage.getItem("user_name") ?? ""
                  }
                  other_user_name={
                    this.state.other_user_name
                      ? this.state.other_user_name
                      : localStorage.getItem("other_user_name") ?? ""
                  }
                  other_user_id={this.state.other_user_id}
                  setStateChange={this.setStateChange}
                />
              }
            />
            <Route
              path="/search"
              element={
                <SearchList
                  searchText={this.state.search_text}
                  userId={this.state.user_id}
                />
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
