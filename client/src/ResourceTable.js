import React from 'react';
const ResourceRow = require('./ResourceRow');

function ResourceTable(props) {
  return (
    <div className="resource-table">
      <table>
        <tbody>
          <tr>
            <th onClick={props.handleSort} colSpan="2">Resource Name</th>
            <th onClick={props.handleSort}>Date Added</th>
            <th onClick={props.handleSort}>Rating</th>
            <th onClick={props.handleSort}>Gold Stars</th>
            {(props.fromJobModal)?<th>Link to Resource</th>:<th>Additional Information</th>}
          </tr>
          {props.resources.map((row, i) => <ResourceRow
            handleResourceModal={props.handleResourceModal}
            fromJobModal={props.fromJobModal}
            row={row}
            key={i}
          />)}
        </tbody>
      </table>
    </div>
  )
}

module.exports = ResourceTable;