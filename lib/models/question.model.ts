import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
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
