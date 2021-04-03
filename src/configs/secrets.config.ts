import * as dotenv from 'dotenv'

dotenv.config()

const secrets = {
  MONGO_URL: process.env.MONGO_URL ?? '',
  PORT: process.env.PORT ?? ''
}

export default secrets