const prisma = require('@prisma/client');
const { jest, describe, expect, it } = require('jest');
const eventController = require('../controllers/event.controller');

describe('getOne', () => {
  it('should get one event by ID', async () => {
    const req = {
      params: {
        id: '1', 
      },
    };
    const res = {
      status: jest.fn(),
      json: jest.fn(),
    };

    const fakeEvent = {
      id: 1,
      nom: 'Event 1',
      // ... autres propriétés
    };

    prisma.event.findUnique = jest.fn().mockResolvedValue(fakeEvent);

    await eventController.getOne(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Événement récupéré',
      data: fakeEvent,
    });
  });

  it('should handle missing id parameter', async () => {
    const req = {
      params: {},
    };
    const res = {
      status: jest.fn(),
      json: jest.fn(),
    };

    await eventController.getOne(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Veuillez spécifier un événement',
    });
  });

  it('should handle non-existent event', async () => {
    const req = {
      params: {
        id: '999', // ID d'événement non existant
      },
    };
    const res = {
      status: jest.fn(),
      json: jest.fn(),
    };

    prisma.event.findUnique = jest.fn().mockResolvedValue(null);

    await eventController.getOne(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Cet événement n'existe pas",
    });
  });

  it('should handle errors', async () => {
    const req = {
      params: {
        id: '1', 
      },
    };
    const res = {
      status: jest.fn(),
      json: jest.fn(),
    };

    prisma.event.findUnique = jest.fn().mockRejectedValue(new Error('Database error'));

    await eventController.getOne(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
  });
});
