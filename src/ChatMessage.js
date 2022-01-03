import React, { Component } from 'react';
import './ChatMessage.css'


class ChatMessage extends Component {
    render() {
        return (
            <div>
           <div class="container">
               {console.log("dispay")}
               {console.log(this.props)}
           <p className='right' >hgshgsg{this.props.sender_name}</p>
  <p>hdghfd{this.props.message}</p>
  {/* <span class="time-right">11:00</span> */}
</div>
            </div>
        );
    }
}

export default ChatMessage;