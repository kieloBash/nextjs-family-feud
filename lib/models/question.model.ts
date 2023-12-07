import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answers: [
    {
      answer: {
        type: String,
        required: true,
      },
      score: {
        type: Number,
        required: true,
      },
    },
  ],
});

const Question =
  mongoose.models.question || mongoose.model("question", questionSchema);
export default Question;
