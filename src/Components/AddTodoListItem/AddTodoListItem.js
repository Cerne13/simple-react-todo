import React, { Component } from 'react';
import './AddTodoListItem.css';

export default class AddTodoListItem extends Component {
	state = {
		label: '',
	};

	onLabelChange = (e) => {
		this.setState({ label: e.target.value });
	};

	onSubmit = (e) => {
		e.preventDefault();
		this.props.onAdded(this.state.label);
		this.setState({ label: '' });
	};

	render() {
		return (
			<form
				className="add-todo-list-item d-flex"
				onSubmit={this.onSubmit}
			>
				<input
					type="text"
					className="form-control"
					onChange={this.onLabelChange}
					placeholder="Things to be done"
					value={this.state.label}
				/>
				<button className="btn btn-outline-secondary btn-add-todo">
					Add item
				</button>
			</form>
		);
	}
}
