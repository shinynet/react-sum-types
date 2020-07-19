import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import todosReducer from 'features/todos/todosSlice'

export default configureStore({
	middleware: getDefaultMiddleware({
		immutableCheck: false,
		serializableCheck: false,
	}),
	reducer: {
		todos: todosReducer
	}
})
