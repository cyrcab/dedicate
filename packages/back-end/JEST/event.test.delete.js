const { DateTime } = require('luxon');
const { prisma } = require('@prisma/client'); 
const { jest, beforeEach, describe, expect, it, afterEach } = require('jest');
const { deleteEvent } = require('../controllers/event.controller'); 

const mockRequest = (idEvent) => {
  const req = {
    params: { idEvent },
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  return { req, res };
};

describe('Delete Event Function', () => {
  beforeEach(async () => {
    await prisma.event.create({
      data: {
        id: 1,
        nom: 'Événement de test',
        date: DateTime.now().plus({ hours: 5 }).toISO(), 
        lieu: 'Lieu de test',
        type: 'Type de test',
        prix: 10,
        nbSlots: 100,
      },
    });
  });

  afterEach(async () => {
    await prisma.event.deleteMany();
  });

  it('devrait supprimer un événement existant dans le futur', async () => {
    const { req, res } = mockRequest(1);

    await deleteEvent(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Événement supprimé',
      data: expect.any(Object),
    });
    const deletedEvent = await prisma.event.findUnique({
      where: { id: 1 },
    });
    expect(deletedEvent).toBeNull();
  });

  it("devrait renvoyer une erreur si l'événement n'existe pas", async () => {
    const { req, res } = mockRequest(999); // ID d'événement inexistant

    await deleteEvent(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Cet événement n'existe pas",
    });
  });

  it('devrait renvoyer une erreur si l\'événement est dans moins de 2h ou est déjà passé', async () => {
    await prisma.event.update({
      where: { id: 1 },
      data: {
        date: DateTime.now().minus({ hours: 1 }).toISO(),
      },
    });

    const { req, res } = mockRequest(1);

    await deleteEvent(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message:
        'Cet événement est dans moins de 2h ou est déjà passé, vous ne pouvez pas le supprimer',
    });
  });

});
