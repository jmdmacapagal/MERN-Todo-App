import React, { Component } from 'react'
import axios from 'axios'

export default class EditTodo extends Component {
 state = {
            description: '',
            responsible: '',
            priority: '',
            completed: false
        }

    componentDidMount() {
        axios.get('http://localhost:4000/todos/' + this.props.match.params.id)
             .then(response => {
                 const {description, responsible, priority, completed } = response.data
                 this.setState({
                     description: description,
                     responsible: responsible,
                     priority: priority,
                     completed: completed
                 })
             })
              .catch(err => {
                  console.log(err)
              })
    }

    changeHandler = e => {
        const { name, value, type, checked } = e.target
        type === 'checkbox' ?
            this.setState({ [name]: checked }) :
            this.setState({ [name]: value }) 
    }

    submitHandler = e => {
        e.preventDefault()
        const updateTodo = { ...this.state }

        axios.post('http://localhost:4000/todos/update/' + this.props.match.params.id, updateTodo)
             .then(response => {
                 console.log(response.data)
             })
             .catch(err => {
                 console.log(err)
             })
        
        this.setState({
            description: '',
            responsible: '',
            priority: '',
            completed: false
        })

        this.props.history.push('/')
    }


    render() {
        return (
            <div style={{margin: 'auto', marginTop: 50, width: 650}}>
                <h3>Update Todo</h3>
                <form onSubmit={this.submitHandler}>
                    <div className="form-group">
                        <label>Description: </label>
                        <input 
                            type="text"
                            className="form-control"
                            name="description"
                            value={this.state.description}
                            onChange={this.changeHandler}
                        />
                    </div>

                    <div className="form-group">
                        <label>Responsible: </label>
                        <input 
                            type="text"
                            className="form-control"
                            name="responsible"
                            value={this.state.responsible}
                            onChange={this.changeHandler}
                        />
                    </div>

                    <div className="form-check form-check-inline">
                        <input 
                            type="radio"
                            className="form-check-input"
                            name="priority"
                            id="priorityLow"
                            value="Low"
                            checked={this.state.priority === 'Low'}
                            onChange={this.changeHandler}
                        />
                        <label className="form-check-label">Low</label>
                    </div>

                    <div className="form-check form-check-inline">
                        <input 
                            type="radio"
                            className="form-check-input"
                            name="priority"
                            id="priorityMedium"
                            value="Medium"
                            checked={this.state.priority === 'Medium'}
                            onChange={this.changeHandler}
                        />
                        <label className="form-check-label">Medium</label>
                    </div>

                    <div className="form-check form-check-inline">
                        <input 
                            type="radio"
                            className="form-check-input"
                            name="priority"
                            id="priorityHigh"
                            value="High"
                            checked={this.state.priority === 'High'}
                            onChange={this.changeHandler}
                        />
                        <label className="form-check-label">High</label>
                    </div>

                    <div className="form-check">
                        <input 
                            type="checkbox"
                            className="form-check-input"
                            name="completed"
                            id="completedCheckbox"
                            checked={this.state.completed}
                            onChange={this.changeHandler}
                        />
                        <label className='form-check-label'>Completed</label>
                    </div>

                    <div className="form-group">
                        <input 
                            type="submit"
                            className="btn btn-primary"
                            value="Update"
                        />
                    </div>
                </form>
            </div>
        )
    }
}