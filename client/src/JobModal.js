import React, { Component } from 'react';
import Modal from 'react-modal';
const ResourceTable = require("./ResourceTable");
//{"jobPosition": "position1", "companyName": "name1", "dateApplied":"01/dd/yy", "resources":resources}
function JobModal(props) {
  const modalStyle = {
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
      maxWidth: "80%",
      maxHeight: "80%",
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
    <div className="job-modal-container">
      <Modal
        contentLabel="jobModal"
        isOpen={props.viewingJob}
        onRequestClose={props.handleCloseModal}
        style={modalStyle}
      >
        <button className="close close-resource-modal" onClick={props.handleCloseModal}>X</button>
        <h3>Resources for {props.job.jobPosition} at {props.job.companyName}</h3>
        <div className="job-resource-table">
          <ResourceTable
            resources={props.job.resources}
          />
        </div>
      </Modal>
    </div>
  )
}

module.exports = JobModal;