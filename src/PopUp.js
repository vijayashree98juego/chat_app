import React, { Component } from "react";
import './PopUp.css'

class PopUp extends Component {
    constructor(props) {
        super(props);
        this.state={
          can_close:false
        }
        this.onClose=this.onClose.bind(this);
        this.logout = this.logout.bind(this);
    }
    onClose(){
      this.props.onStateChange({
        is_pop_up:false
      })
    }
    logout(){
      localStorage.clear()
      this.props.onStateChange({
        is_pop_up:false,
        logout:true
      })
    }
    
  render() {
    return (
      <div>
        <div className="popup-box">
          <div className="box">
            <span className="close-icon" onClick={this.onClose}>
              x
            </span>
            <p style={{color:'red',fontWeight:'bold'}}>{this.props.header}</p>
            <div className="message-container">
            {this.props.message}
            </div>
           {this.props.is_logout&&
             <button className="logout" onClick={this.logout}>Log out</button>
           } 
          </div>
        </div>
      </div>
    );
  }
}

export default PopUp;
