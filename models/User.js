const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userTestSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userTestSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userTestSchema);
