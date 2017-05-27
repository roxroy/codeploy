import React, { Component } from 'react';
const EachJob = require('./EachJob');

class MyJobs extends Component {
  render() {
    return (
      <div>
        {this.props.jobs.map((row, i) => <EachJob key={i} index={i} />)}
      </div>
    );
  }
}

module.exports = MyJobs;