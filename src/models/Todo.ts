import mongoose from 'mongoose'

const TodoSchema = new mongoose.Schema({
	completedAt: Date,
	created: Date,
	description: String,
	edited: Date,
	endAt: Date,
	folder: Number,
	status: Boolean,
	title: String,
})

export default mongoose.model('todo', TodoSchema)