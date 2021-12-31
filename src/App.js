import React, { Component } from 'react';
import SignIn from './SignIn.js';
import ChatList from './ChatList.js';
class App extends Component {
  
  
  render() {
    return (
      <div>
      <SignIn/>
      
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
