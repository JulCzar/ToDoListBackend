import * as mongoose from 'mongoose'
const express = require('express')
const cors = require('cors')

import routes from './routes'
import { mongoConfig, secrets } from './configs'

const app = express()

mongoose.connect(secrets.MONGO_URL, mongoConfig)

app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(secrets.PORT || 4000)