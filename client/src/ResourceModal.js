import React from 'react';

function ResourceModal(props) {
  let row = props.currentResource;
  return (
    <div className="resource-modal">
      <button className="close close-resource-modal" onClick={props.handleModalOpen}>X</button>
      <img src={row.image} alt={`icon-of-${row.name}`}/>
      <div className="resource-form">
        <p>Name: {row.name}</p>
        <p>Language: {row.language}</p>
        <p>Date Added: {row.dateAdded}</p>
        <p>Link: <a href={row.url}>{row.url}</a></p>
        <p>Added by: {row.addedBy}</p>
        <p>Rating: {row.rating}</p>
        <p>Gold Stars: {row.golds}</p>
      </div>
      <p className="description">{row.description}</p>
    </div>
  )
}

module.exports = ResourceModal;