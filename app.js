const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3333
const routes = require('../routes')

app.use(cors())

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/', (req, res) => {
    res.json({ message: 'Welcome Ap' })
})

app.use('/user', routes)

app.listen(port, () => {
    console.log('Listening on port http://localhost:%d', port)
})