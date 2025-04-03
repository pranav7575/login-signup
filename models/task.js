import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for this task'],
    maxlength: [60, 'Title cannot be more than 60 characters']
  },
  description: {
    type: String,
    required: false
  },
  dueDate: {
    type: Date,
    required: true
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  },
  completed: {
    type: Boolean,
    default: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  notifyBefore: {
    type: Number, // minutes before due date
    default: 30
  }
}, {
  timestamps: true
});

export default mongoose.models.Task || mongoose.model('Task', TaskSchema);