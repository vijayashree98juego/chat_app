import React, { Component } from 'react';
import SignIn from './SignIn.js';
import ChatList from './ChatList.js';
import {
  BrowserRouter,
  Routes,
  Route,
  
  useHistory 
} from "react-router-dom";
class App extends Component {
  constructor(props){
    super(props);
    this.state={
      access_token:''
    }
    this.setStateChange = this.setStateChange.bind(this);
  }
  setStateChange(accessToken){
    console.log("set change")
    this.setState({
      access_token:accessToken
    })
  }
  render() {
 
    return (
      <div>
      {/* <SignIn/> */}
      <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<SignIn setStateChange={this.setStateChange}/>}/>
        <Route exact path="/chat" element={<ChatList setStateChange={this.setStateChange} accessToken={this.state.access_token}/>} />       
    </Routes>
  </BrowserRouter>,
{/* <BrowserRouter>
           <Router>
          <Route exact path="/" component={<SignIn/>} />
          <Route  path="/chat" component={<ChatList/>} />
          </Router>
          </BrowserRouter>
  */}
</div>
    
    );
  }
}



export default App;
