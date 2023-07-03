const {
  registerEta,
  register,
  loginUser,
  loginEta,
} = require("auth.controller.js");

// Exemple de test pour la fonction register
describe("register", () => {
  test('should create a new user with role "User" and return a success message', async () => {
    // Définir le corps de la requête
    const req = {
      body: {
        nom: "John",
        prenom: "Doe",
        email: "john.doe@example.com",
        tel: "1234567890",
        password: "mypassword",
      },
    };

    // Définir la réponse attendue
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Appeler la fonction de test
    await register(req, res);

    // Vérifier la réponse
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Votre compte a bien été créé",
      data: expect.any(Object),
      token: expect.any(String),
    });
  });
});

// Exemple de test pour la fonction loginUser
describe("loginUser", () => {
  test("should login a user with valid credentials and return a success message", async () => {
    // Définir le corps de la requête
    const req = {
      body: {
        email: "john.doe@example.com",
        password: "mypassword",
      },
    };

    // Définir la réponse attendue
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Appeler la fonction de test
    await loginUser(req, res);

    // Vérifier la réponse
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Vous êtes connecté",
      token: expect.any(String),
      data: expect.any(Object),
    });
  });
});

// Exemple de test pour la fonction loginEta
describe("loginEta", () => {
  test("should login an Eta with valid credentials and return a success message", async () => {
    // Définir le corps de la requête
    const req = {
      body: {
        email: "john.doe@example.com",
        password: "mypassword",
      },
    };

    // Définir la réponse attendue
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Appeler la fonction de test
    await loginEta(req, res);

    // Vérifier la réponse
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Vous êtes connecté",
      token: expect.any(String),
      data: expect.any(Object),
      refRole: expect.any(Number),
    });
  });
});
