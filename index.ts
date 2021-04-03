const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')

import { mongoConfig, secrets } from './src/configs'
import routes from './src/routes'

const app = express()

mongoose.connect(secrets.MONGO_URL, mongoConfig)

app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(secrets.PORT || 4000)