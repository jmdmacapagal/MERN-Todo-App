import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import TodoList from './components/TodoList.component';
import CreateTodo from './components/CreateTodo.component';
import EditTodo from './components/EditTodo.component';
import logo from './logo.png'

export default class App extends Component {
    render() {
        return (
            <Router>
                <div className="container">
                    <header>
                        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                            <a className="navbar-brand" href="#" target="_blank">
                                <img src={ logo } alt="" width="30" height="30"/>
                            </a>
                            <Link to='/' className="navbar-brand">MERN-Stack Todo App</Link>

                            <div className="collapse navbar-collapse">
                                <ul className="navbar-nav mr-auto">
                                    <li className="nav-item">
                                        <Link to='/' className="nav-link">Todo List</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to='/create' className="nav-link">Create Todo</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to='/edit/:id' className="nav-link">Edit Todo</Link>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </header>

                    <Route path="/" exact component={ TodoList } />
                    <Route path="/create" component={ CreateTodo } />
                    <Route path="/edit/:id" component={ EditTodo } />
                </div>
            </Router>
        )
    }
}