const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    console.log('auth middleware...')
    try {
        // const token = req.header('Authorization')
        // token = Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTBhNjM0NjQ5MGJjMjA0NGNiZTAwMzAiLCJpYXQiOjE1Nzc3MzkwNzh9.nhP0IJ805dpHM1B7NXD1IKEVGZx4_LWw-qtos2IPKGQ
        const token = req.header('Authorization').replace('Bearer ', '')
        //console.log(token)
        const decoded = jwt.verify(token, 'thisismynewcourse')
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) {
            throw new Error()
        }

        req.token = token
        // since the user is found, save it in req
        req.user = user
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate' })
    }
}

module.exports = auth