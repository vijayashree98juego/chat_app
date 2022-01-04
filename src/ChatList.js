import React, { Component } from 'react';
import ChatComponent from './ChatComponent';
import './ChatList.css'
import {Link } from 'react-router-dom'

class ChatList extends Component {
    constructor(props) {
        super(props);
        this.state={
          friendList: []
        }
}

componentDidMount(){ 
    let url='https://api-us.juegogames.com/NOMOS-V3/chat?chat_type=0';
            const data = {
                method: 'GET',
                headers: {access_token:this.props.accessToken }                    
            };
            // Simple GET request using fetch
             fetch(url,data)
            .then(response => response.json())
            .then(data =>{
                this.setState( {
                    friendList:[...data.responseData.chat_conversations]
                })
            });
  
}  
  
    render() {
        let friendList =this.state.friendList;
        return (
            <div>
                <div className='header'>
              <h1 className='header-content'>ChatApp</h1>
              <button className="searchButton">
                 Search  
              </button>
              <h2 className='sub-header'>Chats</h2>
              </div>
               {friendList.map((friend)=>{
                 return<ChatComponent  key = {friend.user_id} user_id={friend.user_id} user_name={friend.user_name} setStateChange={this.props.setStateChange} redirect={true}/>
               })}
                
            </div>
        );
       
    }
}



export default ChatList;