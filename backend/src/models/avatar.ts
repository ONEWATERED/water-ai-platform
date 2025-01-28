import mongoose from 'mongoose';

const avatarSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  profileUrl: {
    type: String,
    required: true
  },
  chatUrl: {
    type: String,
    required: true
  },
  specialties: [{
    type: String,
    required: true
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
avatarSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const Avatar = mongoose.model('Avatar', avatarSchema);

export default Avatar;
