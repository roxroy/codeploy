import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: "",
      searchOpen: false
    }
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleClearSearch = this.handleClearSearch.bind(this);
  }
  componentDidMount() {
    // if click outside searchbox
    document.addEventListener('click', this.handleClickOutside, true);
  }
  componentWillUnmount() {
    // remove eventlisteners here
    document.removeEventListener('click', this.handleClickOutside, true);
  }
  handleSearchClick(event) {
    if (this.state.searchOpen && this.state.searchValue) {
      this.props.handleSearch(this.state.searchValue);
    } else {
      this.setState({ searchOpen: !this.state.searchOpen })
    }
  }
  handleClearSearch(event){
    this.setState({
      searchValue: "",
      searchOpen: false
    });
  }
  handleClickOutside(event){
    const domNode = ReactDOM.findDOMNode(this);
    
    // if clicked target is not found in domNode then close inputbox
    if ((!domNode || !domNode.contains(event.target))) {
        this.setState({
            searchOpen: false
        });
    }
  }
  render() {
    return (
      <div className="search-container">
        <a onClick={this.handleSearchClick} href="#" className="search-icon pointer-events"><i className="fa fa-search"></i></a>
        <input
          disabled={!this.state.searchOpen}
          onKeyUp={event => { (event.key === "Enter") && this.handleSearchClick() }}
          value={this.state.searchValue}
          onChange={event => this.setState({ searchValue: event.target.value })}
          className={this.state.searchOpen ? "expanded pointer-events" : "pointer-events"}
          type="search"
          placeholder="Search..."
        />
        {this.state.searchOpen && <button onClick={this.handleClearSearch} className="clear-search pointer-events">X</button>}
      </div>
    );
  }
}

module.exports = Search;