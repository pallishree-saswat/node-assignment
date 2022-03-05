const mongoose = require("mongoose");
const { Schema } = mongoose;

const paraSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    index:{
        type:Number,
    },
    blogId:{
        type: Schema.Types.ObjectId,
        ref: 'blog',
        index:true
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { strict: false }
);

module.exports = mongoose.model("para", paraSchema);
