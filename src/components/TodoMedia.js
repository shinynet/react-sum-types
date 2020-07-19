import React from 'react'
import * as R from 'ramda'

const TodoMedia = props => {
	const {onChange, todo} = props

	const handleCompleteChange = R.compose(
		R.tap(onChange),
		R.path(['target', 'checked']),
	)

	return (
		<article className="media">
			<figure className="media-left">
				<label className="checkbox">
					<label className="checkbox">
						<input
							checked={todo.cata({
								Complete: R.T,
								Incomplete: R.F
							})}
							onChange={handleCompleteChange}
							type="checkbox"/>
					</label>
				</label>
			</figure>
			<div className="media-content">
				<div className="content">
					<p>
						{todo.cata({
							Complete: R.flip(R.identity),
							Incomplete: R.flip(R.identity),
						})}
					</p>
				</div>
			</div>
		</article>
	)
}

export default TodoMedia