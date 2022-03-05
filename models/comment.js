const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema({
  comment: {
    type: String,
  },
  paraId: {
    type: Schema.Types.ObjectId,
    ref: "para",
    index: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("comment", commentSchema);
