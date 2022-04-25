const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required!'],
    minlength: [3, 'Username must be at least 3 characters long.'],
    unique: [true, 'Username must be unique.'],
  },
  name: String,
  passwordHash: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
    },
  ],
});

userSchema.set('toJSON', {
  transform: (document, returedObj) => {
    returedObj.id = returedObj._id.toString();
    delete returedObj._id;
    delete returedObj.__v;
    delete returedObj.passwordHash;
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
