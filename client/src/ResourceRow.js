import React, { Component } from 'react';
import utils from './utils';

class ResourceRow extends Component {
  constructor(props){
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.delete = this.delete.bind(this);
  }    
  handleClick(){
    this.props.handleResourceModal(this.props.row);
    //return;
  }
  delete(){
    let row = this.props.row;
    this.props.deleteResource(row);
  }
  render() {
    let row = this.props.row;

    return (
      <tr className="resource-row">
        <td><img src={row.image} alt="resource-icon"/></td>
        <td>{row.name}</td>
        <td>{row.addedBy}</td>
        <td>{utils.formattedDate(row.dateAdded)}</td>
        <td>{row.rating}</td>
        <td>{(row.golds || "0")}</td>
        {(this.props.fromJobModal)?
          <td><a href={row.url}>Visit {row.name}</a></td>
          :
          <td><a onClick={this.handleClick}>View More Information</a></td>
        }
        {(this.props.loggedIn && row.addedBy === this.props.username)?
          <td>
            <i onClick={this.delete} className="fa fa-trash-o" aria-hidden="true"></i>
          </td>
          :
          <td></td>
        }
      </tr>
    );
  }
}

module.exports = ResourceRow;