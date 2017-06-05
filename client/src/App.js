import React, { Component } from 'react';
import './App.css';
const Navbar = require('./Navbar');
const SortButton = require('./SortButton');
const Resources = require('./Resources');
const MyJobs = require('./MyJobs');
// todo: style search clear button
class App extends Component {
  constructor(props) {
    super(props);

    // TODO: dummy data, delete to test fetching
    let loremipsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed gravida est sit amet mi egestas, a pharetra sem hendrerit. Ut sit amet lacinia ex, vel pellentesque metus. In placerat, lacus eget porttitor imperdiet, sem nibh faucibus turpis, ultricies ultricies turpis orci in augue. Integer ut posuere ante. Pellentesque blandit purus at tortor malesuada porttitor venenatis sed lacus.";
    this.resources = [{ "image": "https://www.sololearn.com/Icons/Courses/1024.png", "url": "https://www.website1.com/", "addedBy": "user1", "name": "abcd", "date": "01/03/2016", "rating": "1/5", "golds": "1", "description": loremipsum },
    { "image": "https://image.flaticon.com/teams/new/1-freepik.jpg", "url": "https://www.website2.com/", "addedBy": "user2", "name": "aaab", "date": "02/14/2017", "rating": "2/5", "golds": "2", "description": loremipsum },
    { "image": "http://www.freeiconspng.com/uploads/flat-mac-icon-15.png", "url": "https://www.website3.com/", "addedBy": "user3", "name": "name3", "date": "01/01/2017", "rating": "3/5", "golds": "3", "description": loremipsum }];

    // TODO: move to assign after fetch
    this.globalResources = this.resources;

    this.state = {
      fetching: true,
      viewingJobs: false,
      resources: null,
      loggedIn: false,
      username: null,
      jobs: null,
      "currentSort": ["Resource Name", true]
    };
    this.viewJobs = this.viewJobs.bind(this);
    this.viewResources = this.viewResources.bind(this);
    this.logOut = this.logOut.bind(this);
    this.isAuth = this.isAuth.bind(this);
    this.sortResources = this.sortResources.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
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
    // todo: change when fetching resources is implemented
    // change variable assign to state.resource assign
    this.resources = this.globalResources;
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
    if (sortStatus) {
      this.setState({
        currentSort: ["Date Added", true]
      });
    } else {
      this.setState({
        currentSort: ["Resource Name", true]
      });
    }
  }
  handleSearch(value) {
    // TODO
    //  on search replaces this.state.resources with the searched array
    let searchedArray = [];
    let re = value;
    re = new RegExp(re, "im");

    if (!this.globalResources) return;
    for (let cObj of this.globalResources) {
      if (re.test(cObj.name) || re.test(cObj.addedBy) || re.test(cObj.description)) searchedArray.push(cObj);
    }
    if (searchedArray.length === 0) {
      console.log("No results found: ", searchedArray);
    } else {
      console.log("Found: ", searchedArray);
    }

    // todo: change when fetching resources is implemented
    // change variable assign to state.resource assign
    this.resources = searchedArray;
    this.setState({
      viewingJobs: false
    });
  }
  handleSort(event) {
    // order: true==ascending, false==descending
    const cTH = event.target.textContent;
    let order = this.state.currentSort[1];
    
    // if current column is being sorted
    if (cTH === this.state.currentSort[0]) {
      order = !order;
    } else {
      order = true;
    };

    this.setState({
      currentSort: [cTH, order]
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
              <SortButton
                sortResources={this.sortResources}
                viewResources={this.viewResources}
                globalResources={this.globalResources}
                // change this.resources to this.state.resource when fetching is implemented 
                resources={this.resources}
              />
              <Resources
                currentSort={this.state.currentSort}
                resources={this.resources}
                sortByDate={this.state.sortByDate}
                handleSort={this.handleSort}
              />
            </div>
          )
        }
      </div>
    );
  }
}

module.exports = App;

