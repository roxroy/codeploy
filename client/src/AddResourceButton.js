import React, { Component } from 'react';
const AddResourceModal = require('./AddResourceModal');

class AddResourceButton extends Component {
	constructor(props) {
		super(props);

		this.state = {
      modalIsOpen: false
    };

		this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
	}
	openModal() {
    this.setState({
      modalIsOpen: true
    });
  }
  closeModal() {
    this.setState({
      modalIsOpen: false
    });
  }
  render(){
    return(
    <div>
      <button className="modal-button" onClick={this.openModal} >Add Resource</button>
      {this.state.modalIsOpen && <AddResourceModal 
      	closeModal={this.closeModal}
      	modalIsOpen={this.state.modalIsOpen}
        saveResource={this.props.saveResource}
      />}
      
    </div>
    );
  }
}

module.exports = AddResourceButton;