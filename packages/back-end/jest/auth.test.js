const request = require('supertest');
/* eslint-disable no-undef */
const URL = 'http://localhost:5001/api/auth';
const { PrismaClient } = require('@prisma/client');

describe("Test pour l'enregistrement d'un etablissement", () => {
  it("devrait renvoyer une réponse 201 avec les informations utilisateur et un jeton d'accès valide", async () => {
    const response = await request(URL)
      .post('/registerEta')
      .send({
        nom: 'John',
        prenom: 'Doe',
        email: 'john.doe@example.com',
        tel: '1234567890',
        nomEta: 'Mon entreprise',
        adresse: '123 rue des entreprises',
        password: 'password',
        ville: 'Ville',
        codePostal: '12345',
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Votre compte a bien été créé');
    expect(response.body.data).toBeDefined();
    expect(response.body.token).toBeDefined();
  });

  it('devrait renvoyer une erreur 400 si tous les champs ne sont pas remplis', async () => {
    const response = await request(URL)
      .post('/registerEta')
      .send({

      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Veuillez remplir tous les champs');
  });

  it("devrait renvoyer une erreur 400 si l'adresse email n'est pas valide", async () => {
    const response = await request(URL)
      .post('/registerEta')
      .send({
        nom: 'John',
        prenom: 'Doe',
        email: 'john.doe',
        tel: '1234567890',
        nomEta: 'Mon entreprise',
        adresse: '123 rue des entreprises',
        password: 'password',
        ville: 'Ville',
        codePostal: '12345',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("L'adresse email n'est pas valide");
  });

  it("devrait renvoyer une erreur 400 si le numéro de téléphone n'est pas valide", async () => {
    const response = await request(URL)
      .post('/registerEta')
      .send({
        nom: 'John',
        prenom: 'Doe',
        email: 'john.doe@example.com',
        tel: '123',
        nomEta: 'Mon entreprise',
        adresse: '123 rue des entreprises',
        password: 'password',
        ville: 'Ville',
        codePostal: '12345',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Le numéro de téléphone n'est pas valide");
  });

  it('devrait renvoyer une erreur 400 si l\'adresse email ou le numéro de téléphone est déjà utilisé', async () => {
    const response = await request(URL)
      .post('/registerEta')
      .send({
        nom: 'John',
        prenom: 'Doe',
        email: 'john.doe@example.com',
        tel: '1234567890',
        nomEta: 'Mon entreprise',
        adresse: '123 rue des entreprises',
        password: 'password',
        ville: 'Ville',
        codePostal: '12345',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Cet adresse email ou ce téléphone est déjà utilisé');
  });
  afterAll(async () => {
    await PrismaClient.User.deleteMany({
      where: {
        nom: 'John',
        prenom: 'Doe',
        email: 'john.doe@example.com',
      },
    });
  });
});
