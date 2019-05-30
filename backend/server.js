const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const connection = mongoose.connection
const todoRoutes = express.Router()
const app = express()
const PORT = 4000

let Todo = require('./todo.model')

// middlewares
app.use(cors())
app.use(bodyParser.json())
app.use('/todos', todoRoutes)

// db connection
mongoose.connect('mongodb://127.0.0.1:27017/todos', { useNewUrlParser: true })
connection.once('open', () => console.log('Mongodb connection established.'))

// ------------ ROUTES!

//find all
todoRoutes.route('/').get( async (req, res) => {
    try {
        const todos = await Todo.find()
        res.status(200).json(todos)
    } catch (err) {
        res.status(200).json({ message: err})
    }
})
// find by id
todoRoutes.route('/:id').get( async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id)
        res.status(200).json(todo)
    } catch (err) {
        res.status(404).json({ notFound: err })
    }
})

//add new
todoRoutes.route('/add').post( async (req, res) => {
    const todo = new Todo(req.body)
    try {
        const newTodo = await todo.save()
        res.status(201).json({ saved: newTodo })
    } catch (err) {
        res.status(500).json({ message: err })
    }
})

// update existing by id
todoRoutes.route('/update/:id').post( async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id)
        const { description, responsible, priority, completed } = req.body
        todo.description = description
        todo.responsible = responsible
        todo.priority = priority
        todo.completed = completed
        todo.save()
            .then(todo => {
                res.status(200).json({ updated: todo})
            })
            .catch(err => {
                res.status(500).json({ failed: err })
            }) 

    } catch (err) {
        res.status(404).json({ notFound: err })
    }
})

// listen to localhost
app.listen(PORT, () => console.log(`Server Running. Port: ${PORT}`))