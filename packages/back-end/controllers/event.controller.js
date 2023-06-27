const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const { DateTime } = require('luxon');
const jwt = require('jsonwebtoken');

module.exports.create = async (req, res) => {
  const {
    nom, lieu, date, type, prix, nbSlots, idEtablissement,
  } = req.body;

  if (!nom || !lieu || !date || !type || !prix || !nbSlots) {
    return res.status(400).json({ message: 'Veuillez remplir tous les champs' });
  }

  const parsedDate = DateTime.fromFormat(date, 'dd/MM/yyyy HH:mm:ss', { zone: 'Europe/Paris', locale: 'fr-FR' });
  if (!parsedDate.isValid) {
    return res.status(400).json({ message: "La date n'est pas valide" });
  }

  const currentDate = DateTime.now().setZone('Europe/Paris');
  if (parsedDate < currentDate) {
    return res.status(400).json({ message: "La date de l'événement ne peut pas être antérieure à la date actuelle" });
  }

  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
  if (!decodedToken) {
    return res.status(400).json({ message: "Vous n'êtes pas connecté" });
  }

  const idUser = decodedToken.id;
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(idUser, 10),
    },
  });

  if (!user || decodedToken.refRole !== 'Gérant') {
    if (decodedToken.refRole !== 'SuperAdmin') {
      return res.status(400).json({ message: "Vous n'avez pas les droits pour créer un événement", data: decodedToken.refRole });
    }
    if (!idEtablissement) {
      return res.status(400).json({ message: 'Vous devez spécifier un établissement' });
    }

    const etablissement = await prisma.etablissement.findUnique({
      where: {
        id: parseInt(idEtablissement, 10),
      },
    });

    if (!etablissement) {
      return res.status(400).json({ message: "Cet établissement n'existe pas" });
    }
  }

  const eventData = {
    nom,
    lieu,
    date: parsedDate.setZone('Europe/Paris').plus({ hours: 2 }).toISO(),
    type,
    prix,
    nbSlots,
    idEtablissement: idEtablissement ? parseInt(idEtablissement, 10) : user.idEtablissement,
  };

  try {
    const event = await prisma.event.create({ data: eventData });
    return res.status(201).json({ message: 'Événement créé', data: event });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
