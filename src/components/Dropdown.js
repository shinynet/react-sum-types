import React from 'react'
import * as R from 'ramda'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAngleDown} from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'

const Dropdown = props => {
	const {options, onChange, value} = props

	return (
		<div className="dropdown is-hoverable">
			<div className="dropdown-trigger">
				<button className="button">
					<span>
						{value.cata({
							Complete: R.always('All Complete'),
							Incomplete: R.always('Incomplete'),
							Nothing: R.always('All Todos')
						})}
					</span>
					<span className="icon is-small">
						<FontAwesomeIcon icon={faAngleDown}/>
      		</span>
				</button>
			</div>
			<div className="dropdown-menu" id="dropdown-menu4" role="menu">
				<div className="dropdown-content">
					{R.map(option => {
						const classes = clsx('dropdown-item', {
							'is-active': option.value.equals(value)
						})
						return (
							<a
								key={option.key}
								href="#"
								className={classes}
								onClick={() => onChange(option.value)}>
								{option.label}
							</a>
						)
					}, options)}
				</div>
			</div>
		</div>
	)
}

export default Dropdown