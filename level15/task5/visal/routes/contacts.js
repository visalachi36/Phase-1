// routes/contact.js
import express from 'express';
import {
  addContact,
  getAllContacts,
  searchContacts,
  updateContact,
  deleteContact
} from '../controllers/contactController.js';

const router = express.Router();

// Add a new contact
router.post('/', addContact);

// Get all contacts
router.get('/', getAllContacts);

// Search contacts by query (?name= or ?email= or ?group= etc.)
router.get('/search', searchContacts);

// Update a contact by ID
router.put('/:id', updateContact);

// Delete a contact by ID
router.delete('/:id', deleteContact);

export default router;
