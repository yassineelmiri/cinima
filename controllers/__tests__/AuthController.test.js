const request = require('supertest');
const app = require('../../index');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../../models/User');

describe('AuthController', () => {
  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await User.deleteMany();
  });

  it('devrait inscrire un utilisateur avec succès', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        nom: 'Test User',
        email: 'test@example.com',
        motDePasse: 'password',
        numeroTelephone: '123456789',
        adresse: '123 Test St'
      });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('devrait échouer à inscrire un utilisateur déjà existant', async () => {
    const user = new User({
      nom: 'Test User',
      email: 'test@example.com',
      motDePasse: 'password',
      numeroTelephone: '123456789',
      adresse: '123 Test St'
    });
    await user.save();
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        nom: 'Test User',
        email: 'test@example.com',
        motDePasse: 'password',
        numeroTelephone: '123456789',
        adresse: '123 Test St'
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Utilisateur déjà existant');
  });

  it('devrait connecter un utilisateur avec succès', async () => {
    const user = new User({
      nom: 'Test User',
      email: 'test@example.com',
      motDePasse: await bcrypt.hash('password', 10),
      numeroTelephone: '123456789',
      adresse: '123 Test St'
    });
    await user.save();

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        motDePasse: 'password'
      });
    expect(res.statusCode).status(200);
    expect(res.body).toHaveProperty('token');
  });

  it('devrait échouer à connecter un utilisateur avec un mauvais mot de passe', async () => {
    const user = new User({
      nom: 'Test User',
      email: 'test@example.com',
      motDePasse: await bcrypt.hash('password', 10),
      numeroTelephone: '123456789',
      adresse: '123 Test St'
    });
    await user.save();

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        motDePasse: 'wrongpassword'
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Mot de passe incorrect');
  });
});
