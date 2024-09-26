const request = require("supertest");
const app = require("../../index");
const mongoose = require("mongoose");
const Reservation = require("../../models/Reservation");
const Seance = require("../../models/Seance");
const User = require("../../models/User");

describe("ReservationController", () => {
  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Reservation.deleteMany();
    await Seance.deleteMany();
    await User.deleteMany();
  });

  it("devrait permettre de faire une réservation", async () => {
    const user = new User({
      nom: "Test User",
      email: "test@example.com",
      motDePasse: "password",
      numeroTelephone: "123456789", 
      adresse: "123 Test St", 
      role: "administrateur" 
    });
    await client.save();

    const seance = new Seance({ date: new Date(), film: "Inception" });
    await seance.save();

    const token = user.generateAuthToken(); 
    const res = await request(app)
      .post("/api/reservations")
      .set("Authorization", `Bearer ${token}`)
      .send({ seance: seance._id, places: 2 });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("places", 2);
  });

  it("devrait annuler une réservation", async () => {
    const user = new User({
      nom: "Test User",
      email: "test@example.com",
      motDePasse: "password",
      numeroTelephone: "123456789",
      adresse: "123 Test St",
      role: "administrateur"
    });
    await user.save();

    const seance = new Seance({ date: new Date(), film: "Inception" });
    await seance.save();

    const reservation = new Reservation({
      client: user._id,
      seance: seance._id,
      places: 2,
    });
    await reservation.save();

    const res = await request(app).delete(`/api/reservations/${reservation._id}`);
    expect(res.statusCode).toBe(204);
  });
});
