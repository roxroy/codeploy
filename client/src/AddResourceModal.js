import React, { Component } from 'react';
import Modal from 'react-modal';
//import {RadioGroup, Radio} from 'react-radio-group'

class AddResourceModal extends Component {
  constructor(props) {
    super(props);
    this.save = this.save.bind(this);
  }
  save() {
    this.props.closeResourceModal();
    var resource =
      {
        "image": this.refs.newResourceImg.value,
        "url": this.refs.newResourceLink.value,
        "addedBy": null,
        "name": this.refs.newResourceName.value,
        "date": null,
        "rating": null,
        "golds": null,
        "description": this.refs.newResourceReview.value
      };
    //TODO: confirm no empty entries
    this.props.saveResource(resource);
  }
  render() {
    const addResourceStyle = {
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
        maxWidth: "400px",
        maxHeight: "600px",
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
    return (
      <Modal
        isOpen={this.props.modalIsOpen}
        onRequestClose={this.props.closeModal}
        style={addResourceStyle}
        contentLabel="Add a Resource"
      >
        <div className="add-resource-container">
          <button className="close" onClick={this.props.closeModal}>X</button>
          <h4>Name</h4>
          <textarea ref="newResourceName" placeholder="Name of the resource"></textarea>
          <h4>Link to resource</h4>
          <textarea ref="newResourceLink" placeholder="Paste URL"></textarea>
          <h4>Image Link</h4>
          <textarea ref="newResourceImg" placeholder="Paste image URL"></textarea>
          <h4>Rating</h4>
          <form className="stars">
            <input type="radio" ref="one" />&#9733; <br />
            <input type="radio" ref="two" />&#9733; &#9733; <br />
            <input type="radio" ref="three" />&#9733; &#9733; &#9733; <br />
            <input type="radio" ref="four" />&#9733; &#9733; &#9733; &#9733; <br />
            <input type="radio" ref="five" />&#9733; &#9733; &#9733; &#9733; &#9733;
				</form>
          <h4>Review/Comments</h4>
          <textarea className="additional-details" ref="newResourceReview" placeholder="Provide some additional details..."></textarea>
          <div className="save-button-container">
          <button className="save-resource" onClick={this.save}>Save</button>
          </div>
        </div>
      </Modal>
    );
  }
}

module.exports = AddResourceModal;