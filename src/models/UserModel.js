import mongoose from 'mongoose'
import findOrCreate from 'mongoose-findorcreate'

const UserSchema = new mongoose.Schema({
  chatId: { type: Number, required: true },
  sub: {
    type: Boolean,
    default: true
  }
})

UserSchema.plugin(findOrCreate)

export const User = mongoose.model('User', UserSchema)
