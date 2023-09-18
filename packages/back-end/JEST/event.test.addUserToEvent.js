const jwt = require('jsonwebtoken');
const prisma = require('@prisma/client'); 
const { jest, describe, expect, it } = require('jest');
const eventController = require('../controllers/event.controller');

describe('addUserToEvent', () => {
  it('should add a user to an event', async () => {
    const req = {
      params: {
        idEvent: '1', 
      },
      headers: {
        authorization: 'Bearer your_jwt_token_here', 
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
      id: 1,
      // ... autres propriétés de l'utilisateur
    };

    const fakeCheckUser = {
      User: [
        {
          id: 1,
        },
        {
          id: 2,
        },
      ],
    };

    prisma.event.findUnique = jest.fn().mockResolvedValue(fakeEvent);

    jwt.verify = jest.fn().mockReturnValue({ id: fakeUser.id });

    prisma.user.findUnique = jest.fn().mockResolvedValue(fakeUser);

    prisma.event.findUnique.mockImplementationOnce(() => fakeCheckUser);

    prisma.event.update = jest.fn().mockResolvedValue(fakeEvent);

    await eventController.addUserToEvent(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Utilisateur ajouté à l'événement",
      data: fakeEvent,
    });
  });

  it('should handle user not found', async () => {
    const req = {
      params: {
        idEvent: '1',
      },
      headers: {
        authorization: 'Bearer your_jwt_token_here',
      },
    };
    const res = {
      status: jest.fn(),
      json: jest.fn(),
    };

    prisma.user.findUnique = jest.fn().mockResolvedValue(null);

    await eventController.addUserToEvent(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Cet utilisateur n'existe pas",
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

    await eventController.addUserToEvent(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Veuillez spécifier un evenement',
    });
  });

});
