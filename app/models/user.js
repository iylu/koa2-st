const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: { type: String, unique: true },
    name: String,
    pwd: String
  },
  {
    versionKey: false,
    timestamps: true // createdAt and updatedAt fields to schema
    // timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

module.exports = mongoose.model('User', UserSchema);
