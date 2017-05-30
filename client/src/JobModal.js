import React, { Component } from 'react';
import Modal from 'react-modal';
const ResourceTable = require("./ResourceTable");
//{"jobPosition": "position1", "companyName": "name1", "dateApplied":"01/dd/yy", "resources":resources}
function JobModal(props){
  return (
    <div className="job-modal-container">
      <Modal
        contentLabel="jobModal"
        isOpen={props.viewingJob}
        onRequestClose={props.handleCloseModal}
      >
        <button className="close close-resource-modal" onClick={props.handleCloseModal}>X</button>
        <h2>Resources for {props.job.jobPosition} at {props.job.companyName}</h2>
        <ResourceTable
          resources={props.job.resources}
        />
      </Modal>
    </div>
  )
}

module.exports = JobModal;