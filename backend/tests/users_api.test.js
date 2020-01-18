const mongoose = require('mongoose');
const supertest = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../src/app');
const User = require('../src/models/user');

const api = supertest(app);

describe('Tests that don`t require a user in the database', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  test('user creation returns points, id and token', async () => {
    const response = await api.post('/users')
      .expect(201)
      .expect('Content-Type', /application\/json/);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('points');
    expect(response.body).toHaveProperty('token');
  });
});

describe('Tests that require a user in the database', () => {
  let testUser;
  beforeEach(async () => {
    await User.deleteMany({});
    const userToSave = new User();
    const newUser = await userToSave.save();
    const token = jwt.sign({ id: newUser._id }, process.env.SECRET);
    testUser = { id: newUser._id, token };
  });

  test('authorized user read returns id and points', async () => {
    const response = await api.get(`/users/${testUser.id}`)
      .set('Authorization', `bearer ${testUser.token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('points');
  });

  test('user read by non-existing id returns 404', async () => {
    await User.findByIdAndDelete(testUser.id);
    await api.get(`/users/${testUser.id}`)
      .set('Authorization', `bearer ${testUser.token}`)
      .expect(404);
  });

  test('unauthorized (wrong token) user read returns 401', async () => {
    await api.get(`/users/${testUser.id}`)
      .set('Authorization', 'bearer wronk')
      .expect(401);
  });

  test('unauthorized (no token) user read returns 401', async () => {
    await api.get(`/users/${testUser.id}`)
      .expect(401);
  });

  test('authorized points reset returns id and 20 points', async () => {
    const response = await api.put(`/users/${testUser.id}/reset`)
      .set('Authorization', `bearer ${testUser.token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('points', 20);
  });

  test('user reset by non-existing id returns 404', async () => {
    await User.findByIdAndDelete(testUser.id);
    await api.put(`/users/${testUser.id}/reset`)
      .set('Authorization', `bearer ${testUser.token}`)
      .expect(404);
  });

  test('unauthorized (wrong token) points reset returns 401', async () => {
    await api.put(`/users/${testUser.id}/reset`)
      .set('Authorization', 'bearer wronk')
      .expect(401);
  });

  test('unauthorized (no token) points reset returns 401', async () => {
    await api.put(`/users/${testUser.id}/reset`)
      .expect(401);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
