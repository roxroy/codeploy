import React, { Component } from 'react';

class LogOutButton extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
  }

  logOut() {
    this.props.closeResourceModal();
    this.props.logOut();
  }

  render() {
    return (
      <div>
        <button className="modal-button" onClick={this.logOut}>Log Out</button>
      </div>
    );
  }
}

module.exports = LogOutButton;