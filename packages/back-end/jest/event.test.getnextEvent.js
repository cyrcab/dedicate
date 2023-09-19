const { DateTime } = require('luxon');
const { prisma } = require('@prisma/client');
const { jest, beforeEach, describe, expect, it, afterEach } = require('jest');
const { getNextEvent } = require('../controllers/event.controller'); 

const mockRequest = (ville = '') => {
  const req = {
    params: { ville },
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  return { req, res };
};

describe('Get Next Event Function', () => {
  beforeEach(async () => {
    await prisma.event.createMany({
      data: [
        {
          nom: 'Événement 1',
          date: DateTime.now().plus({ hours: 3 }).toISO(),
          Etablissement: {
            create: {
              nom: 'Etablissement 1',
              ville: 'Ville 1',
            },
          },
        },
        {
          nom: 'Événement 2',
          date: DateTime.now().plus({ hours: 4 }).toISO(),
          Etablissement: {
            create: {
              nom: 'Etablissement 2',
              ville: 'Ville 2',
            },
          },
        },
      ],
    });
  });

  afterEach(async () => {
    await prisma.event.deleteMany();
  });

  it('devrait récupérer la liste des événements futurs sans spécifier de ville', async () => {
    const { req, res } = mockRequest();

    await getNextEvent(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Liste des événements',
      data: expect.any(Array),
    });
    const responseData = res.json.mock.calls[0][0];
    expect(responseData.data.length).toBe(2);
  });

  it('devrait récupérer la liste des événements futurs pour une ville spécifiée', async () => {
    const { req, res } = mockRequest('Ville 1');

    await getNextEvent(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Liste des événements',
      data: expect.any(Array),
    });
    const responseData = res.json.mock.calls[0][0];
    expect(responseData.data.length).toBe(1);
    expect(responseData.data[0].Etablissement.ville).toBe('Ville 1');
  });

});
