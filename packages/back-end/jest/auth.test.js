/* eslint-disable no-undef */
const request = require('supertest');
const { PrismaClient } = require('@prisma/client');

// URL de l'API à tester
const URL = 'http://localhost:5001/api/auth';

// eslint-disable-next-line no-undef
describe("Test pour l'enregistrement d'un établissement", () => {
  it("devrait renvoyer une réponse 201 avec les informations utilisateur et un jeton d'accès valide", async () => {
    // Cas où l'enregistrement d'un établissement réussit
    const response = await request(URL).post('/registerEta').send({
      nom: 'LOUCIF',
      prenom: 'Inasse',
      email: 'inasse15@gmail.com',
      tel: '0667391563',
      nomEta: 'La Tartiflette de tls',
      adresse: '3 rue des Potiers',
      password: 'mdp',
      ville: 'toulouse',
      codePostal: '31000',
    });

    // Assertions pour le cas de succès
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Votre compte a bien été créé');
    expect(response.body.data).toBeDefined();
    expect(response.body.token).toBeDefined();
  });

  it('devrait renvoyer une erreur 400 si tous les champs ne sont pas remplis', async () => {
    // Cas où tous les champs ne sont pas remplis
    const response = await request(URL).post('/registerEta').send({});

    // Assertions pour le cas d'une erreur attendue
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Veuillez remplir tous les champs');
  });

  it("devrait renvoyer une erreur 400 si l'adresse email n'est pas valide", async () => {
    // Cas où l'adresse email n'est pas valide
    const response = await request(URL).post('/registerEta').send({
      nom: 'LOUCIF',
      prenom: 'Inasse',
      email: 'inasse.com',
      tel: '0667391563',
      nomEta: 'La Tartiflette de tls',
      adresse: '3 rue des Potiers',
      password: 'mdp',
      ville: 'toulouse',
      codePostal: '31000',
    });

    // Assertions pour le cas d'une erreur attendue
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("L'adresse email n'est pas valide");
  });

  it("devrait renvoyer une erreur 400 si le numéro de téléphone n'est pas valide", async () => {
    // Cas où le numéro de téléphone n'est pas valide
    const response = await request(URL).post('/registerEta').send({
      nom: 'LOUCIF',
      prenom: 'Inasse',
      email: 'inasse15@example.com',
      tel: 'abcd',
      nomEta: 'La Tartiflette de tls',
      adresse: '3 rue des Potiers',
      password: 'mdp',
      ville: 'toulouse',
      codePostal: '31000',
    });

    // Assertions pour le cas d'une erreur attendue
    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "Le numéro de téléphone n'est pas valide",
    );
  });

  it("devrait renvoyer une erreur 400 si l'adresse email ou le numéro de téléphone est déjà utilisé", async () => {
    // Cas où l'adresse email ou le numéro de téléphone est déjà utilisé
    const response = await request(URL).post('/registerEta').send({
      nom: 'LOUCIF',
      prenom: 'Inasse',
      email: 'inasse15@gmail.com',
      tel: '0667391563',
      nomEta: 'La Tartiflette de tls',
      adresse: '3 rue des Potiers',
      password: 'mdp',
      ville: 'toulouse',
      codePostal: '31000',
    });

    // Assertions pour le cas d'une erreur attendue
    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      'Cet adresse email ou ce téléphone est déjà utilisé',
    );
  });

  afterAll(async () => {
    // Nettoyer la base de données après les tests
    const prismaUser = new PrismaClient().User;
    await prismaUser.deleteMany({
      where: {
        mail: 'inasse15@gmail.com',
      },
    });
  });
});

