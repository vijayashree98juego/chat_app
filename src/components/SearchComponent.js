import React, { Component } from 'react';
import { Navigate } from "react-router";

class SearchComponent extends Component {
  constructor(props) {
    super(props);
      this.state={
        onSearch: false,
        searchText: "",
        onSearchRedirect: false, 
      }
        
    this.searchHandler = this.searchHandler.bind(this)
    this.onChangeHandler = this.onChangeHandler.bind(this)
    this.onStateChange= this.onStateChange.bind(this)
  }
    
  onStateChange(data){
    this.setState(data)
  }
    
  onChangeHandler(e) {
    let text = e.target.value;
    this.onStateChange({ searchText: text });
  }
    
  searchHandler() {
    if (!this.state.onSearch) {
      return this.onStateChange({ onSearch: true });
    }
    
    if (this.state.searchText.length < 3) {
      return alert('Invalid search.Minimum of 3 characters are required!!!');
    }
    
    this.props.setStateChange({
      searchText: this.state.searchText,
    });
    
    this.onStateChange({ onSearchRedirect: true });
  }

  render() {
    return (
      <div>
        <input type="text" style={this.state.onSearch ? { display: "inline" } : { display: "none" }} value={this.state.searchText} onChange={this.onChangeHandler}/>
        <button onClick={this.searchHandler}>Search</button>
        {this.state.onSearchRedirect && <Navigate to="/search" />}
      </div>
    );
  }
}

export default SearchComponent;