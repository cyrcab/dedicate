const request = require("supertest");
const app = require("../app");

describe("Test auth", () => {
  let authToken;

  beforeEach(async () => {
    const response = await request(app).post("/loginUser").send({
      email: "email@example.com",
      password: "mot-de-passe",
    });

    authToken = response.body.token;
  });

  describe("registerEta", () => {
    it("devrait retourner un code de statut 201 et créer un nouvel utilisateur", async () => {
      const response = await request(app).post("/registerEta").send({
        nom: "nom",
        prenom: "prenom",
        email: "prenom.nom@example.com",
        tel: "1234567890",
        nomEta: "Mon entreprise",
        adresse: "123 rue des exemples",
        password: "mot-de-passe",
      });

      expect(response.statusCode).toBe(201);
      expect(response.body.message).toBe("Votre compte a bien été créé");
    });

    it("devrait retourner un code de statut 400 en cas de champ manquant", async () => {
      const response = await request(app).post("/registerEta").send({
        // Champ manquant
      });

      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe("Veuillez remplir tous les champs");
    });
  });

  describe("register", () => {});

  describe("loginUser", () => {});

  describe("loginEta", () => {});
});
