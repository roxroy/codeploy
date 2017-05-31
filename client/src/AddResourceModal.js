import React, { Component } from 'react';
import Modal from 'react-modal';
//import {RadioGroup, Radio} from 'react-radio-group'

class AddResourceModal extends Component {
	render() {
		return (
			<Modal
	          isOpen={this.props.modalIsOpen}
	          onRequestClose={this.props.closeModal}

	          contentLabel="Add a Resource"
	        >
	          <button className="close" onClick={this.props.closeModal}>X</button>
	          <h4>Name</h4>
	          <textarea ref="newResourceName" placeholder="Name of the resource"></textarea>
	          <h4>Link</h4>
	          <textarea ref="newResourceIng" placeholder="Paste URL"></textarea>
	          <h4>Image Link</h4>
	          <textarea ref="newResourceImg" placeholder="Paste image URL"></textarea>
	          <h4>Rating</h4>
	          <form className="stars">
						  <input type="radio" ref="one" />&#9733;
						  <input type="radio" ref="two" />&#9733; &#9733;
						  <input type="radio" ref="three" />&#9733; &#9733; &#9733;
						  <input type="radio" ref="four" />&#9733; &#9733; &#9733; &#9733;
						  <input type="radio" ref="five" />&#9733; &#9733; &#9733; &#9733; &#9733;
						</form>
	          <h4>Review/Comments</h4>
	          <textarea ref="newResourceReview" placeholder="Provide some additional details..."></textarea>
	          <button onClick={this.props.save}>Save</button>
	      </Modal>
		);
	}
}

module.exports = AddResourceModal;