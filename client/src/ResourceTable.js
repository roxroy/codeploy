import React from 'react';
const ResourceRow = require('./ResourceRow');

function ResourceTable(props) {

  let arrowD = props.currentSort[1] ?
    <i className="fa fa-arrow-up" aria-hidden="true"></i> :
    <i className="fa fa-arrow-up" aria-hidden="true"></i>;

  return (
    <div className="resource-table">
      <table>
        <tbody>
          <tr>
            <th className="resourceName" onClick={props.handleSort} colSpan="2">
              Resource Name
              </th>
            <th className="dateAdded" onClick={props.handleSort}>Date Added</th>
            <th className="rating" onClick={props.handleSort}>Rating</th>
            <th className="golds" onClick={props.handleSort}>Gold Stars</th>
            {(props.fromJobModal) ? <th>Link to Resource</th> : <th>Additional Information</th>}
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