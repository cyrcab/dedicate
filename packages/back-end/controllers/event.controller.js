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
  if (prix <= 0) {
    return res.status(400).json({ message: 'Le prix ne peut pas être négatif ou nul' });
  }
  if (nbSlots <= 0) {
    return res.status(400).json({ message: 'Le nombre de slots ne peut pas être négatif ou nul' });
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

module.exports.getAll = async (req, res) => {
  try {
    const events = await prisma.event.findMany({
      include: {
        Etablissement: true,
        User: {
          select: {
            id: true,
            nom: true,
            prenom: true,
            mail: true,
            tel: true,
            Role: {
              select: {
                refRole: true,
              },
            },
          },
        },
        diffuser: true,
        enchere: true,
      },
    });
    return res.status(200).json({ message: 'Événements récupérés', data: events });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports.getAllOfCompany = async (req, res) => {
  const { idEtablissement } = req.params;
  if (!idEtablissement) {
    return res.status(400).json({ message: 'Veuillez spécifier un établissement' });
  }

  try {
    const etablissement = await prisma.etablissement.findUnique({
      where: {
        id: parseInt(idEtablissement, 10),
      },
    });
    if (!etablissement) {
      return res.status(400).json({ message: "Cet établissement n'existe pas" });
    }

    const events = await prisma.event.findMany({
      where: {
        idEtablissement: parseInt(idEtablissement, 10),
      },
      include: {
        diffuser: true,
        enchere: true,
      },
    });

    return res.status(200).json({ message: 'Événements récupérés', data: events });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports.getOne = async (req, res) => {
  const idEvent = req.params.id;
  if (!idEvent) {
    return res.status(400).json({ message: 'Veuillez spécifier un événement' });
  }

  try {
    const event = await prisma.event.findUnique({
      where: {
        id: parseInt(idEvent, 10),
      },
      include: {
        Etablissement: true,
        diffuser: true,
        enchere: true,
      },
    });
    if (!event) {
      return res.status(400).json({ message: "Cet événement n'existe pas" });
    }

    return res.status(200).json({ message: 'Événement récupéré', data: event });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports.getUserOfEvents = async (req, res) => {
  const { idEvent } = req.params;
  if (!idEvent) {
    return res.status(400).json({ message: 'Veuillez spécifier un evenement' });
  }
  try {
    const event = await prisma.event.findUnique({
      where: {
        id: parseInt(idEvent, 10),
      },
    });
    if (!event) {
      return res.status(400).json({ message: "Cet evenement n'existe pas" });
    }
    const events = await prisma.event.findUnique({
      where: {
        id: parseInt(idEvent, 10),
      },
      include: {
        User: {
          select: {
            nom: true,
            prenom: true,
          },
        },
        diffuser: true,
        enchere: true,
      },
    });
    return res.status(200).json({ message: 'Événements récupérés', data: events });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports.getMusiqueOfEvent = async (req, res) => {
  const { idEvent } = req.params;
  if (!idEvent) {
    return res.status(400).json({ message: 'Veuillez spécifier un evenement' });
  }
  try {
    const event = await prisma.event.findUnique({
      where: {
        id: parseInt(idEvent, 10),
      },
    });
    if (!event) {
      return res.status(400).json({ message: "Cet evenement n'existe pas" });
    }
    const musiques = await prisma.event.findUnique({
      where: {
        id: parseInt(idEvent, 10),
      },
      include: {
        diffuser: true,
      },
    });
    return res.status(200).json({ message: 'Musiques récupérées', data: musiques });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports.addUserToEvent = async (req, res) => {
  const { idEvent } = req.params;
  if (!idEvent) {
    return res.status(400).json({ message: 'Veuillez spécifier un evenement' });
  }
  try {
    const event = await prisma.event.findUnique({
      where: {
        id: parseInt(idEvent, 10),
      },
    });
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    const idUser = decoded.id;

    if (!event) {
      return res.status(400).json({ message: "Cet evenement n'existe pas" });
    }
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(idUser, 10),
      },
    });
    if (!user) {
      return res.status(400).json({ message: "Cet utilisateur n'existe pas" });
    }
    // Check if user is already in event
    const checkUser = await prisma.event.findUnique({
      where: {
        id: parseInt(idEvent, 10),
      },
      include: {
        User: {
          select: {
            id: true,
          },
        },
      },
    });
    const check = checkUser.User.find((u) => u.id === parseInt(idUser, 10));
    if (check) {
      return res.status(400).json({ message: 'Cet utilisateur est déjà dans l\'événement' });
    }
    const userEvent = await prisma.event.update({
      where: {
        id: parseInt(idEvent, 10),
      },
      data: {
        User: {
          connect: {
            id: parseInt(idUser, 10),
          },
        },
      },
    });
    return res.status(200).json({ message: 'Utilisateur ajouté à l\'événement', data: userEvent });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports.update = async (req, res) => {
  const { idEvent } = req.params;
  const {
    nom, date, lieu, type, prix, nbSlots,
  } = req.body;
  const data = {};
  if (!idEvent) {
    return res.status(400).json({ message: 'Veuillez spécifier un événement' });
  }
  try {
    const event = await prisma.event.findUnique({
      where: {
        id: parseInt(idEvent, 10),
      },
    });
    if (!event) {
      return res.status(400).json({ message: "Cet événement n'existe pas" });
    }
    if (nom) {
      data.nom = nom;
    }
    if (date) {
      const parsedDate = DateTime.fromFormat(date, 'dd/MM/yyyy HH:mm:ss', { zone: 'Europe/Paris', locale: 'fr-FR' });
      if (!parsedDate.isValid) {
        return res.status(400).json({ message: "La date n'est pas valide" });
      }
      const currentDate = DateTime.now().setZone('Europe/Paris');
      if (parsedDate < currentDate) {
        return res.status(400).json({ message: "La date de l'événement ne peut pas être antérieure à la date actuelle" });
      }
    }
    if (lieu) {
      data.lieu = lieu;
    }
    if (type) {
      data.type = type;
    }
    if (prix) {
      if (Number.isNaN(prix)) {
        return res.status(400).json({ message: 'Le prix doit être un nombre' });
      }
      if (prix <= 0) {
        return res.status(400).json({ message: 'Le prix ne peut pas être négatif' });
      }
      data.prix = prix;
    }
    if (nbSlots) {
      if (Number.isNaN(nbSlots)) {
        return res.status(400).json({ message: 'Le nombre de slots doit être un nombre' });
      }
      if (nbSlots <= 0) {
        return res.status(400).json({ message: 'Le nombre de slots ne peut pas être négatif' });
      }
      data.nbSlots = nbSlots;
    }
    const updatedEvent = await prisma.event.update({
      where: {
        id: parseInt(idEvent, 10),
      },
      data,
    });
    return res.status(200).json({ message: 'Événement mis à jour', data: updatedEvent });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};