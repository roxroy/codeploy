import React, { Component } from 'react';
import Modal from 'react-modal';
const ResourcesButton = require('./ResourcesButton');
const MyJobsButton = require('./MyJobsButton');
const AddResourceButton = require('./AddResourceButton');
const LogOutButton = require('./LogOutButton');
const HandleAuth = require('./HandleAuth');

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
    background: '#000',
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
    background: '#000',
    color: '#FFDC4C',
    top: '45%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

class Menu extends Component {
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
            <AddResourceButton saveResource={this.props.saveResource} />
            <LogOutButton loggedIn={isLoggedIn} logOut={this.props.logOut}/>
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

module.exports = Menu;