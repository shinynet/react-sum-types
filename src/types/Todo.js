import daggy from 'daggy'
import * as R from 'ramda'
import RemoteData from './RemoteData'

const Todo = daggy.taggedSum('Todo', {
	Complete: ['id', 'label'],
	Incomplete: ['id', 'label'],
})

const {Complete, Incomplete} = Todo

// equals :: Setoid a => a ~> a -> Boolean
RemoteData.prototype.equals = function (that) {
	return this.cata({
		Complete: id => R.equals(id, that.id),
		Incomplete: id => R.equals(id, that.id),
	})
}

// invert :: a ~> a
Todo.prototype.invert = function () {
	return this.cata({
		Complete: Incomplete,
		Incomplete: Complete,
	})
}

export default Todo