import React, { Component } from 'react';

class EachJob extends Component {
  render() {
    let row = this.props.row;

    return (
      <tr>
        <td>{row.jobPosition}</td>
        <td>{row.companyName}</td>
        <td>{row.dateApplied}</td>
      </tr>
    );
  }
}

module.exports = EachJob;