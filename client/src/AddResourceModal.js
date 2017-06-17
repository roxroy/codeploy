import React, { Component } from 'react';
import Modal from 'react-modal';
//import {RadioGroup, Radio} from 'react-radio-group'

class AddResourceModal extends Component {
  constructor(props) {
    super(props);
    this.save = this.save.bind(this);

    this.state = {
      errorVisible: "none",
      errorText: null
    }
  }

  getSelectedRating() {
    var rating = "3";
    if (this.refs.one.checked)
      rating = "1";
    if (this.refs.two.checked)
      rating = "2";
    if (this.refs.three.checked)
      rating = "3";
    if (this.refs.four.checked)
      rating = "4";
    if (this.refs.five.checked)
      rating = "5";

    return `${rating}/5`;
  }

  save() {
    var urlRE = /^((https?|ftp):\/\/)?([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;

    var resource =
      {
        "image": this.refs.newResourceImg.value,
        "url": this.refs.newResourceLink.value,
        "addedBy": this.props.username,
        "name": this.refs.newResourceName.value,
        "rating": this.getSelectedRating(),
        "golds": null,
        "description": this.refs.newResourceReview.value,
        "dateAdded": null,
        "language": this.refs.newResourceLang.value
      };
    this.setState({ errorVisible: "inline" });
    if (// test for at least 1 letter
      !/[A-Za-z]/.test(resource.name)) {
      this.setState({ errorText: "Please enter a name for the Resource." })
      return;
    }
    if (!/[A-Za-z]/.test(resource.language)) {
      this.setState({ errorText: "Please enter a Programming Language." })
      return;
    }
    if (!urlRE.test(resource.url)) {
      this.setState({ errorText: "Invalid url for Link to Resource." })
      return;
    }
    if (!/\.(jpeg|jpg|png|svg|ico)$/.test(resource.image)) {
      this.setState({ errorText: "Invalid link to image." })
      return;
    }
    if (// test if there are more than 5 words
      !/^\W*(\w+\b\W*){5,}$/.test(resource.description)) {
      this.setState({ errorText: "Please enter at least a 5 word description/review." })
      return;
    }

    this.setState({ errorVisible: "none" });
    this.props.saveResource(resource);
    this.props.closeResourceModal();
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
        maxWidth: "420px",
        maxHeight: "710px",
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
          <h4>Name*</h4>
          <textarea ref="newResourceName" placeholder="Name of the Resource"></textarea>
          <h4>Programming Language of Resource*</h4>
          <textarea ref="newResourceLang" placeholder="Example: C#, Haskell, and/or Javascript."></textarea>
          <h4>Link to resource*</h4>
          <textarea ref="newResourceLink" placeholder="Paste URL"></textarea>
          <h4>Image Link*</h4>
          <textarea ref="newResourceImg" placeholder="Paste Image URL"></textarea>
          <h4>Rating*</h4>
          <form className="stars">
            <input type="radio" name="stars" ref="one" />&#9733; <br />
            <input type="radio" name="stars" ref="two" />&#9733; &#9733; <br />
            <input type="radio" name="stars" ref="three" defaultChecked="true" />&#9733; &#9733; &#9733; <br />
            <input type="radio" name="stars" ref="four" />&#9733; &#9733; &#9733; &#9733; <br />
            <input type="radio" name="stars" ref="five" />&#9733; &#9733; &#9733; &#9733; &#9733;
				</form>
          <h4>Review/Description*</h4>
          <textarea className="additional-details" ref="newResourceReview" placeholder="Provide some additional details..."></textarea>
          <p className="error" style={{ display: this.state.errorVisible }}>
            <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
            {" " + this.state.errorText}
          </p>
          <div className="save-button-container">
            <button className="save-resource" onClick={this.save}>Save</button>
          </div>
        </div>
      </Modal>
    );
  }
}

module.exports = AddResourceModal;