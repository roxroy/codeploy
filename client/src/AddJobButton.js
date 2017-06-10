import React, { Component } from 'react';
import Modal from 'react-modal';

class AddJobButton extends Component {
	constructor(props) {
    super(props);
    this.state = {
      modalOpen: false
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.savejob = this.savejob.bind(this);
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
  savejob() {
  	let job = { 
  		"jobPosition": this.refs.newJobPosition.value, 
  		"companyName": this.refs.newJobCompany.value, 
  		"dateApplied": this.refs.newJobDate.value, 
  		"resources": this.refs.newJobResources.value, 
  		"comments": this.refs.newJobComments.value 
  	}
  	this.props.saveJob(job);
  }
	render() {
		const addJobStyle = {
      overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.75)'
      },
      content: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        position: 'absolute',
        maxWidth: "400px",
        maxHeight: "600px",
        top: '40px',
        left: '0',
        right: '0',
        margin: "0 auto",
        bottom: '40px',
        border: '1px solid #ccc',
        background: '#fff',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        borderRadius: '7px',
        outline: 'none',
        padding: '20px'

      }
    }
		return (
			<div>
				<button className="addjobbutton" onClick={this.openModal}>Add Job</button>
				<Modal
        isOpen={this.state.modalOpen}
        onRequestClose={this.closeModal}
        style={addJobStyle}
        contentLabel="Add a Job"
      >
        <div className="add-job-container">
          <button className="close" onClick={this.closeModal}>X</button>
          <h4>Position</h4>
          <textarea ref="newJobPosition" placeholder="Job Title"></textarea>
          <h4>Company</h4>
          <textarea ref="newJobCompany" placeholder="Company Name"></textarea>
          <h4>Date Applied</h4>
          <textarea ref="newJobDate" placeholder="Date Application Submitted"></textarea>
          <h4>Resources</h4>
          <textarea ref="newJobResources" placeholder="Resources used"></textarea>
          <h4>Comments</h4>
          <textarea className="additional-details" ref="newJobComments" placeholder="What is the status of your application?"></textarea>
          <div className="save-button-container">
          <button className="save-job" onClick={this.savejob}>Save</button>
          </div>
        </div>
      </Modal>
			</div>
		);
	}
}

module.exports = AddJobButton;