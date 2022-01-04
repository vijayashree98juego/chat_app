import React, { Component } from 'react';
import ChatComponent from './ChatComponent'
import ChatMessage from './ChatMessage';


class ChatDetail extends Component {
    constructor(props){
        super(props);
        this.state={
            chat_messages:[],
            new_message:'',
            redirect:false
        }
        this.setStateChange=this.setStateChange.bind(this)
        this.onSubmitHandler= this.onSubmitHandler.bind(this)
        this.onChangeHandler = this.onChangeHandler.bind(this)
    }

    setStateChange(data){
        this.setState({
            chat_messages:data
        })
    }

    onSubmitHandler(){
        this.setState({
            redirect:true
        })
    }

    onChangeHandler(e){
        let message = e.target.value;
    
        this.setState({
            new_message:message
        })
    }
    componentDidMount(){ 

        let url='https://api-us.juegogames.com/NOMOS-V3/chat/messages?chat_type=0&user_id='+this.props.other_user_id;
                const data = {
                    method: 'GET',
                    headers: {access_token:this.props.accessToken }                    
                };
                // Simple GET request using fetch
                 fetch(url,data)
                .then(response => response.json())
                .then(data =>{
                    this.setStateChange(data.responseData.messages)
                });
      
    }  

    render() {
        return (
            <div>
                <ChatComponent user_name={this.props.other_user_name}  user_id={this.props.user_id} redirect={false}/>
                {this.state.chat_messages.map((user)=>{
                   return <ChatMessage  key={user.message_id} sender_name={user.sender_name} message={user.message}/>
                })}
                {this.state.redirect&&<ChatMessage sender_name={this.props.user_name} message={this.state.new_message} key={0} />}
                <input type="text" name="message" value={this.state.new_message} onChange={this.onChangeHandler}/>
                <button type="submit"  onClick={this.onSubmitHandler}>SEND</button>            
            </div>
        );
    }
}

export default ChatDetail;