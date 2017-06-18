import React, { Component } from 'react';
import utils from './utils';

class EachJob extends Component {
  constructor(props){
    super(props)

    this.handleClick = this.handleClick.bind(this);
    this.delete = this.delete.bind(this);
  }
  handleClick(){
    this.props.handleViewJob(this.props.row);
    return;
  }
  delete(){
    console.log("delete job");
    let row = this.props.row;
    this.props.deleteJob(row);
  }
  render() {
    let row = this.props.row;
    return (
      <tr>
        <td>{row.jobPosition}</td>
        <td>{row.companyName}</td>
        <td>{utils.formattedDate(row.dateApplied)}</td>
        {row.resources.length > 0?
          <td><a onClick={this.handleClick}>View Resources</a></td>
          :
          <td className="small">No resources added yet.</td>
        }
        <td>{row.comments}</td>
        <td>
          <i onClick={this.delete} className="fa fa-trash-o" aria-hidden="true"></i>
        </td>
      </tr>
    );
  }
}

module.exports = EachJob;