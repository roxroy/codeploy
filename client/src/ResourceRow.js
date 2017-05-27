import React, { Component } from 'react';

class ResourceRow extends Component {
  render() {
    let row = this.props.row;
    return (
      <tr>
        {/*<ResourceModal />*/}
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