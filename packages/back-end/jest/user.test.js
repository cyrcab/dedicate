const request = require('supertest');
const app = require('./app'); // Remplacez ./app par le chemin vers votre application Express contenant les fonctions getAllUsers, getUser, updateUser, updatePassword et deleteUser

describe("Test de l'API des utilisateurs", () => {
  describe('GET /getAllUsers', () => {
    it('devrait renvoyer une liste de tous les utilisateurs', async () => {
      const response = await request(app).get('/getAllUsers');

      expect(response.status).toBe(200);
      expect(response.body.data).toBeDefined();
      // Ajoutez des assertions supplémentaires ici pour vérifier le contenu de la liste d'utilisateurs.
    });
  });

  describe('GET /getUser/:id', () => {
    it("devrait renvoyer une erreur 404 si l'ID de l'utilisateur n'existe pas", async () => {
      const invalidUserId = 999999; // Remplacez par un ID qui n'existe pas dans votre base de données
      const response = await request(app).get(`/getUser/${invalidUserId}`);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Cet utilisateur n'existe pas");
    });

    it("devrait renvoyer les détails d'un utilisateur spécifique", async () => {
      const userId = 1; // Remplacez par un ID valide d'un utilisateur existant dans votre base de données
      const response = await request(app).get(`/getUser/${userId}`);

      expect(response.status).toBe(200);
      expect(response.body.data).toBeDefined();
      // Ajoutez des assertions supplémentaires ici pour vérifier les détails de l'utilisateur.
    });
  });

  describe('PUT /updateUser/:id', () => {
    it("devrait renvoyer une erreur 404 si l'ID de l'utilisateur n'existe pas", async () => {
      const invalidUserId = 999999; // Remplacez par un ID qui n'existe pas dans votre base de données
      const response = await request(app)
        .put(`/updateUser/${invalidUserId}`)
        .send({
          // Envoyez ici un objet avec les mises à jour que vous souhaitez apporter à l'utilisateur.
        });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Cet utilisateur n'existe pas");
    });

    it("devrait renvoyer une erreur 400 si l'adresse email est invalide", async () => {
      const userId = 1; // Remplacez par l'ID d'un utilisateur existant dans votre base de données que vous souhaitez mettre à jour
      const invalidEmail = 'email.invalide'; // Remplacez par une adresse email invalide
      const response = await request(app)
        .put(`/updateUser/${userId}`)
        .send({ email: invalidEmail });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Email invalide');
    });

    it("devrait mettre à jour les détails d'un utilisateur spécifique", async () => {
      const userId = 1; // Remplacez par l'ID d'un utilisateur existant dans votre base de données que vous souhaitez mettre à jour
      const updatedUser = {
        nom: 'NouveauNom', // Remplacez par le nouveau nom que vous souhaitez donner à l'utilisateur
        prenom: 'NouveauPrenom', // Remplacez par le nouveau prénom que vous souhaitez donner à l'utilisateur
        email: 'nouveau@email.com', // Remplacez par la nouvelle adresse email que vous souhaitez donner à l'utilisateur
        tel: '1234567890', // Remplacez par le nouveau numéro de téléphone que vous souhaitez donner à l'utilisateur
      };
      const response = await request(app)
        .put(`/updateUser/${userId}`)
        .send(updatedUser);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Utilisateur modifié');
      expect(response.body.data).toBeDefined();
      // Ajoutez des assertions supplémentaires ici pour vérifier les détails de l'utilisateur mis à jour.
    });
  });

  describe('PUT /updatePassword/:id', () => {
    it("devrait renvoyer une erreur 404 si l'ID de l'utilisateur n'existe pas", async () => {
      const invalidUserId = 999999; // Remplacez par un ID qui n'existe pas dans votre base de données
      const response = await request(app)
        .put(`/updatePassword/${invalidUserId}`)
        .send({
          // Envoyez ici un objet avec le nouveau mot de passe que vous souhaitez donner à l'utilisateur.
        });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Cet utilisateur n'existe pas");
    });

    it('devrait renvoyer une erreur 400 si le champ "password" est manquant', async () => {
      const userId = 1; // Remplacez par l'ID d'un utilisateur existant dans votre base de données que vous souhaitez mettre à jour
      const response = await request(app).put(`/updatePassword/${userId}`);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Missing field');
    });

    it("devrait mettre à jour le mot de passe d'un utilisateur spécifique", async () => {
      const userId = 1; // Remplacez par l'ID d'un utilisateur existant dans votre base de données que vous souhaitez mettre à jour
      const newPassword = 'NouveauMotDePasse'; // Remplacez par le nouveau mot de passe que vous souhaitez donner à l'utilisateur
      const response = await request(app)
        .put(`/updatePassword/${userId}`)
        .send({ password: newPassword });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Mot de passe modifié');
      // Ajoutez des assertions supplémentaires ici pour vérifier que le mot de passe a été correctement mis à jour.
    });
  });

  describe('DELETE /deleteUser/:id', () => {
    it("devrait renvoyer une erreur 404 si l'ID de l'utilisateur n'existe pas", async () => {
      const invalidUserId = 999999; // Remplacez par un ID qui n'existe pas dans votre base de données
      const response = await request(app).delete(
        `/deleteUser/${invalidUserId}`,
      );

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Cet utilisateur n'existe pas");
    });

    it('devrait supprimer un utilisateur spécifique', async () => {
      const userId = 1; // Remplacez par l'ID d'un utilisateur existant dans votre base de données que vous souhaitez supprimer
      const response = await request(app).delete(`/deleteUser/${userId}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Utilisateur supprimé');
      // Ajoutez des assertions supplémentaires ici pour vérifier que l'utilisateur a été correctement supprimé.
    });
  });
});
