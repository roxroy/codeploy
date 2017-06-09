import React, { Component } from 'react';

class ResourceRow extends Component {
  constructor(props){
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }    
  handleClick(){
    this.props.handleResourceModal(this.props.row);
    return;
  }
  render() {
    let row = this.props.row;

    return (
      <tr>
        <td><img src={row.image} alt="resource-icon"/></td>
        <td>{row.name}</td>
        <td>{row.language}</td>
        <td>{row.date}</td>
        <td>{row.rating}</td>
        <td>{row.golds}</td>
        {(this.props.fromJobModal)?
          <td><a href={row.url}>Visit {row.name}</a></td>
          :
          <td><a onClick={this.handleClick}>View More Information</a></td>
        }
      </tr>
    );
  }
}

module.exports = ResourceRow;