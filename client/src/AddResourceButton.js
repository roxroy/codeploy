import React, { Component } from 'react';
const AddResourceModal = require('./AddResourceModal');

class AddResourceButton extends Component {
	constructor(props) {
		super(props);

		this.state = {
      modalOpen: false
    };

		this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
	}
	openModal() {
    this.setState({
      modalOpen: true
    });
  }
  closeModal() {
    this.setState({
      modalOpen: false
    });
  }
  render(){
    return(
    <div>
      <button className="modal-button" onClick={this.openModal}>Add Resource</button>
      {this.state.modalOpen && <AddResourceModal 
      	closeModal={this.closeModal}
      	modalIsOpen={this.state.modalOpen}
        saveResource={this.props.saveResource}
        closeResourceModal={this.props.closeResourceModal}
        username={this.props.username}
      />} 
    </div>
    );
  }
}

module.exports = AddResourceButton;