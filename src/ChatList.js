import React, { Component } from 'react';
import { Navigate } from 'react-router';
import ChatComponent from './ChatComponent';
import './ChatList.css'


class ChatList extends Component {
    constructor(props) {
        super(props);
        this.state={
          friendList: [],
          logout:false
        }
        this.userLogout=this.userLogout.bind(this)
}

userLogout(){
    localStorage.clear();
    this.setState({
        logout:true
    })
}
componentDidMount(){ 
    let accessToken=this.props.accessToken?this.props.accessToken:localStorage.getItem('access_token')
    let url='https://api-us.juegogames.com/NOMOS-V3/chat?chat_type=0';
            const data = {
                method: 'GET',
                headers: {access_token:accessToken }                    
            };
            // Simple GET request using fetch
             fetch(url,data)
            .then(response => response.json())
            .then(data =>{
                localStorage.setItem('friend_list',JSON.stringify([...data.responseData.chat_conversations]))
                this.setState( {
                    friendList:[...data.responseData.chat_conversations]
                })
            });  
}  
  
    render() {
        let friendList =this.state.friendList.length?this.state.friendList:(localStorage.getItem('friend_list')?JSON.parse(localStorage.getItem('friend_list')):[]);

        return (
            <div>
              <div className='header'>
              <h1 className='header-content'>ChatApp</h1>
              <button className="searchButton">
                 Search  
              </button>
              <h2 className='sub-header'>Chats</h2>
              </div>
              <button onClick={this.userLogout} style={{float:'right'}}>Logout</button>
               {friendList.map((friend)=>{
                 return<ChatComponent  key = {friend.user_id} user_id={friend.user_id} user_name={friend.user_name} setStateChange={this.props.setStateChange} redirect={true}/>
               })}
               {this.state.logout&&<Navigate to='/'/>}
                
            </div>
        );
       
    }
}



export default ChatList;