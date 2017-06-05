import React, { Component } from 'react';

// todo: add a clear button for the input box

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: "",
      searchOpen: false
    }
    this.handleSearchClick = this.handleSearchClick.bind(this);
  }
  handleSearchClick(event) {
    if (this.state.searchOpen && this.state.searchValue) {
      this.props.handleSearch(this.state.searchValue);
    } else {
      this.setState({ searchOpen: !this.state.searchOpen })
    }
  }
  render() {
    return (
      <div className="search-container">
        <a onClick={this.handleSearchClick} href="#" className="search-icon"><i className="fa fa-search"></i></a>
        <input
          disabled={!this.state.searchOpen}
          onKeyUp={event => { (event.key === "Enter") && this.handleSearchClick() }}
          value={this.state.searchValue}
          onChange={event => this.setState({ searchValue: event.target.value })}
          className={this.state.searchOpen ? "expanded" : null}
          type="search"
          placeholder="Search..."
        />
      </div>
    );
  }
}

module.exports = Search;