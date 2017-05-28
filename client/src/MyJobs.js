import React, { Component } from 'react';
const EachJob = require('./EachJob');

/*
TODO:
when clicked on th, sorts respective column
when clicked on td, opens modal with job info and a list of related resources
*/

class MyJobs extends Component {
  render() {
    return (
      <div className="job-list-container">
        <table>
          <tbody>
            <tr>
              <th>Job Position</th>
              <th>Company Name</th>
              <th>Date Applied</th>
            </tr>
            {this.props.jobs.map((row, i) => <EachJob row={row} key={i} />)}
          </tbody>
        </table>
      </div>
    );
  }
}

module.exports = MyJobs;