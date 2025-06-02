const { ObjectId } = require('mongodb');
const { getCollection } = require('../utils/db');

exports.createEntry = async (req, res) => {
  try {
    const { title, content, date, tags = [] } = req.body;
    if (!title || !content || !date) {
      return res.status(400).json({ error: 'Title, content, and date are required' });
    }
    const collection = getCollection();
    const entry = { title, content, date: new Date(date), tags };
    const result = await collection.insertOne(entry);
    res.status(201).json({ message: 'Entry created', id: result.insertedId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create entry' });
  }
};

exports.getEntries = async (req, res) => {
  try {
    const { title, date, tags } = req.query;
    const filter = {};

    if (title) {
      filter.title = { $regex: title, $options: 'i' };
    }
    if (date) {
      const start = new Date(date);
      const end = new Date(date);
      end.setDate(end.getDate() + 1);
      filter.date = { $gte: start, $lt: end };
    }
    if (tags) {
      const tagsArray = tags.split(',').map(t => t.trim());
      filter.tags = { $all: tagsArray };
    }

    const collection = getCollection();
    const entries = await collection.find(filter).toArray();
    res.json(entries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch entries' });
  }
};

exports.getEntryById = async (req, res) => {
  try {
    const { id } = req.params;
    const collection = getCollection();
    const entry = await collection.findOne({ _id: new ObjectId(id) });
    if (!entry) return res.status(404).json({ error: 'Entry not found' });
    res.json(entry);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch entry' });
  }
};

exports.updateEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, date, tags } = req.body;

    const updateData = {};
    if (title) updateData.title = title;
    if (content) updateData.content = content;
    if (date) updateData.date = new Date(date);
    if (tags) updateData.tags = tags;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: 'At least one field must be provided for update' });
    }

    const collection = getCollection();
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Entry not found' });
    }
    res.json({ message: 'Entry updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update entry' });
  }
};

exports.deleteEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const collection = getCollection();
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Entry not found' });
    }
    res.json({ message: 'Entry deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete entry' });
  }
};
