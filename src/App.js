import React, { Component } from 'react';
import SignIn from './SignIn.js';
import ChatList from './ChatList.js';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import ChatDetail from './ChatDetail.js';
class App extends Component {  
  constructor(props){
    super(props);
  
    this.state={
      access_token:'',
      other_user_id:0,
      other_user_name:'',
      user_name:''
    }
    this.setStateChange = this.setStateChange.bind(this);
  }

  setStateChange(data){
    this.setState(data)
  }
  render() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<SignIn setStateChange={this.setStateChange}/>}/>
          <Route exact path="/chat" element={<ChatList setStateChange={this.setStateChange} accessToken={this.state.access_token}/>} /> 
        <Route path='/chatDetail' exact={true} element={<ChatDetail  accessToken={this.state.access_token} user_name={this.state.user_name} other_user_name={this.state.other_user_name} other_user_id={this.state.other_user_id} setStateChange={this.setStateChange} /> }/>
        </Routes>
      </BrowserRouter>
    </div>
    );
  }
}



export default App;
