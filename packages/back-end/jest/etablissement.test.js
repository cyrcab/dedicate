const request = require('supertest');
/* eslint-disable */
const URL = 'http://localhost:5001/api/etablissement';
const { PrismaClient } = require('@prisma/client');

describe("Test de l'API des établissements", () => {
  describe('GET /getAll', () => {
    it("devrait renvoyer une liste d'établissements avec les informations utilisateur et les événements inclus", async () => {
      const response = await request(URL).get('/getAll');

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Etablissements récupérés');
      expect(response.body.data).toBeDefined();
      // Ajoutez des assertions supplémentaires ici pour vérifier le contenu de la liste d'établissements.
    });
  });

  describe('GET /getOne/:id', () => {
    it("devrait renvoyer une erreur 404 si l'ID de l'établissement n'existe pas", async () => {
      const invalidId = 999999; // Remplacez par un ID qui n'existe pas dans votre base de données
      const response = await request(URL).get(`/getOne/${invalidId}`);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Cet établissement n'existe pas");
    });

    it("devrait renvoyer les détails d'un établissement spécifique avec les informations utilisateur et les événements inclus", async () => {
      const etablissementId = 1; // Remplacez par un ID valide d'un établissement existant dans votre base de données
      const response = await request(URL).get(`/getOne/${etablissementId}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Etablissement récupéré');
      expect(response.body.data).toBeDefined();
      // Ajoutez des assertions supplémentaires ici pour vérifier les détails de l'établissement.
    });
  });

  describe('PUT /update/:id', () => {
    it("devrait renvoyer une erreur 404 si l'ID de l'établissement n'existe pas", async () => {
      const invalidId = 23; // Remplacez par un ID qui n'existe pas dans votre base de données
      const response = await request(URL).put(`/update/${invalidId}`).send({
        // Envoyez ici un objet avec les mises à jour que vous souhaitez apporter à l'établissement.
      });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Cet établissement n'existe pas");
    });

    it("devrait mettre à jour les détails d'un établissement spécifique", async () => {
      const etablissementId = 1; // Remplacez par un ID valide d'un établissement existant dans votre base de données
      const updatedData = {
        // Remplacez ceci par les mises à jour que vous souhaitez apporter à l'établissement.
      };
      const response = await request(URL)
        .put(`/update/${etablissementId}`)
        .send(updatedData);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Etablissement modifié');
      expect(response.body.data).toBeDefined();
      // Ajoutez des assertions supplémentaires ici pour vérifier les détails de l'établissement mis à jour.
    });
  });

  describe('DELETE /delete/:id', () => {
    it("devrait renvoyer une erreur 404 si l'ID de l'établissement n'existe pas", async () => {
      const invalidId = 999999; // Remplacez par un ID qui n'existe pas dans votre base de données
      const response = await request(URL).delete(`/delete/${invalidId}`);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Cet établissement n'existe pas");
    });

    it('devrait supprimer un établissement spécifique et mettre à jour les informations utilisateur associées', async () => {
      const etablissementId = 2; // Remplacez par un ID valide d'un établissement existant dans votre base de données
      const response = await request(URL).delete(`/delete/${etablissementId}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Etablissement supprimé');
      // Ajoutez des assertions supplémentaires ici pour vérifier que l'établissement et les informations utilisateur associées ont été supprimés.
    });
  });
});
