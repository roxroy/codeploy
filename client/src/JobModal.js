import React, { Component } from 'react';
import Modal from 'react-modal';
const ResourceTable = require("./ResourceTable");

class JobModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      resourceSort: ["resourceName", true]
    }
    this.handleSort = this.handleSort.bind(this);
  }
  handleSort(event) {
    // order: true==ascending, false==descending
    const cTH = event.target.id;
    let order = this.state.resourceSort[1];

    // if current column is being sorted
    if (cTH === this.state.resourceSort[0]) {
      order = !order;
    } else {
      order = true;
    };

    this.setState({
      resourceSort: [cTH, order]
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
        flexDirection: "column",
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
    let resources = this.props.job.resources;
    if (!resources.length) {
      return null;
    }

    // holds all the functions for handling table sorting
    const sortTable = {
      "resourceName"() {
        resources = resources.sort((a, b) => {
          // return true if a.name comes after b.name
          return a.name > b.name;
        });
      },
      "dateAdded"() {
        resources = resources.sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        });
      },
      "rating"() {
        resources = resources.sort((a, b) => {
          // return true if a.rating is a larger fraction
          return a.rating > b.rating;
        });
      },
      "golds"() {
        resources = resources.sort((a, b) => {
          return a.golds - b.golds;
        });
      }
    }
    // handles currentSort
    sortTable[this.state.resourceSort[0]]();
    if (this.state.resourceSort[1] === false) resources.reverse();

    return (
      <div className="job-modal-container">
        <Modal
          contentLabel="jobModal"
          isOpen={this.props.viewingJob}
          onRequestClose={this.props.handleCloseModal}
          style={modalStyle}
        >
          <button className="close close-resource-modal" onClick={this.props.handleCloseModal}>X</button>
          <h3>Resources for {this.props.job.jobPosition} at {this.props.job.companyName}</h3>
          <div className="job-resource-table">
            <ResourceTable
              fromJobModal={true}
              resources={resources}
              handleSort={this.handleSort}
              currentSort={this.state.resourceSort}
            />
          </div>
        </Modal>
      </div>
    )
  }
};


module.exports = JobModal;