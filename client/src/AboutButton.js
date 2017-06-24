import React, { Component } from 'react';

class AboutButton extends Component {
  render() {
    return (
    <div>
      <button className="modal-button" onClick={this.props.viewAbout}>About</button>
    </div>
    )
  }
}

module.exports = AboutButton;