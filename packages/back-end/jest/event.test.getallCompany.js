const prisma = require('@prisma/client');
const { jest, describe, expect, it } = require('jest');
const eventController = require('../controllers/event.controller');

describe('getAllOfCompany', () => {
  it('should get all events of a company', async () => {
    const req = {
      params: {
        idEtablissement: '1',
      },
    };
    const res = {
      status: jest.fn(),
      json: jest.fn(),
    };

    const fakeEtablissement = {
      id: 1,
      nom: 'Etablissement 1',
      // ... autres propriétés
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

    prisma.etablissement.findUnique = jest.fn().mockResolvedValue(fakeEtablissement);

    prisma.event.findMany = jest.fn().mockResolvedValue(fakeEvents);

    await eventController.getAllOfCompany(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Événements récupérés',
      data: fakeEvents.map((event) => {
        const { qrCode, ...eventWithoutQRCode } = event;
        return eventWithoutQRCode;
      }),
    });
  });

  it('should handle missing idEtablissement parameter', async () => {
    const req = {
      params: {},
    };
    const res = {
      status: jest.fn(),
      json: jest.fn(),
    };

    await eventController.getAllOfCompany(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Veuillez spécifier un établissement',
    });
  });

  it('should handle non-existent company', async () => {
    const req = {
      params: {
        idEtablissement: '999',
      },
    };
    const res = {
      status: jest.fn(),
      json: jest.fn(),
    };

    prisma.etablissement.findUnique = jest.fn().mockResolvedValue(null);

    await eventController.getAllOfCompany(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Cet établissement n'existe pas",
    });
  });

  it('should handle no events for the company', async () => {
    const req = {
      params: {
        idEtablissement: '1',
      },
    };
    const res = {
      status: jest.fn(),
      json: jest.fn(),
    };

    prisma.etablissement.findUnique = jest.fn().mockResolvedValue({ id: 1 });

    prisma.event.findMany = jest.fn().mockResolvedValue([]);

    await eventController.getAllOfCompany(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Cet établissement n'a pas d'événements",
    });
  });

  it('should handle errors', async () => {
    const req = {
      params: {
        idEtablissement: '1',
      },
    };
    const res = {
      status: jest.fn(),
      json: jest.fn(),
    };

    prisma.etablissement.findUnique = jest.fn().mockRejectedValue(new Error('Database error'));

    await eventController.getAllOfCompany(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
  });
});
