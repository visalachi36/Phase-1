const request = require('supertest');
const express = require('express');
const app = require('../app'); // Make sure to export `app` in app.js
const { MongoClient } = require('mongodb');

let db;
let testEntryId;

beforeAll(async () => {
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  db = client.db('digitaljournal');
});

afterAll(async () => {
  await db.collection('journalDB').deleteMany({ title: /Test Entry/ }); // Clean test data
});

describe('Journal API', () => {
  test('Create a new journal entry', async () => {
    const res = await request(app)
      .post('/entries')
      .send({
        title: 'Test Entry 1',
        content: 'This is a test journal entry.',
        date: '2025-06-01',
        tags: ['test', 'journal']
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    testEntryId = res.body.id;
  });

  test('Get all journal entries', async () => {
    const res = await request(app).get('/entries');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('Get journal entry by ID', async () => {
    const res = await request(app).get(`/entries/${testEntryId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('title', 'Test Entry 1');
  });

  test('Update a journal entry', async () => {
    const res = await request(app)
      .put(`/entries/${testEntryId}`)
      .send({ title: 'Updated Test Entry' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Entry updated');
  });

  test('Delete a journal entry', async () => {
    const res = await request(app).delete(`/entries/${testEntryId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Entry deleted');
  });
});
