import mongoose from 'mongoose'

const mongoConfig: mongoose.ConnectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

export default mongoConfig