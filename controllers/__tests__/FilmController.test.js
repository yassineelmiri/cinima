const request = require("supertest");
const app = require("../../index");
const mongoose = require("mongoose");
const Film = require("../../models/Film");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

describe("FilmController", () => {
  let token;

  beforeAll(async () => {
    const adminUser = new User({
      nom: "Admin User",
      email: "admin@example.com",
      motDePasse: await bcrypt.hash("adminpassword", 10),
      numeroTelephone: "123456789",
      adresse: "Admin St",
      role: "administrateur",
    });
    await adminUser.save();

    token = jwt.sign(
      { id: adminUser._id, role: adminUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Film.deleteMany();
  });

  it("devrait ajouter un film", async () => {
    const res = await request(app)
      .post("/api/films")
      .set("Authorization", `Bearer ${token}`)
      .send({
        titre: "Inception",
        description: "Film de science-fiction",
        duree: 148,
        genre: "Science-fiction",
        dateSortie: "2010-07-16",
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("titre", "Inception");
  });

  it("devrait retourner la liste des films", async () => {
    const film = new Film({
      titre: "Inception",
      description: "Film de science-fiction",
      duree: 148,
      genre: "Science-fiction",
      dateSortie: "2010-07-16",
    });
    await film.save();

    const res = await request(app).get("/api/films");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0]).toHaveProperty("titre", "Inception");
  });
});
