import React, { Component } from 'react';
import './App.css';
const Menu = require('./Menu');
const Search = require('./Search');

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: this.props.loggedIn
    }
  }
  render() {
    return (
      <div className="navbar">
        <div className="container-fluid">
          <Search handleSearch={this.props.handleSearch} />
          <h1 className="title">Codeploy</h1>
          <Menu
            loggedIn={this.props.loggedIn}
            viewJobs={this.props.viewJobs}
            viewResources={this.props.viewResources}
            logOut={this.props.logOut}
            saveResource={this.props.saveResource}
            username={this.props.username}
            viewAbout={this.props.viewAbout}
          />
        </div>
      </div>
    );
  }
}

module.exports = Navbar;