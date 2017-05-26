import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Modal from 'react-modal';

/*
<App /> Parent
        Children:
        <Navbar />
            If user unauthenticated/not logged in:
            <Username Password Fields - Forms />
            <Sign Up Button />
              Shown if unauthenticated user clicks Sign Up button in Navbar
              <Sign Up Modal />
            If user logged in:
            <Search />
            <Collapsible Menu />
                <Add Resource />
                <Log Out />
<Sort Button />
<Resources />
    Mapped into many...
    <ResourceRow />
      <Resource Modal />
          Shown if resource opened
*/

const menuModal = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(0, 0, 0, 0.75)'
  },
  content: {
    width: '350px',
    background: '#400080',
    color: '#FFDC4C',
    top: '20%',
    left: '85%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

const centerModal = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(0, 0, 0, 0.75)'
  },
  content: {
    width: '350px',
    background: '#400080',
    color: '#FFDC4C',
    top: '45%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

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

  render() {
    const isViewingJobs = this.state.viewingJobs;
    return (
      <div className="App">
        <Navbar loggedIn={this.state.loggedIn} viewJobs={this.viewJobs} viewResources={this.viewResources} />
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
      
class Navbar extends React.Component {
  constructor (props) {
    super(props);
    
    this.state = {
      loggedIn : this.props.loggedIn
    }
  }
      render() {
          return (
            <div className="navbar">
              <div className="container-fluid">
                <Search />
                <h1 className="title">Codeploy</h1>
                <Menu loggedIn={this.props.loggedIn} viewJobs={this.props.viewJobs} viewResources={this.props.viewResources} />
              </div>
            </div>
          );
    }
}

class Search extends React.Component {
  render() {
    return (
      <a href="#" className="search-icon"><i className="fa fa-search"></i></a> 
    );
  }
}

class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false
    };

    this.openMenuModal = this.openMenuModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
  }

  openMenuModal() {
    this.setState({
      modalIsOpen: true
    });
  }

  afterOpenModal() {
    //references are now sync'd and can be accessed.
  }

  closeModal() {
    this.setState({
      modalIsOpen: false
    });
  }

  render() {
    const isLoggedIn = this.props.loggedIn;
    const openModal = this.state.modalIsOpen;
    let modal = null;

    if (isLoggedIn && openModal) {
      modal = <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={menuModal}
          contentLabel="Your options"
        >
        <button className="close" onClick={this.closeModal}>X</button>
          <div className="loggedin-buttons">
            <ResourcesButton viewResources={this.props.viewResources} />
            <MyJobsButton viewJobs={this.props.viewJobs} />
            <AddResourceButton />
            <LogOutButton loggedIn={isLoggedIn} />
          </div>
        </Modal>
    } else if (!isLoggedIn && openModal) {
      modal = <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={centerModal}
          contentLabel="Sign in"
        >
        <button className="close" onClick={this.closeModal}>X</button>
        <HandleAuth />
        </Modal>
    } else if (!openModal) {
      modal = null;
    }
    return (
      <div className="null">
      <a href="#" className="menu-icon" onClick={this.openMenuModal}><i className="fa fa-bars"></i></a>
      {modal}
      </div>
    );
  }
  
}

class HandleAuth extends React.Component {
  render() {
    return (
      <div className="auth-buttons">
        <button className="modal-button">Log in with Github</button>
        <button className="modal-button">Log in with Slack</button>
      </div>
    );
  }
}

class ResourcesButton extends React.Component {
  constructor(props) {
    super(props);
      this.viewResources = this.viewResources.bind(this);
  }

  viewResources() {
      this.props.viewResources();
  }

  render(){
    return(
    <div>
      <button className="modal-button" onClick={this.viewResources}>Resources</button>
    </div>
    );
  }
}

class MyJobsButton extends React.Component {
  constructor(props) {
    super(props);
      this.viewJobs = this.viewJobs.bind(this);
  }

  viewJobs() {
      this.props.viewJobs();
  }

  render(){
    return(
    <div>
      <button className="modal-button" onClick={this.viewJobs}>My Jobs</button>
    </div>
    );
  }
}
      
class AddResourceButton extends React.Component {
  render(){
    return(
    <div>
      <button className="modal-button">Add Resource</button>
    </div>
    );
  }
}

class LogOutButton extends React.Component {
  render() {
    return (
      <div>
        <button className="modal-button">Log Out</button>
      </div>
    );
  }
}

class SortButton extends React.Component {
      render() {
      return (
        <div>
        <button className="sortbutton">Sort by | Sort by</button>
        </div>
      );
    }
}

class Resources extends React.Component {
  /*constructor(props){
    super(props);
  }*/
  render() {
    return (
      <div>
      {/*this.props.resources.map((row, i) => <ResourceRow key={i} index={i} />)*/}
      {this.props.resources}
      </div>
    );
  }
}

class ResourceRow extends React.Component {
  render() {
    return (
      <div>
        {/*<ResourceModal />*/}
      </div>
    );
  }
}

class MyJobs extends React.Component {
  render() {
    return (
      <div>
        {this.props.jobs.map((row, i) => <EachJob key={i} index={i} />)}
      </div>
    );
  }
}

class EachJob extends React.Component {
  render() {
    return (
      <div>
        <h4>Job:</h4>
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


export default App;