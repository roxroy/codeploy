import React, { Component } from 'react';
import Modal from 'react-modal';

class AddJobButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      errorText: null,
      errorVisible: "none"
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.saveJob = this.saveJob.bind(this);
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
  saveJob() {
    let job = {
      "jobPosition": this.refs.newJobPosition.value.trim(),
      "companyName": this.refs.newJobCompany.value,
      "dateApplied": this.refs.newJobDate.value,
      "comments": this.refs.newJobComments.value,
    }
    console.log(job.dateApplied);

    this.setState({ errorVisible: "inline" });
    if (// test for at least 1 letter
      !/[A-Za-z]/.test(job.jobPosition)) {
      this.setState({ errorText: "Invalid entry for Positon" });
      return;
    }
    if (// test for at least 1 letter
      !/[A-Za-z]/.test(job.companyName)) {
      this.setState({ errorText: "Invalid entry for Company" });
      return;
    }
    let today = new Date();
    if /*(// test for three sets of two digits 01-12/01-31/1900-2000
      !/^(?:(0[1-9]|1[012])[\/.](0[1-9]|[12][0-9]|3[01])[\/.](19|20)[0-9]{2})$/.test(job.dateApplied)) {*/
        (job.dateApplied == "" || job.dateApplied > today) {
      this.setState({ errorText: "Invalid format for Date Applied." });
      return;
    }
    if (job.comments.length > 60) {
      this.setState({ errorText: "Please limit comment characters to 60."});
      return;
    }

    this.setState({ errorVisible: "none" });
    this.props.saveJob(job);
    this.closeModal();
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
            <h4>Position*</h4>
            <textarea ref="newJobPosition" placeholder="Job Title"></textarea>
            <h4>Company*</h4>
            <textarea ref="newJobCompany" placeholder="Company Name"></textarea>
            <h4>Date Applied*</h4>
            <input type="date" ref="newJobDate" placeholder="MM/DD/YYYY" required></input>
            <h4>Comments</h4>
            <textarea className="additional-details" ref="newJobComments" placeholder="What is the status of your application?"></textarea>
            <p className="error" style={{ display: this.state.errorVisible }}>
              <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
              {" " + this.state.errorText}
            </p>
            <div className="save-button-container">
              <button className="save-job" onClick={this.saveJob}>Save</button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

module.exports = AddJobButton;
