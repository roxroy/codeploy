import React from "react";

class JobListDropdown extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      currentJob: "default"
    }
    this.handleSelectedJob = this.handleSelectedJob.bind(this);
  }
  handleSelectedJob(){
    // todo: ideally this would use ID
    if (this.state.currentJob === "default") return;
    this.props.handleResourceSelect(this.state.currentJob);
  }
  render(){
    return (
      <div className="job-list-dropdown">
        <select onChange={event => this.setState({ currentJob: event.target.value })} name="jobList" id="jobList">
          <option value="default">Your Job Positions</option>
          {
            this.props.jobs.map((job)=>{
              return <option value={job.ID} key={job.ID}>{job.jobPosition}</option>
            })
          }
        </select>
        <button onClick={this.handleSelectedJob}>{"Add Resource to Job"}</button>
      </div>
    )
  }
}
module.exports = JobListDropdown;