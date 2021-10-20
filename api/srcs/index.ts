import Express from "express";
import bodyParser from 'body-parser'

import './prompt'
import './config'

const app = Express()
app.use(bodyParser.json())

app.get('/', (req, res) => {
	res.send(process.env.ENDPOINT)
})


app.listen(3000, () => {})
