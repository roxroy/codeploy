import React, { Component } from 'react';
import './App.css';
const Navbar = require('./Navbar');
const SortButton = require('./SortButton');
const Resources = require('./Resources');
const MyJobs = require('./MyJobs');
const About = require("./About");

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fetching: true,
      viewing: "Resources",
      resources: [],
      loggedIn: false,
      username: null,
      jobs: [],
      currentSort: ["resourceName", true],
      resetSearch: false,
      saveResourceJob: ""
    };

    this.viewJobs = this.viewJobs.bind(this);
    this.viewResources = this.viewResources.bind(this);
    this.logOut = this.logOut.bind(this);
    this.isAuth = this.isAuth.bind(this);
    this.getJobs = this.getJobs.bind(this);
    this.getResources = this.getResources.bind(this);
    this.sortResources = this.sortResources.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.saveResource = this.saveResource.bind(this);
    this.saveJob = this.saveJob.bind(this);
    this.saveResourceOnServer = this.saveResourceOnServer.bind(this);
    this.SaveJobOnServer = this.SaveJobOnServer.bind(this);
    this.deleteResource = this.deleteResource.bind(this);
    this.deleteResourceOnServer = this.deleteResourceOnServer.bind(this);
    this.addResourceToJob = this.addResourceToJob.bind(this);
    this.deleteJob = this.deleteJob.bind(this);
    this.deleteJobOnServer = this.deleteJobOnServer.bind(this);
    this.getJobResources = this.getJobResources.bind(this);
    this.findResourceFromList = this.findResourceFromList.bind(this);
    this.viewAbout = this.viewAbout.bind(this);
  }

  getJobs() {
    fetch('/api/jobs', { method: 'GET', credentials: 'include' })
      .then(response => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.json();
      })
      .then(json => {
        this.setState({
          jobs: json,
        });
        this.getJobResources();
      }).catch(e => {
      })
  }

  getResources() {
    fetch('/api/resources')
      .then(response => {
        return response.json();
      })
      .then(json => {
        this.setState({
          resources: json,
        });
      }).catch(e => {
      })
  }

  isAuth() {
    fetch('/isauth', { method: 'GET', credentials: 'include' })
      .then(response => {
        this.setState({
          fetching: true
        });

        if (!response.ok) {
          throw new Error('not logged in');
        }
        return response.json();
      })
      .then(json => {
        this.setState({
          fetching: false,
          username: json.username,
          loggedIn: true,
        });
        this.getJobs()
      }).catch(e => {
        this.setState({
          username: null,
          loggedIn: false,
          fetching: false,
        });
      });
  }

  SaveJobOnServer(job) {
    const body = JSON.stringify(job);
    fetch('/api/jobs', {
      method: 'POST', credentials: 'include',
      body: body,
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        this.setState({
          fetching: true
        });
        return response.json();
      })
      .then(json => {
        console.log("SaveJobOnServer", json);
        job.ID = json.ID;
        let updatejobs = this.state.jobs;
        updatejobs.push(job);
        this.setState({
          fetching: false,
          jobs: updatejobs,
        });
      }).catch(e => {
        console.log("SaveJobOnServer error", e);
      });
  }

  saveResourceOnServer(resource) {
    const body = JSON.stringify(resource);
    fetch('/api/resources', {
      method: 'POST', credentials: 'include',
      body: body,
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        this.setState({
          fetching: true
        });
        return response.json();
      })
      .then(json => {
        resource.ID = json.ID;
        this.setState({
          fetching: false
        });
      }).catch(e => {
        console.log("saveResourceOnServer error", e);
      });
  }

  deleteResourceOnServer(resource) {
    fetch('/api/resources/' + resource.ID, {
      method: 'DELETE', credentials: 'include',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        this.setState({
          fetching: true
        });
        return response.json();
      })
      .then(json => {
        this.setState({
          fetching: false
        });
      }).catch(e => {
        console.log("deleteResourceOnServer error", e);
      });
  }

  deleteJobOnServer(job) {
    fetch('/api/jobs/' + job.ID, {
      method: 'DELETE', credentials: 'include',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        this.setState({
          fetching: true
        });
        return response.json();
      })
      .then(json => {
        this.setState({
          fetching: false
        });
      }).catch(e => {
        console.log("deleteResourceOnServer error", e);
      });
  }

  componentDidMount() {
    this.isAuth();
    this.getResources();
  }

  viewJobs() {
    this.setState({
      viewing: "Jobs"
    });
  }

  viewResources() {
    this.getResources();
    this.setState({
      viewing: "Resources",
      resetSearch: false,
      resources: this.state.resources
    });
  }

  logOut() {
    fetch('/logout', { method: 'GET', credentials: 'include' })
      .then(json => {
        this.setState({
          loggedIn: false,
          viewing: "Resources"
        });
      })
  }

  sortResources(sortStatus) {
    //if true, sort by date
    if (sortStatus) {
      this.setState({
        currentSort: ["dateAdded", true]
      });
    } else {
      this.setState({
        currentSort: ["resourceName", true]
      });
    }
  }

  handleSort(event) {
    // order: true==ascending, false==descending
    const cTH = event.target.id;
    let order;
    // if current column is being sorted
    if (cTH === this.state.currentSort[0]) {
      order = !this.state.currentSort[1];
    } else {
      order = true;
    };
    this.setState({
      currentSort: [cTH, order]
    });
  }

  handleSearch(value) {
    let searchedArray = [];
    let re = value;
    re = new RegExp(re, "im");

    if (!this.state.resources) return;
    for (let cObj of this.state.resources) {
      if (re.test(cObj.name) || re.test(cObj.addedBy) || re.test(cObj.description)) searchedArray.push(cObj);
    }
    this.setState({
      viewing: "Resources",
      resetSearch: true,
      resources: searchedArray
    });
  }

  saveResource(resource) {
    console.log("inside saveresource");
    var updateresources = this.state.resources,
      newResource = resource;
    newResource.dateAdded = new Date();

    this.saveResourceOnServer(newResource);
    updateresources.push(newResource);

    this.setState({ resources: updateresources, viewing: "Resources" })
  }

  saveJob(job) {
    console.log("inside saveJob");
    let newJob = job;
    newJob.addedBy = this.state.username;
    newJob.dateApplied = Date.parse(job.dateApplied);
    newJob.resources = [];

    this.SaveJobOnServer(newJob);
  }

  deleteJob(row) {
    //console.log("inside delete job");
    let jobsArr = this.state.jobs;
    let index = jobsArr.indexOf(row);
    jobsArr.splice(index, 1);
    this.deleteJobOnServer(row);
    this.setState({ jobs: jobsArr });
  }

  deleteResource(row) {
    let resourcesArr = this.state.resources;
    let index = resourcesArr.indexOf(row);
    resourcesArr.splice(index, 1);
    this.deleteResourceOnServer(row);
    this.setState({ resources: resourcesArr });
  }

  saveResourceToJobOnServer(jobID, resourceID) {
    const body = JSON.stringify({ jobID, resourceID });
    fetch('/api/jobs/resource', {
      method: 'POST', credentials: 'include',
      body: body,
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        this.setState({
          fetching: true
        });
        return response.json();
      })
      .then(json => {
        this.setState({
          fetching: false
        });
        // updates jobs
        this.setState({
          saveResourceJob: "Resource saved."
        });
        this.getJobs()
      }).catch(e => {
        console.log("saveResourceToJobOnServer error", e);
      });
  }

  addResourceToJob(jobSelected, resourceToAdd) {
    let currentJobArray = this.state.jobs;

    const job = currentJobArray.find(job => job.ID === jobSelected);
    console.log(job);
    const resourceFound = (job.resources) ? job.resources.find(resource => resource === resourceToAdd.ID) : false;

    if (job && !resourceFound) {
      (job.resources) ? job.resources.push(resourceToAdd) : job.resources = [resourceToAdd];
      this.saveResourceToJobOnServer(job.ID, resourceToAdd.ID);
    } else {
      this.setState({
        saveResourceJob: "Resource is already in job"
      });
    }
  }
  getJobResources() {
    let jobs = this.state.jobs;
    let resourceChecked;

    jobs.map((job) => {
      let jobResourcesArray = [];
      job.resources.map((resourceID) => {
        console.log(job, resourceID);
        resourceChecked = this.findResourceFromList(resourceID);
        if (resourceChecked) {
          jobResourcesArray.push(resourceChecked);
        }
      });
      job.resources = jobResourcesArray;
    });
    this.setState({ jobs: jobs });
  }
  findResourceFromList(id) {
    const resourcesList = this.state.resources;
    const resource = resourcesList.find((val) => {
      return val.ID == id;
    });
    return resource;
  }
  viewAbout() {
    this.setState({ viewing: "About" });
  }
  render() {
    const isViewing = this.state.viewing;

    return (
      <div className="App">
        <Navbar
          handleSearch={this.handleSearch}
          loggedIn={this.state.loggedIn}
          viewJobs={this.viewJobs}
          viewResources={this.viewResources}
          logOut={this.logOut}
          saveResource={this.saveResource}
          username={this.state.username}
          viewAbout={this.viewAbout}
        />
        {isViewing == "Jobs" && (
          <div>
            <p className="App-intro">
              {this.state.loggedIn === false
                ? ''
                : "Hello, " + this.state.username + "!"}
            </p>
            <MyJobs jobs={this.state.jobs} getJobs={this.getJobs} saveJob={this.saveJob} deleteJob={this.deleteJob} />
          </div>
        )}
        {isViewing == "Resources" && (
          <div>
            <p className="App-intro">
              {this.state.loggedIn === false
                ? ''
                : "Hello, " + this.state.username + "!"}
            </p>
            <SortButton
              sortResources={this.sortResources}
              viewResources={this.viewResources}
              showAllButton={this.state.resetSearch}
              resources={this.state.resources}
            />
            <Resources
              addResourceToJob={this.addResourceToJob}
              resources={this.state.resources}
              sortByDate={this.state.sortByDate}
              handleSort={this.handleSort}
              currentSort={this.state.currentSort}
              loggedIn={this.state.loggedIn}
              username={this.state.username}
              deleteResource={this.deleteResource}
              jobs={this.state.jobs}
              saveResourceJob={this.state.saveResourceJob}
            />
          </div>
        )
        }
        {isViewing == "About" && (
          <About />
        )}
      </div>
    );
  }
}

module.exports = App;
