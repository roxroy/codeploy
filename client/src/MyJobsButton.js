import React, { Component } from 'react';

class MyJobsButton extends Component {
  constructor(props) {
    super(props);
      this.viewJobs = this.viewJobs.bind(this);
  }

  viewJobs() {
    this.props.closeResourceModal();
    this.props.viewJobs();
  }

  render(){
    return(
    <div>
      <button className="modal-button" onClick={this.viewJobs}>My Jobs</button>
    </div>
    );
  }
}

module.exports = MyJobsButton;