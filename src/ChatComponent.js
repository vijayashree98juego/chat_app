import React, { Component } from 'react';
import './ChatComponent.css'
import './ChatList.css'
import profile from './profile.png'
import {Link } from 'react-router-dom'
import ChatDetail from './ChatDetail';

class ChatComponent extends Component {
 constructor(props){
     super(props);
     this.onChangeHandle=this.onChangeHandle.bind(this)
 }

 onChangeHandle(){
     console.log("donjdh")
     console.log(this.props)
    this.props.setStateChange({other_user_id:this.props.friend.user_id})
 }

    render() {
        let linkEnable=true;
        return (
            <div>
                <Link to="/chatDetail"
                onClick={this.onChangeHandle}
            className='profile-redirect'>
            <div className='user-data'>
                <img className="circular-square" src={profile} alt={profile}/>
                <p className='profile-name'>{this.props.friend.user_name} </p>          
           </div>
           </Link> 
           </div>
        );
    }
}

export default ChatComponent;