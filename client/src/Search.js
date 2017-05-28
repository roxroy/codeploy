import React, { Component } from 'react';

class Search extends Component {
  constructor(props){
    super(props);
  
  this.state = {
    search: "",
    searchOpen: false
  }
  this.handleClick = this.handleClick.bind(this);
  this.handleChange = this.handleChange.bind(this);
  }
  handleClick (event) {
    return this.setState({
      searchOpen: !this.state.searchOpen
    });
  }
  handleChange(event) {
    let value = event.target.value;
    
    return this.setState({
      search: value
    });
  }
  render() {
    return (
      <div className="search-container">
        <a onClick={this.handleClick} href="#" className="search-icon"><i className="fa fa-search"></i></a> 
        <input 
          disabled={!this.state.searchOpen} 
          onChange={this.handleChange} 
          className={this.state.searchOpen ? "expanded":null} 
          type="search" 
          placeholder="Search..."
        />
      </div>
    );
  }
}

module.exports = Search;