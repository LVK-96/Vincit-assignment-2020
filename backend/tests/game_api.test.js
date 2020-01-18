const mongoose = require('mongoose');
const supertest = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../src/app');
const { setGameStateId } = require('../src/controllers/game');
const User = require('../src/models/user');
const GameState = require('../src/models/gameState');

const api = supertest(app);

describe('Tests that require a single user in the database', () => {
  let testUser;
  beforeEach(async () => {
    await GameState.deleteMany({});
    const gameStateToSave = new GameState();
    const savedState = await gameStateToSave.save();
    setGameStateId(savedState._id);

    await User.deleteMany({});
    const userToSave = new User();
    const newUser = await userToSave.save();
    const token = jwt.sign({ id: newUser._id }, process.env.SECRET);
    testUser = { id: newUser._id, token };
  });

  test('play returns 0 reward and 9 clicks untill next win on first click', async () => {
    const response = await api.post('/game/play')
      .set('Authorization', `bearer ${testUser.token}`)
      .expect(200);
    expect(response.body).toHaveProperty('reward', 0);
    expect(response.body).toHaveProperty('untillNext', 9);
  });

  test('play returns 403 if user has 0 points', async () => {
    await User.findByIdAndUpdate(testUser.id, { points: 0 });
    await api.post('/game/play')
      .set('Authorization', `bearer ${testUser.token}`)
      .expect(403);
  });

  test('play returns 404 for no mathcing game for token', async () => {
    await User.findByIdAndDelete(testUser.id);
    await api.post('/game/play')
      .set('Authorization', `bearer ${testUser.token}`)
      .expect(404);
  });

  test('play returns 401 for unauthorized user (no token)', async () => {
    await User.findByIdAndDelete(testUser.id);
    await api.post('/game/play')
      .expect(401);
  });

  test('play returns 401 for unauthorized user (wrong token)', async () => {
    await User.findByIdAndDelete(testUser.id);
    await api.post('/game/play')
      .set('Authorization', 'bearer wronk')
      .expect(401);
  });
});

describe('Tests that require multiples users in the database', () => {
  let testUsers = [];
  let testUser;
  let lastUserI;
  beforeEach(async () => {
    await GameState.deleteMany({});
    const gameStateToSave = new GameState();
    const savedState = await gameStateToSave.save();
    setGameStateId(savedState._id);

    await User.deleteMany({});
    const promises = [];
    for (let i = 0; i < 100; i++) {
      const userToSave = new User();
      const newUser = userToSave.save();
      promises.push(newUser);
    }
    testUsers = await Promise.all(promises);
    testUsers = testUsers.map((u) => {
      const token = jwt.sign({ id: u._id }, process.env.SECRET);
      return { id: u._id, token };
    });
    lastUserI = 99;

    const userToSave = new User();
    const newUser = await userToSave.save();
    const token = jwt.sign({ id: newUser._id }, process.env.SECRET);
    testUser = { id: newUser._id, token };
  });

  test('play returns 5 reward and 10 clicks untill next win on 10th click', async () => {
    let responses = [];
    for (let i = 0; i < 9; i++) {
      responses.push(api.post('/game/play')
        .set('Authorization', `bearer ${testUsers[i % lastUserI].token}`)
        .expect(200));
    }

    responses = await Promise.all(responses);
    const response = await api.post('/game/play')
      .set('Authorization', `bearer ${testUser.token}`)
      .expect(200);
    expect(response.body).toHaveProperty('reward', 5);
    expect(response.body).toHaveProperty('untillNext', 10);
  });

  test('play returns 40 reward and 10 clicks untill next win on 100th click', async () => {
    let responses = [];
    for (let i = 0; i < 99; i++) {
      responses.push(api.post('/game/play')
        .set('Authorization', `bearer ${testUsers[i % lastUserI].token}`)
        .expect(200));
    }

    responses = await Promise.all(responses);
    const response = await api.post('/game/play')
      .set('Authorization', `bearer ${testUser.token}`)
      .expect(200);
    expect(response.body).toHaveProperty('reward', 40);
    expect(response.body).toHaveProperty('untillNext', 10);
  });

  test('play returns 250 reward and 10 clicks untill next win on 500th click', async () => {
    let responses = [];
    for (let i = 0; i < 499; i++) {
      responses.push(api.post('/game/play')
        .set('Authorization', `bearer ${testUsers[i % lastUserI].token}`)
        .expect(200));
    }

    responses = await Promise.all(responses);
    const response = await api.post('/game/play')
      .set('Authorization', `bearer ${testUser.token}`)
      .expect(200);
    expect(response.body).toHaveProperty('reward', 250);
    expect(response.body).toHaveProperty('untillNext', 10);
  });
});


afterAll(async () => {
  mongoose.connection.close();
});
