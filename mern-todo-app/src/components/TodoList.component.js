import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Todo = props => {
    const completed = props.todo.completed ? 'completed' : ''
    return (
        <tr>
        <td className={completed}>{props.todo.description}</td>
        <td className={completed}>{props.todo.responsible}</td>
        <td className={completed}>{props.todo.priority}</td>
        <td><Link to={`/edit/${props.todo._id}`}>Edit</Link></td>
    </tr>
    )
}

export default class TodoList extends Component {
    state = {
        todos: []
    }

    componentDidMount() {
        axios.get('http://localhost:4000/todos')
             .then(response => {
                 this.setState({ todos: response.data })
             })
             .catch(err => {
                 console.log(err)
             })
    }

    componentDidUpdate() {
          axios.get('http://localhost:4000/todos')
             .then(response => {
                 this.setState({ todos: response.data })
             })
             .catch(err => {
                 console.log(err)
             })
    }

    todosList = () => {
        return this.state.todos.map((todo, i) => {
            return <Todo key={i} todo={todo} />
        })
    }

    render() {
        return (
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Description:</th>
                            <th>Responsible:</th>
                            <th>Priority:</th>
                            <th>Action:</th>
                        </tr>
                    </thead>
                    <tbody>{ this.todosList() }</tbody>
                </table>
            </div>
        )
    }
}