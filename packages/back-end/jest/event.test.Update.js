const { DateTime } = require('luxon');
const { prisma } = require('@prisma/client'); 
const { jest, beforeEach, describe, expect, it, afterEach } = require('jest');
const { update } = require('../controllers/event.controller'); 

const mockRequest = () => {
  const req = {
    params: { idEvent: 1 },
    body: {
      nom: 'Nouveau nom',
      date: DateTime.now().plus({ hours: 4 }).toISO(),
      lieu: 'Nouveau lieu',
      type: 'Nouveau type',
      prix: 20,
      nbSlots: 50,
    },
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  return { req, res };
};

describe('Update Event Function', () => {
  beforeEach(async () => {
    await prisma.event.create({
      data: {
        id: 1,
        nom: 'Ancien nom',
        date: DateTime.now().plus({ hours: 3 }).toISO(),
        lieu: 'Ancien lieu',
        type: 'Ancien type',
        prix: 10,
        nbSlots: 100,
      },
    });
  });

  afterEach(async () => {
    await prisma.event.deleteMany();
  });

  it('devrait mettre à jour un événement existant', async () => {
    const { req, res } = mockRequest();

    await update(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Événement mis à jour',
      data: expect.any(Object),
    });

    const updatedEvent = await prisma.event.findUnique({
      where: { id: 1 },
    });
    expect(updatedEvent.nom).toBe('Nouveau nom');
    expect(updatedEvent.lieu).toBe('Nouveau lieu');
  });

});
