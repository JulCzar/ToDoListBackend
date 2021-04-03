import * as mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
	name: String,
	lastName: String,
	password: String,
	email: String
})

export default mongoose.model('user', UserSchema)