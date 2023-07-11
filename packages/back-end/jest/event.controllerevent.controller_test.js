const request = require("supertest");
const app = require("../app");

describe("Test de l'API", () => {
  let authToken;

  beforeEach(async () => {
    const response = await request(app).post("/loginUser").send({
      email: "email@example.com",
      password: "mot-de-passe",
    });

    authToken = response.body.token;
  });

  describe("create", () => {
    it("devrait retourner un code de statut 201 et créer un nouvel événement", async () => {
      const response = await request(app)
        .post("/create")
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          nom: "Mon événement",
          lieu: "Lieu de l'événement",
          date: "01/01/2023 12:00:00",
          type: "Type d'événement",
          prix: 10,
          nbSlots: 100,
          idEtablissement: 1,
        });

      expect(response.statusCode).toBe(201);
      expect(response.body.message).toBe("Événement créé");
      // Vérifiez d'autres assertions si nécessaire
    });

    it("devrait retourner un code de statut 400 en cas de champ manquant", async () => {
      const response = await request(app)
        .post("/create")
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          // Champ manquant
        });

      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe("Veuillez remplir tous les champs");
    });
  });

  describe("getAll", () => {});

  describe("getAllOfCompany", () => {});

  describe("getOne", () => {});

  describe("getUserOfEvents", () => {});

  describe("getMusiqueOfEvent", () => {});

  describe("addUserToEvent", () => {});

  describe("update", () => {});
});
