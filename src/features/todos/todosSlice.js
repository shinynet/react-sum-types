import {createSlice} from '@reduxjs/toolkit'
import {RemoteData, Todo} from 'types'
import * as R from 'ramda'

const listLens = R.lensProp('list')

// result :: RemoteData b => a -> b a
const resultOrEmpty = R.ifElse(
	R.isEmpty,
	R.always(RemoteData.Empty),
	RemoteData.Result
)

const initialState = {
	list: RemoteData.Nothing
}

const reducers = {
	fetchTodosRequest: R.useWith(R.set(listLens), [
		R.always(RemoteData.Loading)
	]),
	fetchTodosSuccess: R.useWith(R.set(listLens), [
		R.o(resultOrEmpty, R.prop('payload'))
	]),
	fetchTodosFailure: R.useWith(R.set(listLens), [
		R.o(RemoteData.Error, R.path(['payload', 'message']))
	]),
	updateTodoSuccess: R.useWith(R.set(listLens), [
		R.o(RemoteData.Result, R.prop('payload'))
	]),
	updateTodoFailure: R.useWith(R.set(listLens), [
		R.o(RemoteData.Error, R.path(['payload', 'message']))
	])
}

const {actions, reducer} = createSlice({
	name: 'todos',
	initialState,
	reducers: R.map(R.flip, reducers)
})

export const {
	fetchTodosRequest,
	fetchTodosSuccess,
	fetchTodosFailure,
	updateTodoSuccess,
	updateTodoFailure
} = actions

const todosFetchService = () => () => new Promise((resolve, reject) => {
	setTimeout(() => {
		// Uncomment for Empty
		// resolve([])

		// Uncomment for Error
		// reject(new Error('Something went wrong!'))

		// Uncomment for Result
		resolve([
			{id: 1, isComplete: false, label: 'Pay taxes'},
			{id: 2, isComplete: true, label: 'Help land lady carry out garbage'}
		])
	}, 1000)
})

const todoUpdateService = (isComplete, todo) => () => new Promise((resolve, reject) => {
	const {id, label} = todo
	setTimeout(() => {
		// Uncomment for Error
		// reject(new Error('Something went wrong!'))

		// Uncomment for Result
		resolve({id, label, isComplete})
	}, 250)
})

export const fetchTodos = () => dispatch => {
	R.compose(dispatch, fetchTodosRequest)()
	R.compose(
		R.otherwise(R.o(dispatch, fetchTodosFailure)),
		R.andThen(R.o(dispatch, fetchTodosSuccess)),
		R.andThen(R.map(R.ifElse(
			R.propEq('isComplete', true),
			Todo.Complete.from,
			Todo.Incomplete.from,
		))),
		todosFetchService()
	)()
}

export const updateTodo = (isComplete, todo) => (dispatch, getState) => {
	const list = R.path(['todos', 'list', 'data'], getState())
	const index = R.findIndex(R.equals(todo), list)

	R.compose(
		R.otherwise(R.o(dispatch, updateTodoFailure)),
		R.andThen(R.o(dispatch, updateTodoSuccess)),
		R.andThen(R.update(index, R.__, list)),
		R.andThen(R.ifElse(
			R.propEq('isComplete', true),
			Todo.Complete.from,
			Todo.Incomplete.from,
		)),
		todoUpdateService(isComplete, todo)
	)()
}


export default reducer
