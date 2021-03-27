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
			this.createTodoItem('Work on React app'),
			this.createTodoItem('Rest a little'),
		],
		term: '',
		filter: 'all',
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

	search = (itemsArr, text) => {
		if (text.length === 0) {
			return itemsArr;
		}

		return itemsArr.filter((item) =>
			item.label.toLowerCase().includes(text.toLowerCase())
		);
	};

	onSearchChange = (term) => {
		this.setState({ term });
	};

	onFilterChange = (filter) => {
		this.setState({ filter });
	};

	filter = (items, filter) => {
		switch (filter) {
			case 'all':
				return items;

			case 'active':
				return items.filter((item) => !item.done);

			case 'done':
				return items.filter((item) => item.done);

			default:
				return items;
		}
	};

	render() {
		const { todoData, term, filter } = this.state;

		const visibleData = this.filter(this.search(todoData, term), filter);
		const visible_data = 0;

		console.log(visible_data);

		const doneCount = todoData.filter((el) => el.done).length,
			todoCount = todoData.length - doneCount;

		return (
			<div className="todo-app">
				<AppHeader toDo={todoCount} done={doneCount} />
				<div className="top-panel d-flex">
					<SearchPanel onSearchChange={this.onSearchChange} />
					<ItemStatusFilter
						filter={filter}
						onFilterChange={this.onFilterChange}
					/>
				</div>

				<TodoList
					todos={visibleData}
					onDeleted={this.deleteItem}
					onToggleDone={this.onToggleDone}
					onToggleImportant={this.onToggleImportant}
				/>
				<AddTodoListItem onAdded={this.addItem} />
			</div>
		);
	}
}
