import React, { Component } from 'react';

import TodoList from '../TodoList';
import AppHeader from '../AppHeader';
import SearchPanel from '../SearchPanel';
import ItemStatusFilter from '../ItemStatusFilter';

import './App.css';
import AddTodoListItem from '../AddTodoListItem/';

export default class App extends Component {
	maxId = 1;

	state = {
		todoData: [
			this.createTodoItem('Drink Coffee'),
			this.createTodoItem('Learn React'),
			this.createTodoItem('Rest a little'),
		],
	};

	createTodoItem(label) {
		return {
			label,
			important: false,
			done: false,
			id: this.maxId++,
		};
	}

	deleteItem = (id) => {
		this.setState(({ todoData }) => {
			const idx = todoData.findIndex((el) => el.id === id);

			const resArr = [
				...todoData.slice(0, idx),
				...todoData.slice(idx + 1),
			];

			return {
				todoData: resArr,
			};
		});
	};

	addItem = (text) => {
		const newItem = this.createTodoItem(text);

		this.setState(({ todoData }) => {
			const newArr = [...todoData, newItem];
			return { todoData: newArr };
		});
	};

	toggleProperty(arr, id, prop) {
		const idx = arr.findIndex((el) => el.id === id);

		const oldItem = arr[idx],
			newItem = { ...oldItem, [prop]: !oldItem[prop] };

		return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
	}

	onToggleDone = (id) => {
		this.setState(({ todoData }) => {
			return {
				todoData: this.toggleProperty(todoData, id, 'done'),
			};
		});
	};

	onToggleImportant = (id) => {
		this.setState(({ todoData }) => {
			return {
				todoData: this.toggleProperty(todoData, id, 'important'),
			};
		});
	};

	render() {
		const { todoData } = this.state;

		const doneCount = todoData.filter((el) => el.done).length,
			todoCount = todoData.length - doneCount;

		return (
			<div className="todo-app">
				<AppHeader toDo={todoCount} done={doneCount} />
				<div className="top-panel d-flex">
					<SearchPanel />
					<ItemStatusFilter />
				</div>

				<TodoList
					todos={todoData}
					onDeleted={this.deleteItem}
					onToggleDone={this.onToggleDone}
					onToggleImportant={this.onToggleImportant}
				/>
				<AddTodoListItem onAdded={this.addItem} />
			</div>
		);
	}
}
