import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  link: { type: String, required: true },
  date: { type: Date, required: true },
  text: { type: String, required: true }
})

export const Post = mongoose.model('Post', PostSchema)
