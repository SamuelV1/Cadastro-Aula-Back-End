// a maior parte desse codigo foi de tutorial e reciclagem de outros codigos eu n manjo de backend assim tão bem
const express = require('express')
const router = express.Router()
let data = {}

router.get('/', (req, res) => {
    res.json(Object.values(data))
})

function checkBody(req, res, next) {
    if (areAllFieldsValid(req.body)) {
        return next()
    }

    res.status(400).json({ error: true, message: 'Todos os campos são obrigatórios' })
}

function areAllFieldsValid(body) {
    const fields = [body.user, body.pass]
    return fields.every(field => typeof field !== 'undefined' && field !== '')
}

function checkAlreadyRegistered(req, res, next) {
    if (typeof data[req.body.user.toUpperCase()] !== 'undefined') {
        return res.status(400).json({
            error: true,
            message: `o usuario ${req.body.user} ja esta cadastrado`
        })
    }
    next()
}
// registrar usuario
router.post('/', checkBody, checkAlreadyRegistered, (req, res) => {
    data[req.body.user.toUpperCase()] = {
        user: req.body.user,
        pass: req.body.pass
    }

    res.json({ message: `O usuario ${req.body.user} foi cadastrado com sucesso` })
})

// login do usuario
router.post('/login', (req, res) => {
    let user = req.body.user
    let pass = req.body.pass

    let arrayof = Object.values(data);

    let obj = arrayof.find(o => o.user === user);
    if (!obj) return res.status(404).json({ error: true, message: 'usuario não cadastrado' })
    if (obj.pass != pass) return res.status(400).json({ error: true, message: 'Senha incorreta' })

    res.status(200).json({ message: 'usuario Online' })
})

module.exports = router