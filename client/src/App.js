import React, { Component } from 'react';
import './App.css';
import Modal from 'react-modal';
const Navbar = require('./Navbar');
const SortButton = require('./SortButton');
const Resources = require('./Resources');
const ResourceRow = require('./ResourceRow');
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
      jobs: ["job1", "job2", "job3"]
    };
    this.viewJobs = this.viewJobs.bind(this);
    this.viewResources = this.viewResources.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  componentDidMount() {
    fetch('/api')
      .then(response => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.json();
      })
      .then(json => {
        console.log(json.message);
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
    this.setState({
        loggedIn: false
    });
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
      </div>
    );
  }
}
      
/*class ResourceModal extends React.Component {
  render() {
    return (
    <div>
      
    </div>
    );
  }
}*/


module.exports = App;