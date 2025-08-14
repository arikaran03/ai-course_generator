import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    // This flexible array will hold our structured content blocks
    // (e.g., {type: 'heading', text: '...'}, {type: 'code', text: '...'})
    content: {
      type: [mongoose.Schema.Types.Mixed],
      default: [], // Default to an empty array
    },
    // This creates a many-to-one relationship back to the Module model.
    module: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Module',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Lesson = mongoose.model('Lesson', lessonSchema);

export default Lesson;