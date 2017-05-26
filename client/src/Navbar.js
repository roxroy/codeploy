import React, { Component } from 'react';
import './App.css';
const Menu = require('./Menu');
const Search = require('./Search');

class Navbar extends React.Component {
  constructor (props) {
    super(props);
    
    this.state = {
      loggedIn : this.props.loggedIn
    }
  }
      render() {
          return (
            <div className="navbar">
              <div className="container-fluid">
                <Search />
                <h1 className="title">Codeploy</h1>
                <Menu loggedIn={this.props.loggedIn} viewJobs={this.props.viewJobs} viewResources={this.props.viewResources} logOut={this.props.logOut} />
              </div>
            </div>
          );
    }
}

module.exports = Navbar;