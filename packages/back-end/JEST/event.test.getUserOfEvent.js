const prisma = require('@prisma/client');
const { jest, describe, expect, it } = require('jest');
const eventController = require('../controllers/event.controller');

describe('getUserOfEvents', () => {
  it('should get user information associated with an event', async () => {
    const req = {
      params: {
        idEvent: '1', 
      },
    };
    const res = {
      status: jest.fn(),
      json: jest.fn(),
    };

    const fakeEvent = {
      id: 1,
      // ... autres propriétés de l'événement
    };

    const fakeUser = {
      nom: 'John',
      prenom: 'Doe',
      // ... autres propriétés de l'utilisateur
    };

    prisma.event.findUnique = jest.fn().mockResolvedValue(fakeEvent);

    prisma.event.findUnique.mockImplementationOnce(() => ({
      ...fakeEvent,
      User: fakeUser,
    }));

    await eventController.getUserOfEvents(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Infos événements récupérés',
      data: {
        ...fakeEvent,
        User: fakeUser,
      },
    });
  });

  it('should handle missing idEvent parameter', async () => {
    const req = {
      params: {},
    };
    const res = {
      status: jest.fn(),
      json: jest.fn(),
    };

    await eventController.getUserOfEvents(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Veuillez spécifier un evenement',
    });
  });

  it('should handle non-existent event', async () => {
    const req = {
      params: {
        idEvent: '999', 
      },
    };
    const res = {
      status: jest.fn(),
      json: jest.fn(),
    };

    prisma.event.findUnique = jest.fn().mockResolvedValue(null);

    await eventController.getUserOfEvents(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Cet evenement n'existe pas",
    });
  });

  it('should handle errors', async () => {
    const req = {
      params: {
        idEvent: '1', 
      },
    };
    const res = {
      status: jest.fn(),
      json: jest.fn(),
    };

    prisma.event.findUnique = jest.fn().mockRejectedValue(new Error('Database error'));

    await eventController.getUserOfEvents(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
  });
});
