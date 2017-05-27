import React, { Component } from 'react';
const ResourceRow = require('./ResourceRow');

/*
TODO:
when clicked on th, sorts respective column
when clicked on td, opens modal with more information about respective resource
  -could give the option to add resource to specific job from job list? (as a button in the modal)
*/

class Resources extends Component {
  /*constructor(props){
    super(props);
  }*/
  render() {
    //  dummy data, delete to test fetching
    const resources = [{"image":"https://www.sololearn.com/Icons/Courses/1024.png","name": "name1", "date":"01/dd/yy", "rating":"1/5", "golds": "1"},
                    {"image":"https://www.sololearn.com/Icons/Courses/1024.png", "name": "name2", "date":"02/dd/yy", "rating":"2/5", "golds": "2"},
                    {"image":"https://www.sololearn.com/Icons/Courses/1024.png", "name": "name3", "date":"03/dd/yy", "rating":"3/5", "golds": "3"}];
    return (
      <div className="resources-container">
      {/*{this.props.resources.map((row, i) => <ResourceRow key={i} index={i} />)}*/}
      <table>
        <tbody>
          <tr>
            <th colSpan="2">Resource Name</th>
            <th>Date Added</th>
            <th>Rating</th>
            <th>Gold Stars</th>
          </tr>
          {resources.map((row, i) => <ResourceRow row={row} key={i} />)}
        </tbody>
      </table>
      </div>
    );
  }
}

module.exports = Resources;