import daggy from 'daggy'

const Filter = daggy.taggedSum('Filter', {
	Complete: [],
	Incomplete: [],
	Nothing: [],
})

const {Complete, Incomplete, Nothing} = Filter

// equals :: Setoid a => a ~> a -> Boolean
Filter.prototype.equals = function (that) {
	return this.cata({
		Complete: () => Complete.is(that),
		Incomplete: () => Incomplete.is(that),
		Nothing: () => Nothing.is(that),
	})
}

export default Filter