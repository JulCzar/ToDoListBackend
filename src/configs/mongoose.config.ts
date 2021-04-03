import { ConnectOptions } from 'mongoose'

const mongoConfig: ConnectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
	useFindAndModify: false
}

export default mongoConfig