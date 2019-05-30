import React, { Component } from 'react'
import axios from 'axios'

export default class CreateTodo extends Component {
    state = {
        description: '',
        responsible: '',
        priority: '',
        completed: false
    }

    changeHandler = e => {
        const { name, value, type, checked } = e.target
        type === 'checkbox' ?
            this.setState({ [name]: checked }) :
            this.setState({ [name]: value }) 
    }

    submitHandler = e => {
        e.preventDefault()
        const newTodo = { ...this.state }

        axios.post('http://localhost:4000/todos/add', newTodo)
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
        console.log({...this.state})
    }

    render() {
        return (
            <div style={{margin: 'auto', marginTop: 50, width: 650}}>
                <h3>Create New Todo</h3>
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

                    <div className="form-group">
                        <input 
                            type="submit"
                            className="btn btn-primary"
                            value="Create"
                        />
                    </div>
                </form>
            </div>
        )
    }
}