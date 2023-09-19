const request = require('supertest');
/* eslint-disable */
const URL = 'http://localhost:5001/api/enchere';
const { PrismaClient } = require('@prisma/client');

describe("Test de l'API d'enchères", () => {
  describe('POST /vote', () => {
    it('devrait renvoyer une erreur 400 si des informations sont manquantes', async () => {
      const response = await request(URL).post('/vote').send({
        // Envoyez ici un objet qui manque des informations requises pour l'enchère.
      });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Il manque des informations');
    });

    it("devrait renvoyer une erreur 404 si l'utilisateur ou l'événement n'existe pas", async () => {
      const response = await request(URL).post('/vote').send({
        // Envoyez ici un objet avec des IDs d'utilisateur et d'événement inexistants.
      });

      expect(response.status).toBe(404);
      // eslint-disable-next-line no-undef
      expect(response.body.message).toMatch(
        /Cet utilisateur n'existe pas|Cet événement n'existe pas/,
      );
    });

    // Ajoutez ici d'autres tests pour couvrir d'autres cas de figure en fonction de la logique de vote de votre application.
    // Par exemple, les tests pour les enchères, les validations de musique, etc.
  });

  describe('GET /getVotes/:id', () => {
    it("devrait renvoyer une erreur 400 si l'ID de l'événement est manquant", async () => {
      const response = await request(URL).get('/getVotes');

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Il manque des informations');
    });

    it("devrait renvoyer une liste d'enchères triées par prix décroissant pour l'ID d'événement donné", async () => {
      // Créez ici des enchères de test pour l'événement donné, puis appelez l'API pour obtenir les enchères pour cet événement.
      // Assurez-vous que les enchères sont triées par prix décroissant.
      // Exemple : const enchereResponse = await request(app).post('/createEnchere').send({ ... });
      //           const eventId = enchereResponse.body.eventId;
      //           const votesResponse = await request(app).get(`/getVotes/${eventId}`);
      //           expect(votesResponse.status).toBe(200);
      //           expect(votesResponse.body.votes).toHaveLength(2);
      //           expect(votesResponse.body.votes[0].prix).toBeGreaterThanOrEqual(votesResponse.body.votes[1].prix);
    });
  });
});
