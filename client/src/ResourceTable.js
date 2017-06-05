import React from 'react';
const ResourceRow = require('./ResourceRow');

function ResourceTable(props) {

  let arrowD = props.currentSort[1] ?
    <i className="fa fa-arrow-up" aria-hidden="true"></i> :
    <i className="fa fa-arrow-down" aria-hidden="true"></i>;
    
  return (
    <div className="resource-table">
      <table>
        <tbody>
          <tr>
            <th className="resourceName" onClick={props.handleSort} colSpan="2">
              {"Resource Name "}
              {(props.currentSort[0] === "resourceName") && arrowD}
            </th>
            <th className="dateAdded" onClick={props.handleSort}>
              {"Date Added "}
              {(props.currentSort[0] === "dateAdded") && arrowD}
            </th>
            <th className="rating" onClick={props.handleSort}>
              {"Rating "}
              {(props.currentSort[0] === "rating") && arrowD}
            </th>
            <th className="golds" onClick={props.handleSort}>
              {"Gold Stars "}
              {(props.currentSort[0] === "golds") && arrowD}
            </th>
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