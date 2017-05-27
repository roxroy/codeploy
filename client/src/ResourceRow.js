import React, { Component } from 'react';

class ResourceRow extends Component {
  render() {
    return (
      <tr>
        {/*<ResourceModal />*/}
        <td style={{"text-align": "center"}}><img src={this.props.row.image} alt="resource-icon"/></td>
        <td>{this.props.row.name}</td>
        <td>{this.props.row.date}</td>
        <td>{this.props.row.rating}</td>
        <td>{this.props.row.golds}</td>
      </tr>
    );
  }
}

module.exports = ResourceRow;