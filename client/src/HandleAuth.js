import React, { Component } from 'react';

class HandleAuth extends Component {
  render() {
    return (
      <div className="auth-buttons">
      	<a className="btn modal-button github" href="/github">Log in with Github</a>
      </div>
    );
  }
}

module.exports = HandleAuth;