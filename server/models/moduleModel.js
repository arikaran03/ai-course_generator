import mongoose from 'mongoose';

const moduleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    // This creates a many-to-one relationship back to the Course model.
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    // This creates a one-to-many relationship with the Lesson model.
    lessons: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Module = mongoose.model('Module', moduleSchema);

export default Module;