import React, { Component } from 'react';
const ResourceRow = require('./ResourceRow');

class Resources extends React.Component {
  /*constructor(props){
    super(props);
  }*/
  render() {
    return (
      <div>
      {/*this.props.resources.map((row, i) => <ResourceRow key={i} index={i} />)*/}
      <ResourceRow />
      <p>Resource</p>
      <p>Resource</p>
      <p>Resource</p>
      <p>Resource</p>
      </div>
    );
  }
}

module.exports = Resources;