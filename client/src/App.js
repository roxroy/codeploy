import React, { Component } from 'react';
import './App.css';
const Navbar = require('./Navbar');
const SortButton = require('./SortButton');
const Resources = require('./Resources');
const MyJobs = require('./MyJobs');

class App extends Component {
  constructor(props) {
    super(props);

    // TODO: dummy data, delete loremipsum and this.resources to test fetching
    let loremipsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed gravida est sit amet mi egestas, a pharetra sem hendrerit. Ut sit amet lacinia ex, vel pellentesque metus. In placerat, lacus eget porttitor imperdiet, sem nibh faucibus turpis, ultricies ultricies turpis orci in augue. Integer ut posuere ante. Pellentesque blandit purus at tortor malesuada porttitor venenatis sed lacus.";
    this.resources = [{ "image": "https://www.sololearn.com/Icons/Courses/1024.png", "language":"Javascript", "url": "https://www.website1.com/", "addedBy": "user1", "name": "abcd", "date": "01/03/2016", "rating": "1/5", "golds": "1", "description": loremipsum },
    { "image": "https://image.flaticon.com/teams/new/1-freepik.jpg", "language":"C#", "url": "https://www.website2.com/", "addedBy": "user2", "name": "aaab", "date": "02/14/2017", "rating": "2/5", "golds": "2", "description": loremipsum },
    { "image": "http://www.freeiconspng.com/uploads/flat-mac-icon-15.png", "language":"Python", "url": "https://www.website3.com/", "addedBy": "user3", "name": "name3", "date": "01/01/2017", "rating": "3/5", "golds": "3", "description": loremipsum }];

    this.allResources;

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

  SaveResourceOnServer(resource) {
    const body = JSON.stringify(resource);
    fetch('/api/resources', {
      method: 'POST', credentials: 'include',
      body: body,
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        return response.json();
      })
      .then(json => {
      }).catch(e => {
        console.log("SaveResourceOnServer error", e);
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
        // todo: delete bottom function call, when fetching is implemented
        this.setState({
          resources: this.resources,
          fetching: false
        });
        console.log(json.message)

        this.allResources = this.state.resources;
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

    newResource.date = `${today.getMonth()+1}/${today.getDate()}/${today.getFullYear()}`
    this.SaveResourceOnServer(newResource);
    updateresources.push(newResource);

    this.setState({ resources: updateresources })
  }
  saveJob(job) {
    console.log("inside savejob");
    let updatejobs = this.state.jobs;
    let newJob = job;
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
                  : /*this.state.resources*/"Fetching Success"}
              </p>
              <MyJobs jobs={this.state.jobs} saveJob={this.saveJob} />
            </div>
          ) : (
              <div>
                <p className="App-intro">
                  {this.state.fetching
                    ? 'Fetching message from API'
                    : /*this.state.resources*/"Fetching Success"}
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

