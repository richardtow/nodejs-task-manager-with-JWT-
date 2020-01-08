const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

// Use middleware to do whatever before save
// https://mongoosejs.com/docs/api/model.html#model_Model-save
taskSchema.pre('save', async function(next) {
    const task = this

    console.log('Just before saving a task...')

    next()
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task