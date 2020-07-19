import React from 'react'
import 'App.sass'
import Todos from 'features/todos/TodosConnector'

function App() {
	return (
		<div className="App">
			<nav className="navbar is-primary is-spaced">
				<div className="navbar-brand">
          <span className="navbar-item">
            <h3 className="title is-4">Todos</h3>
          </span>
				</div>
			</nav>
			<Todos/>
		</div>
	)
}

export default App
