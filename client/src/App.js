import React, { Component } from 'react';
import './App.css';
const Navbar = require('./Navbar');
const SortButton = require('./SortButton');
const Resources = require('./Resources');
const MyJobs = require('./MyJobs');


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fetching: true,
      viewingJobs: false,
      resources: null,
      loggedIn: true,
      username: null,
      sortByDate: true,
      jobs: null,
    };
    this.viewJobs = this.viewJobs.bind(this);
    this.viewResources = this.viewResources.bind(this);
    this.logOut = this.logOut.bind(this);
    this.isAuth = this.isAuth.bind(this);
    this.sortResources = this.sortResources.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
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

  isAuth() {
    fetch('/isauth', { method: 'GET', credentials: 'include' })
      .then(response => {
        if (!response.ok) {
          throw new Error('not logged in');
        }
        return response.json();
      })
      .then(json => {
        this.setState({
          loggedIn: true
        });
      }).catch(e => {
        this.setState({
          loggedIn: false
        });
      });
  }

  componentDidMount() {
    this.isAuth();
    this.getJobs();
    fetch('/api')
      .then(response => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.json();
      })
      .then(json => {
        this.setState({
          resources: json.message,
          fetching: false
        });
      }).catch(e => {
        this.setState({
          resources: `API call failed: ${e}`,
          fetching: false
        });
      })
  }

  viewJobs() {
    this.setState({
      viewingJobs: true
    });
  }

  viewResources() {
    this.setState({
      viewingJobs: false
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
    if (sortStatus === true) {
      this.setState({
        sortByDate: true
      });
    } else if (sortStatus === false) {
      this.setState({
        sortByDate: false
      });
    }
  }
  handleSearch(value) {
    // TODO
    //  on search replaces this.state.resources with array of objects that pass regex
    //  if none found, console log and show search not found
    let searchedArray = [];
    let re = value;
    re = new RegExp(re, "im");

    if (!resources) return;
    for (let cObj of resources) {
      if (re.test(cObj.name) || re.test(cObj.addedBy) || re.test(cObj.description)) searchedArray.push(cObj);
    }
    console.log("searchedArray: ", searchedArray);
    this.setState({
      viewingJobs: false
    });
  }
  render() {
    const isViewingJobs = this.state.viewingJobs;
    return (
      <div className="App">
        <Navbar
          handleSearch={this.handleSearch}
          loggedIn={this.state.loggedIn}
          viewJobs={this.viewJobs}
          viewResources={this.viewResources}
          logOut={this.logOut}
        />
        {isViewingJobs ? (
          <div>
            <p className="App-intro">
              {this.state.fetching
                ? 'Fetching message from API'
                : this.state.resources}
            </p>
            <MyJobs jobs={this.state.jobs} />
          </div>
        ) : (
            <div>
              <p className="App-intro">
                {this.state.fetching
                  ? 'Fetching message from API'
                  : this.state.resources}
              </p>
              <SortButton sortResources={this.sortResources} />
              <Resources resources={this.state.resources} sortByDate={this.state.sortByDate} />
            </div>
          )
        }
      </div>
    );
  }
}

module.exports = App;

