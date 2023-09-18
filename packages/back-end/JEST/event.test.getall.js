const prisma = require('@prisma/client');
const { jest, describe, expect, it } = require('jest');
const eventController = require('../controllers/event.controller');

describe('getAll', () => {
  it('should get all events', async () => {
    const req = {};
    const res = {
      status: jest.fn(),
      json: jest.fn(),
    };

    const fakeEvents = [
      {
        id: 1,
        nom: 'Event 1',
        // ... autres propriétés
      },
      {
        id: 2,
        nom: 'Event 2',
        // ... autres propriétés
      },
    ];

    prisma.event.findMany = jest.fn().mockResolvedValue(fakeEvents);

    await eventController.getAll(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Événements récupérés',
      data: fakeEvents.map((event) => {
        const { qrCode, ...eventWithoutQRCode } = event;
        return eventWithoutQRCode;
      }),
    });
  });

  it('should handle errors', async () => {
    const req = {};
    const res = {
      status: jest.fn(),
      json: jest.fn(),
    };

    prisma.event.findMany = jest.fn().mockRejectedValue(new Error('Database error'));

    await eventController.getAll(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
  });
});
