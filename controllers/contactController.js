const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
//@desc GET all contacts
//@route Get /api/contacts
//@access public

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
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
  });
  res.status(201).json({ message: "CREATE NEW CONTACTS", data: contact });
});

//@desc GET all contacts
//@route get /api/contacts/:id
//@access public
const getContact = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `GET CONTACT FOR ID:${req.params.id}` });
});
//@desc PUT all contacts
//@route put /api/contacts/:id
//@access public
const updateContact = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `UPDATE CONTACT FOR ID:${req.params.id}` });
});
//@desc DELETE all contacts
//@route delete /api/contacts/:id
//@access public
const deleteContact = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `DELETE CONTACT FOR ID:${req.params.id}` });
});

module.exports = {
  getContacts,
  createContacts,
  getContact,
  updateContact,
  deleteContact,
};
