import React, { Component } from 'react';

class HandleAuth extends Component {
  render() {
    return (
      <div className="auth-buttons">
        <button className="modal-button">Log in with Github</button>
        <button className="modal-button">Log in with Slack</button>
      </div>
    );
  }
}

module.exports = HandleAuth;