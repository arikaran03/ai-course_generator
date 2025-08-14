import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        trim : true,
    },
    description: {
      type: String,
      required: true,
    },
    // We will use a placeholder ID for now. Later, this will be the Auth0 user ID.
    creator: {
      type: String,
      required: true,
    },
    // This creates a one-to-many relationship with the Module model.
    // It stores an array of Module ObjectIds.
    modules: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Module',
      },
    ],
    },
    {
        timestamps: true,
    }
); 

const Course = mongoose.model('Course', courseSchema);

export default Course;