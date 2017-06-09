import React, { Component } from 'react';

class SortButton extends Component {
	constructor(props) {
		super(props);

		this.state = {
			sortByDate: true
		}
		this.sortState = this.sortState.bind(this);
	}

	sortState() {
		this.setState({
			sortByDate: !this.state.sortByDate
		});
		let sortStatus = this.state.sortByDate
		this.props.sortResources(sortStatus);
	}

	render() {
		return (
			<div>
				{(this.props.showAllButton) &&
					<button onClick={this.props.viewResources} className="sortbutton"> View All Resources </button>
				}
				<button onClick={this.sortState} className="sortbutton"> Sort by Date | Sort Alphabetically </button>
			</div>
		);
	}
}

module.exports = SortButton;