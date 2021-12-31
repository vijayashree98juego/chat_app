import React, { Component } from 'react';
import './ChatComponent.css'
import './ChatList.css'

class ChatComponent extends Component {
    render() {
        return (
            // <div >
            <>
            {/* <h3 className='user-name'> */}
                <tr>
                    <td>
                {this.props.friend.user_name}
                </td>
                </tr>
            {/* </h3> */}
              
          </>
        );
    }
}

export default ChatComponent;