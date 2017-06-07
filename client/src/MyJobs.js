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
      currentJob: null,
      currentSort: ["jobPosition", true]
    };

    this.handleViewJob = this.handleViewJob.bind(this);
    this.handleViewResources = this.handleViewResources.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleClick = this.handleClick.bind(this);
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
  handleClick(event) {
    // order: true==ascending, false==descending
    const cTH = event.target.className;
    let order;

    // if current column is being sorted
    if (cTH === this.state.currentSort[0]) {
      order = !this.state.currentSort[1];
    } else {
      order = true;
    };
    this.setState({
      currentSort: [cTH, order]
    });
  }
  render() {
    const jobSort = {
      jobPosition(jobs) {
        return jobs.sort((a, b) => {
          // return true if a.jobPosition comes after b.jobPosition
          return a.jobPosition.localeCompare(b.jobPosition);
        });
      },
      companyName(jobs) {
        return jobs.sort((a, b) => {
          // return true if a.name comes after b.name
          return a.companyName.localeCompare(b.companyName);
        });
      },
      dateApplied(jobs) {
        return jobs.sort((a, b) => {
          return new Date(b.dateApplied) - new Date(a.dateApplied);
        });
      }
    }
    let jobs = jobSort[this.state.currentSort[0]](this.props.jobs);
    if (!this.state.currentSort[1]) jobs.reverse();

    let arrowD = this.state.currentSort[1] ?
      <i className="fa fa-arrow-up" aria-hidden="true"></i> :
      <i className="fa fa-arrow-down" aria-hidden="true"></i>;
    return (
      <div className="job-list-container">
        <table>
          <tbody>
            <tr>
              <th onClick={this.handleClick} className="jobPosition">
                {"Job Position "}
                {(this.state.currentSort[0] === "jobPosition") && arrowD}
              </th>
              <th onClick={this.handleClick} className="companyName">
                {"Company Name "}
                {(this.state.currentSort[0] === "companyName") && arrowD}
              </th>
              <th onClick={this.handleClick} className="dateApplied">
                {"Date Applied "}
                {(this.state.currentSort[0] === "dateApplied") && arrowD}
              </th>
              <th>Relevant Resources</th>
              <th>Comments</th>
            </tr>
            {jobs.map((row, i) =>
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