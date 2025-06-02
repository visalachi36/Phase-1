// controllers/contactController.js
import Contact from '../models/contactModel.js';

/**
 * @desc    Add a new contact
 * @route   POST /api/contacts
 * @access  Public
 */
export const addContact = async (req, res) => {
  const { name, email, phone, address, group } = req.body;

  // Validate required fields
  if (!name || !email || !phone) {
    return res.status(400).json({ message: 'Name, email, and phone are required.' });
  }

  try {
    const newContact = new Contact({ name, email, phone, address, group });
    const savedContact = await newContact.save();
    res.status(201).json(savedContact);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * @desc    Get all contacts
 * @route   GET /api/contacts
 * @access  Public
 */
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ name: 1 });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * @desc    Search contacts by name, email, or group
 * @route   GET /api/contacts/search
 * @access  Public
 */
export const searchContacts = async (req, res) => {
  const { name, email, group } = req.query;
  const query = {};

  if (name) query.name = new RegExp(name, 'i'); // Case-insensitive regex search
  if (email) query.email = new RegExp(email, 'i');
  if (group) query.group = new RegExp(group, 'i');

  try {
    const contacts = await Contact.find(query);
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * @desc    Update a contact by ID
 * @route   PUT /api/contacts/:id
 * @access  Public
 */
export const updateContact = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, address, group } = req.body;

  // Validate required fields
  if (!name || !email || !phone) {
    return res.status(400).json({ message: 'Name, email, and phone are required.' });
  }

  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      { name, email, phone, address, group },
      { new: true, runValidators: true }
    );

    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found.' });
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * @desc    Delete a contact by ID
 * @route   DELETE /api/contacts/:id
 * @access  Public
 */
export const deleteContact = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedContact = await Contact.findByIdAndDelete(id);

    if (!deletedContact) {
      return res.status(404).json({ message: 'Contact not found.' });
    }

    res.status(200).json({ message: 'Contact deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
