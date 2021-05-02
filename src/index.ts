import mongoose from 'mongoose'
import express from 'express'
import cors from 'cors'

import { mongoConfig, secrets } from '~/configs'
import routes from '~/routes'

const app = express()

mongoose.connect(secrets.MONGO_URL, mongoConfig)

app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(secrets.PORT || 4000)