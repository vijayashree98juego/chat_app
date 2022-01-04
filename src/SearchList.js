import React, { Component } from 'react';
import PropTypes from 'prop-types';
import APICall from './APICall'

class SearchList extends Component {
constructor(props){
    super(props)
    this.state={
        searched_list:[]
    }
}

async componentDidMount(){ 
    console.log("component did mount")
    let accessToken=this.props.accessToken?this.props.accessToken:localStorage.getItem('access_token')
    let url='https://api-us.juegogames.com/NOMOS-V3/chat?chat_type=0';
         
              let  header={access_token:accessToken }                    

            // Simple GET request using fetch
            let result = await APICall('search?search_text=vi&filter_type=2','GET',header);
            console.log(result)
            localStorage.setItem('friend_list',JSON.stringify([...result.responseData.people]))
            // this.setState({
            //     searched_list:[...result.responseData.people]
            // })
            return this.props.onStateChange({friendList:[...result.responseData.people]})
                // this.setState( {
                //     friendList:[...result.responseData.chat_conversations]
                // })
}  
  
    render() {
        console.log("render 2")
        console.log(this.props)
        return (
            <div>
            xxx
            </div>
        );
    }
}

SearchList.propTypes = {

};

export default SearchList;