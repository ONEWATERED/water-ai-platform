import mongoose from 'mongoose';

const webinarSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  duration: {
    type: Number, // in minutes
    required: true
  },
  coverImage: {
    type: String,
    required: true
  },
  speakers: [{
    name: String,
    title: String,
    company: String,
    image: String
  }],
  topics: [{
    type: String
  }],
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    required: true
  },
  registrationLink: {
    type: String,
    required: true
  },
  maxAttendees: {
    type: Number,
    required: true
  },
  currentAttendees: {
    type: Number,
    default: 0
  },
  tags: [{
    type: String
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
webinarSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const Webinar = mongoose.model('Webinar', webinarSchema);

export default Webinar;
