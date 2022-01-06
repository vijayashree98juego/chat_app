import React, { Component } from "react";
import APICall from "./APICall";
import ChatComponent from "./ChatComponent";
import RedirectPage from "./RedirectPage";
class SearchList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searched_list: [],
      on_load: false,
    };
  }

  async componentDidMount() {
    let accessToken = this.props.accessToken
      ? this.props.accessToken
      : localStorage.getItem("access_token");
    let url = "https://api-us.juegogames.com/NOMOS-V3/chat?chat_type=0";

    let header = { access_token: accessToken };

    // Simple GET request using fetch
    let result = await APICall(
      "search?search_text=" + this.props.searchText + "&filter_type=2",
      "GET",
      header
    );
    localStorage.setItem(
      "search_list",
      JSON.stringify([...result.responseData.people])
    );

    this.setState({
      searched_list: [...result.responseData.people],
      on_load: true,
    });
  }

  render() {
    let searchedUserList = localStorage.getItem("search_list")
      ? JSON.parse(localStorage.getItem("search_list"))
      : this.state.searched_list;
    let userList = searchedUserList.filter(
      (user) => user.user_id !== this.props.userId
    );

    return (
      <div>
        <div className="header">
          <h1 className="header-content">ChatApp</h1>
          <h2 className="sub-header">Search List</h2>
        </div>
        <RedirectPage />
        {userList.length &&
          userList.map((user) => {
            return (
              <div key={user.user_id}>
                <ChatComponent
                  key={user.user_id}
                  user_id={user.user_id}
                  user_name={user.user_name}
                  setStateChange={this.props.setStateChange}
                  redirect={false}
                  buttonIsRequired={true}
                />
              </div>
            );
          })}
        {!userList.length && this.state.on_load && <h1>No user found</h1>}
      </div>
    );
  }
}

export default SearchList;
