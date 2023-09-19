/* eslint-disable no-undef */
const request = require('supertest');
const { PrismaClient } = require('@prisma/client');
// eslint-disable-next-line import/no-unresolved
const app = require('http://localhost:5001/api/events'); // Assurez-vous de spécifier le bon chemin vers votre fichier d'application.

const prisma = new PrismaClient();

describe("Test du contrôleur d'événements", () => {
  afterAll(async () => {
    await prisma.$disconnect(); // Fermer la connexion à la base de données après les tests.
  });

  describe('POST /create', () => {
    it('devrait créer un événement avec des données valides', async () => {
      // Préparez les données nécessaires pour le test (par exemple, un utilisateur authentifié, des images, etc.).

      // Appelez l'API pour créer un événement
      const response = await request(app)
        .post('/create')
        .set('Authorization', 'Bearer VOTRE_JWT') // Remplacez VOTRE_JWT par un JWT valide
        .field('nom', "Nom de l'événement")
        .field('lieu', "Lieu de l'événement")
        .field('date', '20/12/2023 18:00:00') // Format de date à adapter
        .field('type', "Type de l'événement")
        .field('prix', '10.99') // Prix à adapter
        .field('nbSlots', '100') // Nombre de slots à adapter
        .field('description', "Description de l'événement")
        .attach('images', 'chemin-vers-votre-image.jpg'); // Remplacez par le chemin de votre image

      // Assurez-vous que la création de l'événement a réussi
      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Événement créé');
      expect(response.body.data).toBeDefined();
      // Vérifiez d'autres détails de l'événement ici
    });

    it('devrait renvoyer une erreur 400 en cas de données manquantes', async () => {
      // Appelez l'API avec des données manquantes
      const response = await request(app)
        .post('/create')
        .set('Authorization', 'Bearer VOTRE_JWT')
        .field('nom', "Nom de l'événement");
      // Autres champs manquants à adapter

      // Assurez-vous que l'API renvoie une erreur 400
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Veuillez remplir tous les champs');
    });

    // Ajoutez d'autres tests pour couvrir d'autres cas de figure (par exemple, date invalide, prix négatif, etc.).
  });

  describe('GET /getAll', () => {
    it('devrait récupérer tous les événements', async () => {
      // Créez des événements de test dans la base de données

      // Appelez l'API pour récupérer tous les événements
      const response = await request(app).get('/getAll');

      // Assurez-vous que la récupération des événements a réussi
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Événements récupérés');
      expect(response.body.data).toBeDefined();
      // Vérifiez le format des données renvoyées
    });

    // Ajoutez d'autres tests pour couvrir d'autres cas de figure (par exemple, aucun événement dans la base de données).
  });

  // Ajoutez des tests similaires pour les autres fonctions du contrôleur (par exemple, getAllOfCompany, getOne, addUserToEvent, update, delete, etc.).
});
