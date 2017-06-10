import React, { Component } from 'react';
const ResourceTable = require('./ResourceTable');
const ResourceModal = require('./ResourceModal');
import Modal from 'react-modal';

/*
TODO:
when clicked on th, sorts respective column
when clicked on td, opens modal with more information about respective resource
  -could give the option to add resource to specific job from job list? (as a button on the resource modal)
*/

class Resources extends Component {
  constructor(props) {
    super(props)

    this.state = {
      resourceModalOpen: false,
      currentResource: null,
    }
    this.handleResourceModal = this.handleResourceModal.bind(this);
    this.handleModalOpen = this.handleModalOpen.bind(this);
  }
  handleResourceModal(i) {
    this.setState({
      resourceModalOpen: !this.state.resourceModalOpen,
      currentResource: i
    });
  }
  handleModalOpen() {
    this.setState({
      resourceModalOpen: !this.state.resourceModalOpen
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
    // holds all the functions for handling table sorting
    const sortTable = {
      resourceName() {
        resources = resources.sort((a, b) => {
          // return true if a.name comes after b.name
          return a.name.localeCompare(b.name)
        });
      },
      dateAdded() {
        resources = resources.sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        });
      },
      rating() {
        resources = resources.sort((a, b) => {
          // return true if a.rating is a larger fraction
          return a.rating > b.rating;
        });
      },
      golds() {
        resources = resources.sort((a, b) => {
          return a.golds - b.golds;
        });
      },
      language() {
        resources = resources.sort((a, b) => {
          // return true if a.name comes after b.name
          return a.language.localeCompare(b.language)
        });
      }
    }
    //handles table sort
    if (this.props.sortByDate) {
      sortTable["resourceName"]();
    } else {
      sortTable["dateAdded"]();
    }

    // handles currentSort
    sortTable[this.props.currentSort[0]]();
    if (!this.props.currentSort[1]) resources.reverse();

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
          resources={resources}
          handleResourceModal={this.handleResourceModal}
          handleSort={this.props.handleSort}
          currentSort={this.props.currentSort}
        />
      </div>
    );
  }
}

module.exports = Resources;