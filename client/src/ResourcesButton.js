import React, { Component } from 'react';

class ResourcesButton extends Component {
  constructor(props) {
    super(props);
      this.viewResources = this.viewResources.bind(this);
  }

  viewResources() {
    this.props.closeResourceModal();
    this.props.viewResources();
  }

  render(){
    return(
    <div>
      <button className="modal-button" onClick={this.viewResources}>Resources</button>
    </div>
    );
  }
}

module.exports = ResourcesButton;