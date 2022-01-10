import React, { Component } from "react";
import APICallGET from "./components/APICallGET";
import ChatComponent from "./components/ChatComponent";
import RedirectPage from "./components/RedirectPage";
import {URL_FOR_SEARCH} from './components/constant'

class SearchList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedList: [],
      onLoad: false,
    };
  }

 componentDidMount() {
    let accessToken = this.props.accessToken? this.props.accessToken: localStorage.getItem("access_token");
    let header = { access_token: accessToken };

    new Promise((resolve)=>{
      resolve(APICallGET(URL_FOR_SEARCH+"?search_text=" + this.props.searchText + "&filter_type=2", header))
    }).then((result)=>{
      localStorage.setItem( "search_list",JSON.stringify([...result.responseData.people]));
      this.setState({
      searchedList: [...result.responseData.people],
      onLoad: true,
    });
    }).catch((err)=>{
      alert('Something went wrong!!!')
    })
  }

  render() {
    let searchedUserList = this.state.searchedList;
    let userList = searchedUserList.filter((user) => user.user_id !== this.props.userId);

    return (
      <div>
        <div className="header">
          <h1 className="header-content">ChatApp</h1>
          <h2 className="sub-header">Search List</h2>
        </div>
        <RedirectPage path='/chat'/>
        {!!userList.length &&
          userList.map((user) => {
            return (
              <div key={user.user_id}>
                <ChatComponent userId={user.user_id} userName={user.user_name} setStateChange={this.props.setStateChange} redirect={false} isButtonRequired={true}/>
                {/* <AddToChat  userId={user.user_id} /> */}
              </div>
            );
          })}
        {!userList.length && this.state.onLoad && <h1 style={{textAlign:"center"}}>No user found</h1>}
        {""}
      </div>
    );
  }
}

export default SearchList;
