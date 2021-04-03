import express from 'express'
import mongoose from 'mongoose'
import routes from './routes'

import { mongoConfig, secrets } from './configs'

const app = express()

mongoose.connect(secrets.MONGO_URL, mongoConfig)

app.use(express.json())
app.use(routes)

app.listen(secrets.PORT || 4000)