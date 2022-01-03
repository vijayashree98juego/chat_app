import React, { Component } from 'react';
import ChatComponent from './ChatComponent'
import {Link } from 'react-router-dom'
import ChatMessage from './ChatMessage';


class ChatDetail extends Component {
    constructor(props){
        super(props);
        this.state={
            chat_messages:[]
        }
        this.setStateChange=this.setStateChange.bind(this)
    }

    setStateChange(data){
        this.setState({
            chat_messages:data
        })
    }
    componentDidMount(){ 

        let url='https://api-us.juegogames.com/NOMOS-V3/chat/messages?chat_type=0&user_id='+this.props.other_user_id;
        console.log("urlll")
        console.log(url)
             console.log("component did mount")  
                const data = {
                    method: 'GET',
                    headers: {access_token:this.props.accessToken }                    
                };
                // Simple GET request using fetch
                 fetch(url,data)
                .then(response => response.json())
                .then(data =>{
                    console.log(data.responseData.messages)
                    
                    this.setStateChange(data.responseData.messages)
                });
      
    }  

    render() {
        console.log("chat detail...")
        const search = this.props;
        return (
            <div>
                <h1>hello</h1>
                {this.state.chat_messages.map((user)=>{
                    console.log(user);
                   <ChatMessage sender_name={user.sender_name} message={user.message}/>
                })}
            
            
            </div>
        );
    }
}

export default ChatDetail;