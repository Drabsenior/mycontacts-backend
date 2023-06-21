const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
//@desc GET all contacts
//@route Get /api/contacts
//@access public

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.params.id });
  res.status(200).json({ message: "GET ALL CONTACTS", data: contacts });
});

//@desc POST all contacts
//@route post /api/contacts
//@access public
const createContacts = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fileds are mandatory");
  }

  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  res.status(201).json({ message: "CREATE NEW CONTACTS", data: contact });
});

//@desc GET all contacts
//@route get /api/contacts/:id
//@access public
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found!");
  }
  res.status(200).json({ message: "Get contact by id", data: contact });
});
//@desc PUT all contacts
//@route put /api/contacts/:id
//@access public
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update other user contacts");
  }
  const updateContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json({
    message: `UPDATE CONTACT FOR ID:${req.params.id}`,
    data: updateContact,
  });
});
//@desc DELETE all contacts
//@route delete /api/contacts/:id
//@access public
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact Not found");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update other user contacts");
  }
  await Contact.deleteOne({ _id: req.params.id });
  res
    .status(200)
    .json({ message: `DELETE CONTACT FOR ID:${req.params.id}`, data: [] });
});

module.exports = {
  getContacts,
  createContacts,
  getContact,
  updateContact,
  deleteContact,
};
