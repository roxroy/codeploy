import React, { Component } from 'react';
import './App.css';
const Navbar = require('./Navbar');
const SortButton = require('./SortButton');
const Resources = require('./Resources');
const MyJobs = require('./MyJobs');

class App extends Component {
  constructor(props) {
    super(props);

    this.allResources = [];

    this.state = {
      fetching: true,
      viewingJobs: false,
      resources: null,
      loggedIn: false,
      username: null,
      jobs: null,
      currentSort: ["resourceName", true],
      resetSearch: false
    };
    this.viewJobs = this.viewJobs.bind(this);
    this.viewResources = this.viewResources.bind(this);
    this.logOut = this.logOut.bind(this);
    this.isAuth = this.isAuth.bind(this);
    this.sortResources = this.sortResources.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.saveResource = this.saveResource.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }

  getJobs() {
    fetch('/api/jobs')
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
        console.log('isAuth', json);
        this.setState({
          fetching: false,
          username: json.username,
          loggedIn: true,
        });
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
        this.setState({
          fetching: false
        });
      }).catch(e => {
        console.log("SaveJobOnServer error", e);
      });
  }

  SaveResourceOnServer(resource) {
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
        this.setState({
          fetching: false
        });
      }).catch(e => {
        console.log("SaveResourceOnServer error", e);
      });
  }

  componentDidMount() {
    this.isAuth();
    this.getJobs();
    this.getResources();
  }

  viewJobs() {
    this.setState({
      viewingJobs: true
    });
  }

  viewResources() {
    this.setState({
      viewingJobs: false,
      resetSearch: false,
      resources: this.allResources
    });
  }

  logOut() {
    fetch('/logout', { method: 'GET', credentials: 'include' })
      .then(json => {
        this.setState({
          loggedIn: false
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

  handleSearch(value) {
    let searchedArray = [];
    let re = value;
    re = new RegExp(re, "im");

    if (!this.allResources) return;
    for (let cObj of this.allResources) {
      if (re.test(cObj.name) || re.test(cObj.addedBy) || re.test(cObj.description)) searchedArray.push(cObj);
    }
    if (searchedArray.length === 0) {
      console.log("No results found: ", searchedArray);
    } else {
      console.log("Found: ", searchedArray);
    }

    this.setState({
      viewingJobs: false,
      resetSearch: true,
      resources: searchedArray
    });
  }

  saveResource(resource) {
    console.log("inside saveresource");
    var updateresources = this.allResources,
      newResource = resource,
      today = new Date();

    newResource.dateAdded = `${today.getMonth()+1}/${today.getDate()}/${today.getFullYear()}`
    this.SaveResourceOnServer(newResource);
    updateresources.push(newResource);

    this.setState({ resources: updateresources })
  }

  saveJob(job) {
    console.log("inside saveJob";
    let updatejobs = this.state.jobs;
    let newJob = job;
    this.SaveJobOnServer(newJob);
    updatejobs.push(newJob);
    this.setState({ jobs: updatejobs });
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
  render() {
    const isViewingJobs = this.state.viewingJobs;
    if (Array.isArray(this.state.resources)) {
      return (
        <div className="App">
          <Navbar
            handleSearch={this.handleSearch}
            loggedIn={this.state.loggedIn}
            viewJobs={this.viewJobs}
            viewResources={this.viewResources}
            logOut={this.logOut}
            saveResource={this.saveResource}
          />
          {isViewingJobs ? (
            <div>
              <p className="App-intro">
                {this.state.fetching
                  ? 'Fetching message from API'
                  : /*this.state.resources*/"Fetching Success: " + this.state.username}
              </p>
              <MyJobs jobs={this.state.jobs} saveJob={this.saveJob} />
            </div>
          ) : (
              <div>
                <p className="App-intro">
                  {this.state.fetching
                    ? 'Fetching message from API'
                    : /*this.state.resources*/"Fetching Success: " + this.state.username}
                </p>
                <SortButton
                  sortResources={this.sortResources}
                  viewResources={this.viewResources}
                  showAllButton={this.state.resetSearch}
                  resources={this.state.resources}
                />
                <Resources
                  resources={this.state.resources}
                  sortByDate={this.state.sortByDate}
                  handleSort={this.handleSort}
                  currentSort={this.state.currentSort}
                />
              </div>
            )
          }
        </div>
      );
    } else {
      return null;
    }
  }
}

module.exports = App;

