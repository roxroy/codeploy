import React, { Component } from 'react';

class About extends Component {
  render() {
    return (
      <div className="about-container">
        <div className="about">
          <h1>About</h1>
          <p>Log in with GitHub and start utilizing a list of web development job-ready resources! Users are able to contribute by adding, rating and/or reviewing resources.
          Keep track (privately) of web development jobs you've applied to, and the resources you've used to aid you in the application process; no one can see your personal list of tracked jobs!
          If any resources aid someone in getting the job, they're given Gold Star status. 
          You have the ability to add a list of resources to each job in your list, making you able to get job ready as efficiently as possible!
          </p>
        </div>
        <footer>
          <h2>Website Creators</h2>
          <div className="contributors-container">
            <div className="contributor">
              <a href="https://github.com/roxroy">
              <img src="https://avatars3.githubusercontent.com/u/20972782?v=3&s=460" alt="roxroy-picture" />
              <p className="git-tag">@roxroy</p>
              </a>
            </div>
            <div className="contributor">
              <a href="https://github.com/icartusacrimea">
              <img src="https://avatars1.githubusercontent.com/u/15716130?v=3&s=460" alt="icartusacrimea-picture" />
              <p className="git-tag">@icartusacrimea</p>
              </a>
            </div>
            <div className="contributor">
              <a href="https://github.com/CClar">
              <img src="https://avatars3.githubusercontent.com/u/26611690?v=3&s=460" alt="CClar-picture" />
              <p className="git-tag">@CClar</p>
              </a>
            </div>
          </div>
        </footer>
      </div>
    )
  }
}

module.exports = About;