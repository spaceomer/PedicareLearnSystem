const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Cours = require('../models/cours')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const { render } = require('ejs')

router.get('/', async (req, res) => {
    const users = await User.find()

    res.render('dashBoard.ejs', {users: users})
})

router.get('/adduser', (req, res) => {
    res.render('adduser.ejs')
})

router.post('/adduser', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            id: Date.now()
        })
        newUser.save()
        res.redirect('/login')
    } catch (e) {
        res.redirect('/admin/adduser')
        console.log(e);
    }
})

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const courses = await Cours.find({ student: user.id })
        res.render('user.ejs', {user: user, courses: courses})
    } catch (e) {
        console.log(e);
    }
})

router.get('/:id/edit', (req, res) => {
    res.send(req.params.id)
})

router.put('/:id', (req, res) => {
    res.send(req.params.id)
})

router.delete('/:id', (req, res) => {
    res.send(req.params.id)
})

module.exports = router