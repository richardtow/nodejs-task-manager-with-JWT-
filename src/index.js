const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

// Middleware (Express) hook
// This intercept all requests.  Need to call next() to pass the request to its path.
// app.use((req, res, next) => {
//     console.log('req.method=' + req.method + '  . req.path=' + req.path)
//     next()
// })

// app.use((req, res, next) => {
//     res.status(503).send("Under maintenance, please check back soon =:)")
// })

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

// bcrypt test code ------------------
// const bcrypt = require('bcryptjs')

// const myFunction = async () => {
//     const password = 'Red12345!'
//     const hashedPassword = await bcrypt.hash(password, 8)

//     console.log(password)
//     console.log(hashedPassword)

//     const isMatch = await bcrypt.compare('Red12345!', hashedPassword)
//     console.log(isMatch)
// }

// myFunction()
//-------------------------------------

// jwt test code ----------------------
// const jwt = require('jsonwebtoken')

// const myFunction = async () => {
//     const token = jwt.sign({ _id: 'abc123'}, "thisismynewcourse", { expiresIn: "7 days"})
//     console.log(token)

//     const data = jwt.verify(token, 'thisismynewcourse')
//     console.log(data)
// }

// myFunction()
//-------------------------------------

// User / Task relationshop test code ---
const Task = require('./models/task')
const User = require('./models/user')

const main = async () => {
    // const task = await Task.findById('5e13cf8dd25ea43218f0724c')
    // await task.populate('owner').execPopulate()
    // console.log(task.owner)

    const user = await User.findById('5e13cf4fd25ea43218f0724a')
    await user.populate('tasks').execPopulate()
    console.log(user.tasks)
}

//main()
//-------------------------------------
