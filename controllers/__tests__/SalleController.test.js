const request = require("supertest");
const app = require("../../index");
const Salle = require("../../models/Salle");
const mongoose = require("mongoose");

describe("SalleController", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Salle.deleteMany({});
  });

  describe("Ajouter une salle", () => {
    it("devrait ajouter une salle avec succès", async () => {
      const res = await request(app).post("/api/salles").send({
        nom: "Salle 1",
        capacite: 100,
        typeSalle: "IMAX",
      });
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("_id");
      expect(res.body.nom).toBe("Salle 1");
    });

    it("devrait échouer si des données sont manquantes", async () => {
      const res = await request(app).post("/api/salles").send({
        nom: "Salle 2",
        capacite: null,
        typeSalle: "Standard",
      });
      expect(res.statusCode).toBe(400);
    });
  });

  describe("Lister les salles", () => {
    it("devrait retourner une liste de salles", async () => {
      const salle = new Salle({
        nom: "Salle 1",
        capacite: 100,
        typeSalle: "IMAX",
      });
      await salle.save();

      const res = await request(app).get("/api/salles");
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveLength(1);
      expect(res.body[0].nom).toBe("Salle 1");
    });
  });

  describe("Modifier une salle", () => {
    it("devrait mettre à jour une salle avec succès", async () => {
      const salle = new Salle({
        nom: "Salle 1",
        capacite: 100,
        typeSalle: "IMAX",
      });
      await salle.save();

      const res = await request(app)
        .put(`/api/salles/${salle._id}`)
        .send({
          nom: "Salle 1 Modifiée",
          capacite: 150,
          typeSalle: "Standard",
        });
      expect(res.statusCode).toBe(200);
      expect(res.body.nom).toBe("Salle 1 Modifiée");
    });

    it("devrait retourner une erreur si la salle n'est pas trouvée", async () => {
      const res = await request(app)
        .put("/api/salles/invalidId")
        .send({ nom: "Salle Inexistante", capacite: 150 });
      expect(res.statusCode).toBe(404);
    });
  });

  describe("Supprimer une salle", () => {
    it("devrait supprimer une salle avec succès", async () => {
      const salle = new Salle({
        nom: "Salle 1",
        capacite: 100,
        typeSalle: "IMAX",
      });
      await salle.save();

      const res = await request(app).delete(`/api/salles/${salle._id}`);
      expect(res.statusCode).toBe(204);

      const getRes = await request(app).get("/api/salles");
      expect(getRes.body).toHaveLength(0);
    });

    it("devrait retourner une erreur si la salle à supprimer n'existe pas", async () => {
      const res = await request(app).delete("/api/salles/invalidId");
      expect(res.statusCode).toBe(404);
    });
  });
});
