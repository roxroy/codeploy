import React from 'react';

function ResourceModal(props) {
  let row = props.currentResource;
  // TODO: line under is for testing 
  row || (row = {"image": "https://www.sololearn.com/Icons/Courses/1024.png", "url":"https://www.website1.com/", "addedBy":"user1", "name": "name1", "date": "01/dd/yy", "rating": "1/5", "golds": "1"});
  return (
    <div className="resource-modal">
      <button className="close close-resource-modal" onClick={props.handleModalOpen}>X</button>
      <img src={row.image} alt={`icon-of-${row.name}`}/>
      <div className="resource-form">
        <p>Name: {row.name}</p>
        <p>Date Added: {row.date}</p>
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