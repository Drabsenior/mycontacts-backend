const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
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
