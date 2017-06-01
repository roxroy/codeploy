import React, { Component } from 'react';
import './App.css';
const Navbar = require('./Navbar');
const SortButton = require('./SortButton');
const Resources = require('./Resources');
const MyJobs = require('./MyJobs');

// dummy data, delete to test fetching
const resources = [{ "image": "https://www.sololearn.com/Icons/Courses/1024.png", "url": "https://www.website1.com/", "addedBy": "user1", "name": "abcd", "date": "01/03/2016", "rating": "1/5", "golds": "1" },
{ "image": "https://www.sololearn.com/Icons/Courses/1024.png", "url": "https://www.website2.com/", "addedBy": "user2", "name": "aaab", "date": "02/14/2017", "rating": "2/5", "golds": "2" },
{ "image": "https://www.sololearn.com/Icons/Courses/1024.png", "url": "https://www.website3.com/", "addedBy": "user3", "name": "name3", "date": "01/01/2017", "rating": "3/5", "golds": "3" }];
const jobs = [{ "jobPosition": "position1", "companyName": "name1", "dateApplied": "01/dd/yy", "resources": resources, "comments": "sent thank you note. received no response." },
{ "jobPosition": "position2", "companyName": "name2", "dateApplied": "02/dd/yy", "resources": resources, "comments": "sent thank you note. received no response." },
{ "jobPosition": "position3", "companyName": "name3", "dateApplied": "03/dd/yy", "resources": resources, "comments": "sent thank you note. received no response." }]

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
      // Dummy data, change it to null when you want to test fetching!
      jobs: jobs
    };
    this.viewJobs = this.viewJobs.bind(this);
    this.viewResources = this.viewResources.bind(this);
    this.logOut = this.logOut.bind(this);
    this.isAuth = this.isAuth.bind(this);
    this.sortResources = this.sortResources.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
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
          loggedIn: true
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
  handleSearch() {
    // TODO
    //  on search replaces this.state.resources with array of objects that pass regex
    console.log('do search');
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
        <div>
          <a href="/github">Use Github </a>
          <button onClick={this.logOut}>logout</button>
          <span>logged in state: {this.state.loggedIn ? "true" : "false"}</span>
        </div>
      </div>
    );
  }
}

module.exports = App;
