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
      loggedIn: false,
      username: null,
      // Dummy data, change it to null when you want to test fetching!
      jobs: [{"jobPosition": "position1", "companyName": "name1", "dateApplied":"01/dd/yy"},
        {"jobPosition": "position2", "companyName": "name2", "dateApplied":"02/dd/yy"},
        {"jobPosition": "position3", "companyName": "name3", "dateApplied":"03/dd/yy"}]
    };
    this.viewJobs = this.viewJobs.bind(this);
    this.viewResources = this.viewResources.bind(this);
    this.logOut = this.logOut.bind(this);
    this.isAuth = this.isAuth.bind(this);
  }

  isAuth() {
    fetch('/isauth', { method: 'GET', credentials: 'include'})
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
    fetch('/logout', { method: 'GET', credentials: 'include'})
      .then(json => {
        this.setState({
          loggedIn: false
        });
      })    
  }

  render() {
    const isViewingJobs = this.state.viewingJobs;
    return (
      <div className="App">
        <Navbar loggedIn={this.state.loggedIn} viewJobs={this.viewJobs} viewResources={this.viewResources} logOut={this.logOut} />
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
            <SortButton resources={this.state.resources} />
            <Resources resources={this.state.resources} />
            </div>
          )
        }
        <div>
        <a href="/github">Use Github </a> 
        <button onClick={this.logOut}>logout</button>
        <span>logged in state: {this.state.loggedIn ? " In " : " Out "}</span>
        </div>
      </div>
    );
  }
}
      
module.exports = App;
