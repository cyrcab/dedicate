const { prisma } = require('@prisma/client');
const { jest, beforeEach, describe, expect, it, afterEach } = require('jest');
const { getMyEvent } = require('../controllers/event.controller'); 
 
const mockRequest = (id = '') => {
  const req = {
    params: { id },
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  return { req, res };
};

describe('Get My Event Function', () => {
  beforeEach(async () => {
    await prisma.user.create({
      data: {
        id: 1,
        nom: 'Utilisateur Test',
        events: {
          create: [
            {
              nom: 'Événement 1',
              date: '2023-10-01T12:00:00Z',
              lieu: 'Lieu 1',
            },
            {
              nom: 'Événement 2',
              date: '2023-11-01T14:00:00Z',
              lieu: 'Lieu 2',
            },
          ],
        },
      },
    });
  });

  afterEach(async () => {
    await prisma.user.deleteMany();
  });

  it('devrait récupérer la liste des événements pour un utilisateur existant', async () => {
    const { req, res } = mockRequest(1);

    await getMyEvent(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Liste des événements',
      data: expect.any(Object),
    });
    const responseData = res.json.mock.calls[0][0];
    expect(responseData.data.events.length).toBe(2);
  });

  it("devrait renvoyer une erreur si l'utilisateur n'existe pas", async () => {
    const { req, res } = mockRequest(999);

    await getMyEvent(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Cet utilisateur n'existe pas",
    });
  });

});
