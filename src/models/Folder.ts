import mongoose from 'mongoose'

const FolderSchema = new mongoose.Schema({
	name: String,
	user: String
})

export default mongoose.model('folder', FolderSchema)