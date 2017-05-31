import React, { Component } from 'react';

class EachJob extends Component {
  constructor(props){
    super(props)

    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(){
    this.props.handleViewJob(this.props.row);
    return;
  }
  render() {
    let row = this.props.row;

    return (
      <tr onClick={this.handleClick}>
        <td>{row.jobPosition}</td>
        <td>{row.companyName}</td>
        <td>{row.dateApplied}</td>
        <td><a onClick={this.handleClick}>View Resources</a></td>
        <td>{row.comments}</td>
      </tr>
    );
  }
}

module.exports = EachJob;