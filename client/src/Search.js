import React, { Component } from 'react';

class Search extends Component {
  constructor(props){
    super(props);
  
    this.state = {
      searchValue: "",
      searchOpen: false
    }
  }
  render() {
    console.log(this.state.searchValue);
    return (
      <div className="search-container">
        <a onClick={event => this.setState({searchOpen: !this.state.searchOpen})} href="#" className="search-icon"><i className="fa fa-search"></i></a> 
        <input 
          disabled={!this.state.searchOpen}
          value={this.state.searchValue}
          onChange={event => this.setState({searchValue: event.target.value})}
          className={this.state.searchOpen ? "expanded" : null} 
          type="search" 
          placeholder="Search..."
        />
      </div>
    );
  }
}

module.exports = Search;