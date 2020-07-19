import React, {useEffect, useState} from 'react'
import * as R from 'ramda'
import {Filter, Todo} from 'types'
import {Dropdown, Message, Progress, TodoMedia} from 'components'

const Todos = props => {
	const {
		fetchTodos,
		todos,
		updateTodo,
	} = props

	const [activeFilter, setActiveFilter] = useState(Filter.Nothing)

	const filterOptions = [
		{key: 'nothing', label: 'All Todos', value: Filter.Nothing},
		{key: 'complete', label: 'Complete', value: Filter.Complete},
		{key: 'incomplete', label: 'Incomplete', value: Filter.Incomplete}
	]

	const filteredTodos = R.filter(activeFilter.cata({
		Complete: () => Todo.Complete.is,
		Incomplete: () => Todo.Incomplete.is,
		Nothing: () => R.T
	}), todos)

	useEffect(() => {
		fetchTodos()
	}, [fetchTodos])

	return (
		<div className="container">

			<div className="section">
				<Dropdown
					options={filterOptions}
					onChange={setActiveFilter}
					value={activeFilter}/>
			</div>

			<div className="section">
				{filteredTodos.cata({
					Empty: () => <Message message="No todos exist. Create one!."/>,
					Error: error => <Message message={error} type="error"/>,
					Loading: () => <Progress/>,
					Nothing: () => null,
					Result: data => data.map(todo => (
						<TodoMedia
							key={todo.id}
							onChange={isComplete => updateTodo(isComplete, todo)}
							todo={todo}/>
					))
				})}
			</div>
		</div>
	)
}

export default Todos