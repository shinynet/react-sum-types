import React from 'react'
import clsx from 'clsx'

const Message = props => {
	const {message, type} = props

	const articleClasses = clsx('message', {
		'is-danger': type === 'error'
	})

	return (
		<article className={articleClasses}>
			<div className="message-body">
				{message}
			</div>
		</article>
	)
}

export default Message