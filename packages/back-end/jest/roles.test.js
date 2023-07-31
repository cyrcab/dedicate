const request = require('supertest');
const app = require('./app'); // Remplacez ./app par le chemin vers votre application Express contenant les fonctions createRole, getRoles, getRole, updateRole et deleteRole

describe("Test de l'API des rôles", () => {
  describe('POST /createRole', () => {
    it('devrait renvoyer une erreur 400 si le champ "nom" est manquant', async () => {
      const response = await request(app).post('/createRole').send({
        // Envoyez ici un objet qui manque le champ "nom".
      });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Veuillez remplir tous les champs');
    });

    it('devrait renvoyer une erreur 400 si le rôle existe déjà', async () => {
      const existingRoleName = 'Admin'; // Remplacez par le nom d'un rôle existant dans votre base de données
      const response = await request(app)
        .post('/createRole')
        .send({ nom: existingRoleName });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Ce rôle existe déjà');
    });

    it('devrait créer un nouveau rôle avec succès', async () => {
      const newRoleName = 'NouveauRole'; // Remplacez par un nom de rôle valide qui n'existe pas déjà dans votre base de données
      const response = await request(app)
        .post('/createRole')
        .send({ nom: newRoleName });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Le rôle a bien été créé');
      expect(response.body.data).toBeDefined();
      // Ajoutez des assertions supplémentaires ici pour vérifier que le rôle a été correctement créé.
    });
  });

  describe('GET /getRoles', () => {
    it('devrait renvoyer une liste de tous les rôles', async () => {
      const response = await request(app).get('/getRoles');

      expect(response.status).toBe(200);
      expect(response.body.data).toBeDefined();
      // Ajoutez des assertions supplémentaires ici pour vérifier le contenu de la liste de rôles.
    });
  });

  describe('GET /getRole/:id', () => {
    it("devrait renvoyer une erreur 404 si l'ID du rôle n'existe pas", async () => {
      const invalidRoleId = 999999; // Remplacez par un ID qui n'existe pas dans votre base de données
      const response = await request(app).get(`/getRole/${invalidRoleId}`);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Ce rôle n'existe pas");
    });

    it("devrait renvoyer les détails d'un rôle spécifique", async () => {
      const roleId = 1; // Remplacez par un ID valide d'un rôle existant dans votre base de données
      const response = await request(app).get(`/getRole/${roleId}`);

      expect(response.status).toBe(200);
      expect(response.body.data).toBeDefined();
      // Ajoutez des assertions supplémentaires ici pour vérifier les détails du rôle.
    });
  });

  describe('PUT /updateRole/:id', () => {
    it("devrait renvoyer une erreur 404 si l'ID du rôle n'existe pas", async () => {
      const invalidRoleId = 999999; // Remplacez par un ID qui n'existe pas dans votre base de données
      const response = await request(app)
        .put(`/updateRole/${invalidRoleId}`)
        .send({
          // Envoyez ici un objet avec les mises à jour que vous souhaitez apporter au rôle.
        });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Ce rôle n'existe pas");
    });

    it('devrait renvoyer une erreur 400 si le rôle ne peut pas être modifié', async () => {
      const roleId = 1; // Remplacez par l'ID d'un rôle qui ne peut pas être modifié selon la logique de votre application
      const response = await request(app).put(`/updateRole/${roleId}`).send({
        // Envoyez ici un objet avec les mises à jour que vous souhaitez apporter au rôle.
      });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Vous ne pouvez pas modifier ce rôle');
    });

    it("devrait mettre à jour les détails d'un rôle spécifique", async () => {
      const roleId = 3; // Remplacez par l'ID d'un rôle existant dans votre base de données qui peut être modifié
      const updatedRoleName = 'RoleModifie'; // Remplacez par le nom mis à jour que vous souhaitez donner au rôle
      const response = await request(app)
        .put(`/updateRole/${roleId}`)
        .send({ nom: updatedRoleName });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Le rôle a bien été modifié');
      expect(response.body.data).toBeDefined();
      // Ajoutez des assertions supplémentaires ici pour vérifier les détails du rôle mis à jour.
    });
  });

  describe('DELETE /deleteRole/:id', () => {
    it("devrait renvoyer une erreur 400 si l'ID du rôle ne peut pas être supprimé", async () => {
      const roleId = 1; // Remplacez par l'ID d'un rôle qui ne peut pas être supprimé selon la logique de votre application
      const response = await request(app).delete(`/deleteRole/${roleId}`);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe(
        'Vous ne pouvez pas supprimer ce rôle',
      );
    });

    it("devrait renvoyer une erreur 404 si l'ID du rôle n'existe pas", async () => {
      const invalidRoleId = 999999; // Remplacez par un ID qui n'existe pas dans votre base de données
      const response = await request(app).delete(
        `/deleteRole/${invalidRoleId}`,
      );

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Ce rôle n'existe pas");
    });

    it('devrait supprimer un rôle spécifique', async () => {
      const roleId = 3; // Remplacez par l'ID d'un rôle existant dans votre base de données qui peut être supprimé
      const response = await request(app).delete(`/deleteRole/${roleId}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Le rôle a bien été supprimé');
      // Ajoutez des assertions supplémentaires ici pour vérifier que le rôle a été supprimé.
    });
  });
});
