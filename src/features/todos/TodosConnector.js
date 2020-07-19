import {connect} from 'react-redux'
import {fetchTodos, updateTodo} from './todosSlice'
import Todos from './Todos'
import * as R from 'ramda'

const mapState = R.applySpec({
	todos: R.path(['todos', 'list'])
})

const mapDispatch = {
	fetchTodos,
	updateTodo,
}

export default connect(mapState, mapDispatch)(Todos)