const request = require('supertest');
/* eslint-disable */
const URL = 'http://localhost:5001/api/auth';
const { PrismaClient } = require('@prisma/client');

describe("Test pour l'enregistrement d'un etablissement", () => {
  it("devrait renvoyer une réponse 201 avec les informations utilisateur et un jeton d'accès valide", async () => {
    const response = await request(URL)
      .post('/registerEta')
      .send({
        nom: 'John',
        prenom: 'Doe',
        email: 'john.doe2@example.com',
        tel: '1234567891',
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
        email: 'john.doe2',
        tel: '1234567891',
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
        email: 'john.doe2@example.com',
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
        email: 'john.doe2@example.com',
        tel: '1234567891',
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
    const prismaUser = new PrismaClient().User;
    await prismaUser.deleteMany({
      where: {
        mail: 'john.doe2@example.com',
      },
    });
  });
});

describe("Test pour l'enregistrement d'un utilisateur", () => {
  it("devrait renvoyer une réponse 201 avec les informations utilisateur et un jeton d'accès valide", async () => {
    const response = await request(URL)
      .post('/register')
      .send({
        nom: 'John',
        prenom: 'Doe',
        email: 'john.doe@example.com',
        tel: '1234567890',
        password: 'password',
      });
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
    const response = await request(URL)
      .post('/register')
      .send({

      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Veuillez remplir tous les champs');
  });
  it("devrait renvoyer une erreur 400 si l'adresse email n'est pas valide", async () => {
    const response = await request(URL)
      .post('/register')
      .send({
        nom: 'John',
        prenom: 'Doe',
        email: 'john.doe',
        tel: '1234567890',
        password: 'password',
      });
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("L'adresse email n'est pas valide");
  });
  it("devrait renvoyer une erreur 400 si le numéro de téléphone n'est pas valide", async () => {
    const response = await request(URL)
      .post('/register')
      .send({
        nom: 'John',
        prenom: 'Doe',
        email: 'john.doe@example.com',
        tel: '123',
        password: 'password',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Le numéro de téléphone n'est pas valide");
  });

  it('devrait renvoyer une erreur 400 si l\'adresse email ou le numéro de téléphone est déjà utilisé', async () => {
    const response = await request(URL)
      .post('/register')
      .send({
        nom: 'John',
        prenom: 'Doe',
        email: 'john.doe@example.com',
        tel: '1234567890',
        password: 'password',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Cet adresse email ou ce téléphone est déjà utilisé');
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
