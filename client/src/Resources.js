import React, { Component } from 'react';
const ResourceTable = require('./ResourceTable');
const ResourceModal = require('./ResourceModal');
import Modal from 'react-modal';

/*
TODO:
when clicked on th, sorts respective column
when clicked on td, opens modal with more information about respective resource
  -could give the option to add resource to specific job from job list? (as a button in the modal)
*/

class Resources extends Component {
  constructor(props) {
    super(props)

    this.state = {
      "resourceModalOpen": false,
      "currentResource": null
    }
    this.handleResourceModal = this.handleResourceModal.bind(this);
    this.handleModalOpen = this.handleModalOpen.bind(this);
  }
  handleResourceModal(i) {
    this.setState({
      "resourceModalOpen": !this.state.resourceModalOpen,
      "currentResource": i
    });
  }
  handleModalOpen() {
    this.setState({
      "resourceModalOpen": !this.state.resourceModalOpen
    });
  }
  render() {
    const modalStyle = {
      overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.75)'
      },
      content: {
        display: "flex",
        justifyContent: "center",
        position: 'absolute',
        maxWidth: "80%",
        maxHeight: "80%",
        top: '40px',
        left: '0',
        right: '0',
        margin: "0 auto",
        bottom: '40px',
        border: '1px solid #ccc',
        background: '#fff',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        borderRadius: '7px',
        outline: 'none',
        padding: '20px'

      }
    }
    
    let resources = this.props.resources;
    if (this.props.sortByDate === true) {
      resources = resources.sort(sortByDate);

    } else if (this.props.sortByDate === false) {

      resources = resources.sort(sortByAlpha);

    }


    return (
      <div className="resources-container">
        <Modal
          contentLabel="resourceModal"
          isOpen={this.state.resourceModalOpen}
          onRequestClose={this.handleModalOpen}
          style={modalStyle}
        >
          {/*handles the information given from clicking on ResourceRow*/}
          <ResourceModal
            currentResource={this.state.currentResource}
            handleModalOpen={this.handleModalOpen}
          />
        </Modal>
        {/*Generates a table of resources, handles sorting(TODO) and conditional rendering of modal*/}
        <ResourceTable
          fromJobModal={false}
          resources={resources}
          handleResourceModal={this.handleResourceModal}
        />
      </div>
    );
  }
}

function sortByAlpha(a, b) {
  if (a.name < b.name)
    return -1;
  if (a.name > b.name)
    return 1;
  return 0;
}

function sortByDate(a, b) {
  return new Date(b.date) - new Date(a.date);
}

module.exports = Resources;