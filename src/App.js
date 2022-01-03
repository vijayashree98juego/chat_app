import React, { Component } from 'react';
import SignIn from './SignIn.js';
import ChatList from './ChatList.js';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useHistory 
} from "react-router-dom";
import ChatDetail from './ChatDetail.js';
class App extends Component {
  
  constructor(props){
    super(props);
    console.log(props)
    this.state={
      access_token:'',
      other_user_id:0
    }
    this.setStateChange = this.setStateChange.bind(this);
  }
  setStateChange(data){
    console.log("set change")
    console.log(data)
    this.setState(data)
  }
  render() {
console.log("main rendering.....")
console.log(this.state.other_user_id)
return (
      <div>
      {/* <SignIn/> */}
      <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<SignIn setStateChange={this.setStateChange}/>}/>
      <Route exact path="/chat" element={<ChatList setStateChange={this.setStateChange} accessToken={this.state.access_token}/>} /> 

<Route path='/chatDetail' exact={true} element={<ChatDetail  accessToken={this.state.access_token} other_user_id={this.state.other_user_id} setStateChange={this.setStateChange} /> }/>


      {/* <Route  path="/chatDetail" 
      element={<ChatDetail accessToken={this.state.access_token} user_id={new URLSearchParams(window.location.search).get('user_id')}/>}  */}
      {/* // element={<ChatDetail  accessToken={this.state.access_token} user_id={new URLSearchParams(this.props.location.search).get('user_id')} /> }
      />   */}
      {/* component={(props) =><ChatDetail {...props} accessToken={this.state.access_token} user_id={new URLSearchParams(this.props.location.search).get('user_id')}/>} 
      // element={<ChatDetail  accessToken={this.state.access_token} user_id={new URLSearchParams(this.props.location.search).get('user_id')} /> }
      />   */}
    </Routes>
  </BrowserRouter>
</div>
    
    );
  }
}



export default App;
