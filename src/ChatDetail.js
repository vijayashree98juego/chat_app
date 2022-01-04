import React, { Component } from 'react';
import ChatComponent from './ChatComponent'
import ChatMessage from './ChatMessage';
import RedirectPage from './RedirectPage';
import {APICall} from './APICall'

class ChatDetail extends Component {
    constructor(props){
        super(props);
        this.state={
            chat_messages:[],
            new_message:'',
            redirect:false,
        }
        this.setStateChange=this.setStateChange.bind(this)
        this.onSubmitHandler= this.onSubmitHandler.bind(this)
        this.onChangeHandler = this.onChangeHandler.bind(this)
    }


    setStateChange(data){
        this.setState(data)
    }

    onSubmitHandler(){
      let chatMessages=[...this.state.chat_messages,{message_id:this.state.chat_messages[this.state.chat_messages.length-1].message_id+1,sender_name:this.props.user_name,message:this.state.new_message}];
      localStorage.setItem('chat_messages',JSON.stringify(chatMessages))
      this.setStateChange({
            redirect:true,
            chat_messages:chatMessages,
            new_message:'',
        })
    }

    
    onChangeHandler(e){
        let message = e.target.value;
    
        this.setStateChange({
            new_message:message
        })
    }
   async componentDidMount(){ 
      let otherUserId=(this.props.other_user_id)?this.props.other_user_id:localStorage.getItem('other_user_id');
      let header ={access_token:this.props.accessToken }
      let result = await APICall('chat/messages?chat_type=0&user_id='+otherUserId,'GET',header);
      let messages=(localStorage.getItem('chat_messages')?JSON.parse(localStorage.getItem('chat_messages')):result.responseData.messages);
                localStorage.setItem('chat_messages',JSON.stringify(messages))
                  this.setStateChange({chat_messages:messages})
        // let url='https://api-us.juegogames.com/NOMOS-V3/chat/messages?chat_type=0&user_id='+otherUserId;
        //         const data = {
        //             method: 'GET',
        //             headers: {access_token:this.props.accessToken }                    
        //         };
        //         // Simple GET request using fetch
        //          fetch(url,data)
        //         .then(response => response.json())
        //         .then(data =>{ 
        //           let messages=(localStorage.getItem('chat_messages')?JSON.parse(localStorage.getItem('chat_messages')):data.responseData.messages);
        //           localStorage.setItem('chat_messages',JSON.stringify(messages))
        //             this.setStateChange({chat_messages:messages})
        //         });
      
    }  

    render() {
      let messages=(localStorage.getItem('chat_messages')?JSON.parse(localStorage.getItem('chat_messages')):this.state.chat_messages);
        return (
            <div>
              
                <ChatComponent user_name={this.props.other_user_name}  user_id={this.props.user_id} redirect={false}/>
                <RedirectPage/>
                {messages.map((user)=>{
                   return <ChatMessage  key={user.message_id} sender_name={user.sender_name} message={user.message}/>
                })}
                <input type="text" name="message" value={this.state.new_message} onChange={this.onChangeHandler}/>
                <button type="submit"  onClick={this.onSubmitHandler}>SEND</button>     
            </div>
        );
    }
}

export default ChatDetail;