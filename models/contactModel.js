const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      requried: [true, "Please add a contact name"],
    },
    email: {
      type: String,
      required: [true, "Please add email address"],
    },
    phone: {
      type: String,
      required: [true, "Please add a phone number "],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", contactSchema);
