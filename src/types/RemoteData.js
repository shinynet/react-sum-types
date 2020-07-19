import daggy from 'daggy'
import * as R from 'ramda'

// map :: Functor f => (a -> b) -> f a -> f b
const map = R.curry((f, x) => x.map?.(f) ?? f(x))
// filter :: Filterable f => (a -> Boolean) -> f a -> f a
const filter = R.curry((f, x) => x.filter?.(f) ?? x)

const RemoteData = daggy.taggedSum('RemoteData', {
	Empty: [],
	Error: ['error'],
	Loading: [],
	Nothing: [],
	Result: ['data'],
})

const {
	Error,
	Result,
} = RemoteData

// filter :: Filterable f => f a ~> (a -> Boolean) -> f a
RemoteData.prototype.filter = function (f) {
	return this.cata({
		Empty: () => this,
		Error: () => this,
		Loading: () => this,
		Nothing: () => this,
		Result: R.o(Result, filter(f)),
	})
}

// map :: Functor f => f a ~> (a -> b) -> f b
RemoteData.prototype.map = function(f) {
	return this.cata({
		Empty: () => this,
		Error: R.o(Error, map(f)),
		Loading: () => this,
		Nothing: () => this,
		Result: R.o(Result, map(f)),
	})
}

export default RemoteData