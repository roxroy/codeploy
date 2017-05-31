import React, { Component } from 'react';
const EachJob = require('./EachJob');
const JobModal = require('./JobModal');

/*
TODO:
when clicked on th, sorts respective column
when clicked on td, opens modal with job info and a list of related resources
*/

class MyJobs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      viewingJob: false,
      viewingJobResources: false,
      currentJob: null
    };

    this.handleViewJob = this.handleViewJob.bind(this);
    this.handleViewResources = this.handleViewResources.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }
  handleViewJob(cJob) {
    let currentJobResources = 
    this.setState({
      viewingJob: true,
      viewingResource: false,
      currentJob: cJob
    });
  }
  handleViewResources() {
    this.setState({
      viewingJob: false,
      viewingResource: true
    });
  }
  handleCloseModal() {
    this.setState({
      viewingJob: false,
      viewingJobResources: false
    });
  }
  render() {
    return (
      <div className="job-list-container">
        <table>
          <tbody>
            <tr>
              <th>Job Position</th>
              <th>Company Name</th>
              <th>Date Applied</th>
              <th>Relevant Resources</th>
              <th>Comments</th>
            </tr>
            {this.props.jobs.map((row, i) =>
              <EachJob
                row={row}
                key={i}
                handleViewJob={this.handleViewJob}
              />
            )}
          </tbody>
        </table>
        {/*Modal that renders a list of resources for the respective job*/}
        {this.state.viewingJob && <JobModal
          handleCloseModal={this.handleCloseModal}
          viewingJob={this.state.viewingJob}
          job={this.state.currentJob}
        />}
      </div>
    );
  }
}

module.exports = MyJobs;