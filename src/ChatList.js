import React, { Component } from 'react';
import ChatComponent from './ChatComponent';
import './ChatList.css'

class ChatList extends Component {
    constructor(props) {
        super(props);
        this.state={
          friendList: [
            {
                "chat_type": 1,
                "chat_id": 53,
                "chat_name": "10_189",
                "last_message": "Hello",
                "is_last_message_attachment": false,
                "last_message_time": 1640845443484,
                "unread_count": 1,
                "user_id": 10,
                "user_name": "Ganesh Acharya",
                "profile_picture": "https://nomos-server.s3.amazonaws.com/NOMOS/d55facca-7558-4773-b7d2-645ebc8121bd.png",
                "online_status": false
            },
            {
                "chat_type": 1,
                "chat_id": 52,
                "chat_name": "188_189",
                "last_message": "hiii",
                "is_last_message_attachment": false,
                "last_message_time": 1640786802156,
                "unread_count": 1,
                "user_id": 188,
                "user_name": "tester",
                "profile_picture": "",
                "online_status": false
            }
        ]
        }
}

componentDidMount(){ 
    let url='https://api-us.juegogames.com/NOMOS-V3/chat?chat_type=0';
         console.log("component did mount")  
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
              <table className='chat-list'>
               {friendList.map((friend)=>{
                 return<ChatComponent  key = {friend.user_id} friend={friend}/>
               })}
               </table>
                
            </div>
        );
       
    }
}



export default ChatList;