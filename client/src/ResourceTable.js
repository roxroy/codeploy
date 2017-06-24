import React from 'react';
const ResourceRow = require('./ResourceRow');

function ResourceTable(props) {
  
  return (
    <div className="resource-table">
      <table>
        <tbody>
          <tr>
            <th id="resourceName" onClick={props.handleSort} colSpan="2">
              {"Resource Name "}
              {(props.currentSort[0] === "resourceName") && (
                props.currentSort[1] ?
                  <i id="resourceName" className="fa fa-arrow-up" aria-hidden="true"></i> :
                  <i id="resourceName" className="fa fa-arrow-down" aria-hidden="true"></i>
              )}
            </th>
            <th id="addedBy" onClick={props.handleSort}>
              {"Added By"}
              {(props.currentSort[0] === "addedBy") && (
                props.currentSort[1] ?
                  <i id="addedBy" className="fa fa-arrow-up" aria-hidden="true"></i> :
                  <i id="addedBy" className="fa fa-arrow-down" aria-hidden="true"></i>
              )}
            </th>
            <th id="dateAdded" onClick={props.handleSort}>
              {"Date Added "}
              {(props.currentSort[0] === "dateAdded") && (
                props.currentSort[1] ?
                  <i id="dateAdded" className="fa fa-arrow-up" aria-hidden="true"></i> :
                  <i id="dateAdded" className="fa fa-arrow-down" aria-hidden="true"></i>
              )}
            </th>
            <th id="rating" onClick={props.handleSort}>
              {"Rating "}
              {(props.currentSort[0] === "rating") && (
                props.currentSort[1] ?
                  <i id="rating" className="fa fa-arrow-up" aria-hidden="true"></i> :
                  <i id="rating" className="fa fa-arrow-down" aria-hidden="true"></i>
              )}
            </th>
            <th id="golds" onClick={props.handleSort}>
              {"Gold Stars "}
              {(props.currentSort[0] === "golds") && (
                props.currentSort[1] ?
                  <i id="golds" className="fa fa-arrow-up" aria-hidden="true"></i> :
                  <i id="golds" className="fa fa-arrow-down" aria-hidden="true"></i>
              )}
            </th>
            {(props.fromJobModal) ? <th className="last-resources-th">Link to Resource</th> : <th className="last-resources-th">Additional Information</th>}
            <th className="delete-heading"></th>
          </tr>
          {props.resources.map((row, i) => <ResourceRow
            handleResourceModal={props.handleResourceModal}
            fromJobModal={props.fromJobModal}
            loggedIn={props.loggedIn}
            username={props.username}
            deleteResource={props.deleteResource}
            row={row}
            key={i}
          />)}
        </tbody>
      </table>
    </div>
  )
}

module.exports = ResourceTable;