describe("Test pour l'enregistrement d'un utilisateur", () => {
  it("devrait renvoyer une réponse 201 avec les informations utilisateur et un jeton d'accès valide", async () => {
    // Cas où l'enregistrement d'un utilisateur réussit
    const response = await request(URL).post('/register').send({
      nom: 'John',
      prenom: 'Doe',
      email: 'john.doe@example.com',
      tel: '1234567890',
      password: 'mdpp',
    });

    // Assertions pour le cas de succès
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Votre compte a bien été créé');
    expect(response.body.data).toBeDefined();
    expect(response.body.token).toBeDefined();
    expect(response.body.data.nom).toBe('John');
    expect(response.body.data.prenom).toBe('Doe');
    expect(response.body.data.mail).toBe('john.doe@example.com');
    expect(response.body.data.tel).toBe('1234567890');
    expect(response.body.data.password).toBeUndefined();
  });

  it('devrait renvoyer une erreur 400 si tous les champs ne sont pas remplis', async () => {
    // Cas où tous les champs ne sont pas remplis
    const response = await request(URL).post('/register').send({});

    // Assertions pour le cas d'une erreur attendue
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Veuillez remplir tous les champs');
  });

  it("devrait renvoyer une erreur 400 si l'adresse email n'est pas valide", async () => {
    // Cas où l'adresse email n'est pas valide
    const response = await request(URL).post('/register').send({
      nom: 'LOUCIF',
      prenom: 'Inasse',
      email: 'inasse15.com',
      tel: '0667391563',
      password: 'mdp',
    });

    // Assertions pour le cas d'une erreur attendue
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("L'adresse email n'est pas valide");
  });

  it("devrait renvoyer une erreur 400 si le numéro de téléphone n'est pas valide", async () => {
    // Cas où le numéro de téléphone n'est pas valide
    const response = await request(URL).post('/register').send({
      nom: 'LOUCIF',
      prenom: 'Inasse',
      email: 'inasse15@example.com',
      tel: 'fhfhfhffhf',
      password: 'inasse_1234',
    });

    // Assertions pour le cas d'une erreur attendue
    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "Le numéro de téléphone n'est pas valide",
    );
  });

  it("devrait renvoyer une erreur 400 si l'adresse email ou le numéro de téléphone est déjà utilisé", async () => {
    // Cas où l'adresse email ou le numéro de téléphone est déjà utilisé
    const response = await request(URL).post('/register').send({
      nom: 'LOUCIF',
      prenom: 'Inasse',
      email: 'inasse15@example.com',
      tel: '0667391563',
      password: 'inasse_1234',
    });

    // Assertions pour le cas d'une erreur attendue
    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      'Cet adresse email ou ce téléphone est déjà utilisé',
    );
  });
});

// describe('Test pour la connexion d\'un utilisateur', () => {
//   it('devrait renvoyer une réponse 200 avec un jeton d\'accès valide lorsqu\'un utilisateur se connecte avec succès', async () => {
//     const response = await request(URL)
//       .post('/login')
//       .send({
//         mail: 'john.doe@example.com',
//         password: 'password',
//       });

//       expect(response.status).toBe(200);
//       expect(response.body.message).toBe('Vous êtes connecté');
//       expect(response.body.token).toBeDefined();
//       expect(response.body.data).toBeDefined();
//       expect(response.body.data.mail).toBe('john.doe@example.com');
//       expect(response.body.data.password).toBeUndefined();
//   })
//   it('devrait renvoyer une erreur 400 si tous les champs ne sont pas remplis', async () => {
//     const response = await request(URL)
//       .post('/login')
//       .send({

//       });

//       expect(response.status).toBe(400);
//       expect(response.body.message).toBe('Veuillez remplir tous les champs');
//   })
//   it("devrait renvoyer une erreur 400 si l'identifiant de l'utilisateur n'existe pas", async () => {

//     const response = await request(URL)
//       .post('/login')
//       .send({
//         mail:
//   })

//   afterAll(async () => {
//     const prismaUser = new PrismaClient().User;
//     await prismaUser.deleteMany({
//       where: {
//         mail: 'john.doe@example.com',
//         },
//       });
//     });
// })
