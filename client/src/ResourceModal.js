import React from 'react';
import utils from './utils';
const JobListDropdown = require("./JobListDropdown")

class ResourceModal extends React.Component {
  constructor(props){
    super(props);

    this.handleResourceSelect = this.handleResourceSelect.bind(this);
  }
  handleResourceSelect(job){
    this.props.addResourceToJob(job, this.props.currentResource);
  }
  render(){
    let row = this.props.currentResource;
    return (
      <div className="resource-modal">
        <button className="close close-resource-modal" onClick={this.props.handleModalOpen}>X</button>
        <img src={row.image} alt={`icon-of-${row.name}`}/>
        <div className="resource-form">
          <p>Name: {row.name}</p>
          <p>Language: {row.language}</p>
          <p>Date Added: {utils.formattedDate(row.dateAdded)}</p>
          <p>Link: <a href={row.url}>{row.url}</a></p>
          <p>Added by: {row.addedBy}</p>
          <p>Rating: {row.rating}</p>
          <p>Gold Stars: {(row.golds || "0")}</p>
          {(this.props.loggedIn) && 
            <JobListDropdown 
              handleResourceSelect={this.handleResourceSelect}
              jobs={this.props.jobs}
              saveResourceJob={this.props.saveResourceJob}
            />
          }
          {(this.props.saveResourceJob) && <div>{this.props.saveResourceJob}</div>}
        </div>
        <p className="description">{row.description}</p>
      </div>
    )
  }
}
module.exports = ResourceModal;