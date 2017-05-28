import React, { Component } from 'react';

//"jobposition": "position1", "companyname": "name1", "dateApplied":"01/dd/yy"
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