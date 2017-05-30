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
      <tr onClick={this.handleClick}>
        <td><img src={row.image} alt="resource-icon"/></td>
        <td>{row.name}</td>
        <td>{row.date}</td>
        <td>{row.rating}</td>
        <td>{row.golds}</td>
      </tr>
    );
  }
}

module.exports = ResourceRow;