const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const { DateTime } = require('luxon');
const jwt = require('jsonwebtoken');
const QRCode = require('qrcode');
const multer = require('multer');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './images/');
  },
  filename(req, file, cb) {
    const uniqueFileName = `${Date.now()}-${Math.round(
      Math.random() * 1e9,
    )}${file.originalname.substring(file.originalname.lastIndexOf('.'))}`;
    cb(null, uniqueFileName);
  },
});

const upload = multer({ storage });

const defaultImagePath = 'defaultEvent.jpg';

module.exports.create = async (req, res) => {
  upload.array('images', 5)(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json({ message: err.message, test: 'erreur 1' });
    }
    if (err) {
      return res.status(500).json({ message: err.message, test: 'erreur 2' });
    }
    const images = req.files;

    /* eslint-disable prefer-const */
    let { nom, lieu, date, type, prix, nbSlots, idEtablissement, description } =
      req.body;

    if (!nom || !lieu || !date || !type || !prix || !nbSlots || !description) {
      return res
        .status(400)
        .json({ message: 'Veuillez remplir tous les champs' });
    }

    const parsedDate = DateTime.fromFormat(date, 'dd/MM/yyyy HH:mm:ss', {
      zone: 'Europe/Paris',
      locale: 'fr-FR',
    });
    if (!parsedDate.isValid) {
      return res.status(400).json({ message: "La date n'est pas valide" });
    }

    const currentDate = DateTime.now().setZone('Europe/Paris');
    if (parsedDate < currentDate) {
      return res.status(400).json({
        message:
          "La date de l'événement ne peut pas être antérieure à la date actuelle",
      });
    }

    const token = req.headers.authorization.split(' ')[1];
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
      /* eslint-disable no-shadow */
    } catch (err) {
      return res.status(401).json({ message: "Votre token n'est pas valide" });
    }

    const idUser = decodedToken.id;
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(idUser, 10),
      },
    });

    if (!user || decodedToken.refRole !== 'Gérant') {
      if (decodedToken.refRole !== 'SuperAdmin') {
        return res.status(403).json({
          message: "Vous n'avez pas les droits pour créer un événement",
          data: decodedToken.refRole,
        });
      }
      if (!idEtablissement) {
        return res
          .status(400)
          .json({ message: 'Vous devez spécifier un établissement' });
      }

      const etablissement = await prisma.etablissement.findUnique({
        where: {
          id: parseInt(idEtablissement, 10),
        },
      });

      if (!etablissement) {
        return res
          .status(400)
          .json({ message: "Cet établissement n'existe pas" });
      }
    }
    prix = parseFloat(prix);
    nbSlots = parseInt(nbSlots, 10);
    if (prix <= 0) {
      return res
        .status(400)
        .json({ message: 'Le prix ne peut pas être négatif ou nul' });
    }
    if (nbSlots <= 0) {
      return res.status(400).json({
        message: 'Le nombre de slots ne peut pas être négatif ou nul',
      });
    }
    const eventData = {
      nom,
      lieu,
      date: parsedDate.setZone('Europe/Paris').plus({ hours: 2 }).toISO(),
      type,
      prix,
      nbSlots,
      description,
      idEtablissement: idEtablissement
        ? parseInt(idEtablissement, 10)
        : user.idEtablissement,
      photo: images && images.length > 0 ? images[0].path : defaultImagePath,
    };

    try {
      const event = await prisma.event.create({ data: eventData });

      // Générer le code QR
      const qrCodeData = {
        idEvent: event.id,
        idEtablissement: event.idEtablissement,
      };

      const qrCodeString = JSON.stringify(qrCodeData);
      const qrCodeImage = await QRCode.toDataURL(qrCodeString);

      // Met à jour l'événement avec le code QR
      const updatedEvent = await prisma.event.update({
        where: { id: event.id },
        data: { qrCode: qrCodeImage },
      });

      return res
        .status(201)
        .json({ message: 'Événement créé', data: updatedEvent });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  });
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
    events.forEach((event) => {
      delete event.qrCode;
    });

    return res
      .status(200)
      .json({ message: 'Événements récupérés', data: events });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports.getAllOfCompany = async (req, res) => {
  const { idEtablissement } = req.params;
  if (!idEtablissement) {
    return res
      .status(400)
      .json({ message: 'Veuillez spécifier un établissement' });
  }

  try {
    const etablissement = await prisma.etablissement.findUnique({
      where: {
        id: parseInt(idEtablissement, 10),
      },
    });
    if (!etablissement) {
      return res
        .status(400)
        .json({ message: "Cet établissement n'existe pas" });
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

    events.forEach((event) => {
      delete event.qrCode;
    });

    if (!events.length) {
      return res
        .status(400)
        .json({ message: "Cet établissement n'a pas d'événements" });
    }

    return res
      .status(200)
      .json({ message: 'Événements récupérés', data: events });
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
      return res.status(404).json({ message: "Cet evenement n'existe pas" });
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
    return res
      .status(200)
      .json({ message: 'Infos événements récupérés', data: events });
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
    return res
      .status(200)
      .json({ message: 'Musiques récupérées', data: musiques });
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
      return res
        .status(400)
        .json({ message: "Cet utilisateur est déjà dans l'événement" });
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
    // Update the user's lastScannedEventId
    await prisma.user.update({
      where: {
        id: parseInt(idUser, 10),
      },
      data: {
        lastScannedEventId: parseInt(idEvent, 10),
      },
    });
    delete userEvent.qrCode;
    return res.status(200).json({
      message: "Utilisateur ajouté à l'événement",
      data: userEvent,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

module.exports.update = async (req, res) => {
  const { idEvent } = req.params;
  const { nom, date, lieu, type, prix, nbSlots, description } = req.body;
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
    if(!event.isActive){
      return res.status(400).json({ message: "Cet événement n'est plus actif" });
    }
    if (nom) {
      data.nom = nom;
    }
    if (date) {
      const parsedDate = DateTime.fromFormat(date, 'dd/MM/yyyy HH:mm:ss', {
        zone: 'Europe/Paris',
        locale: 'fr-FR',
      });
      if (!parsedDate.isValid) {
        return res.status(400).json({ message: "La date n'est pas valide" });
      }
      const currentDate = DateTime.now().setZone('Europe/Paris');
      if (parsedDate < currentDate) {
        return res.status(400).json({
          message:
            "La date de l'événement ne peut pas être antérieure à la date actuelle",
        });
      }
      data.date = parsedDate.setZone('Europe/Paris').plus({ hours: 2 }).toISO();
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
        return res
          .status(400)
          .json({ message: 'Le prix ne peut pas être négatif' });
      }
      data.prix = prix;
    }
    if (nbSlots) {
      if (Number.isNaN(nbSlots)) {
        return res.status(400).json({
          message: 'Le nombre de slots doit être un nombre',
        });
      }
      if (nbSlots <= 0) {
        return res.status(400).json({
          message: 'Le nombre de slots ne peut pas être négatif',
        });
      }
      data.nbSlots = nbSlots;
    }
    if (description) {
      data.description = description;
    }
    const updatedEvent = await prisma.event.update({
      where: {
        id: parseInt(idEvent, 10),
      },
      data,
    });
    return res
      .status(200)
      .json({ message: 'Événement mis à jour', data: updatedEvent });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports.delete = async (req, res) => {
  const { idEvent } = req.params;
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
    const currentDate = DateTime.now()
      .setZone('utc')
      .plus({ hours: 4 })
      .toISO();
    const dateEvent = new Date(event.date);
    const dateEventParsed = DateTime.fromJSDate(dateEvent)
      .setZone('utc')
      .toISO();

    if (dateEventParsed < currentDate) {
      return res.status(400).json({
        message:
          'Cet événement est dans moins de 2h ou est déjà passé, vous ne pouvez pas le supprimer',
      });
    }

    const deletedEvent = await prisma.event.delete({
      where: {
        id: parseInt(idEvent, 10),
      },
    });
    return res
      .status(200)
      .json({ message: 'Événement supprimé', data: deletedEvent });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports.getNextEvent = async (req, res) => {
  const { ville } = req.params;
  if (!ville) {
    try {
      const events = await prisma.event.findMany({
        where: {
          date: {
            gt: DateTime.now().setZone('utc').plus({ hours: 2 }).toISO(),
          },
        },
        include: {
          Etablissement: {
            select: {
              nom: true,
              adresse: true,
              ville: true,
              codePostal: true,
            },
          },
        },
        orderBy: {
          date: 'asc',
        },
      });
      return res
        .status(200)
        .json({ message: 'Liste des événements', data: events });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  } else {
    try {
      const events = await prisma.event.findMany({
        where: {
          date: {
            gt: DateTime.now().setZone('utc').plus({ hours: 2 }).toISO(),
          },
          Etablissement: {
            ville,
          },
        },
        include: {
          Etablissement: {
            select: {
              nom: true,
              adresse: true,
              ville: true,
              codePostal: true,
            },
          },
        },
        orderBy: {
          date: 'asc',
        },
      });
      events.forEach((event) => {
        delete event.qrCode;
      });

      return res
        .status(200)
        .json({ message: 'Liste des événements', data: events });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
};

module.exports.getMyEvent = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res
      .status(400)
      .json({ message: 'Veuillez spécifier un utilisateur' });
  }
  try {
    const user = await prisma.user
      .findUnique({
        where: {
          id: parseInt(id, 10),
        },
      })
      .events({
        include: {
          enchere: {
            include: {
              Musique: true,
            },
          },
        },
      });
    if (!user) {
      return res.status(400).json({ message: "Cet utilisateur n'existe pas" });
    }
    return res
      .status(200)
      .json({ message: 'Liste des événements', data: user });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports.getEventActif = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
  } catch (err) {
    return res.status(401).json({ message: "Votre token n'est pas valide" });
  }
  const idUser = decodedToken.id;
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(idUser, 10),
    },
  });
  if (!user) {
    return res.status(400).json({ message: "Cet utilisateur n'existe pas" });
  }
  if (!user.lastScannedEventId) {
    return res
      .status(400)
      .json({ message: "Cet utilisateur n'a pas de dernier événement scanné", user });
  }
  try {
    const event = await prisma.event.findFirst({
      where: {
        id: parseInt(user.lastScannedEventId, 10),
      },
      include: {
        Etablissement: true,
        enchere: true,
      },
    });
    if (!event) {
      return res.status(404).json({ message: "Cet événement n'existe pas" });
    }
    const currentDate = DateTime.now()
      .setZone('utc')
      .plus({ hours: 2 })
      .toISO();
    const dateEvent = new Date(event.date);
    const dateEventParsed = DateTime.fromJSDate(dateEvent)
      .setZone('utc')
      .plus({days: 1 })
      .toISO();
    if (currentDate > dateEventParsed) {
      await prisma.user.update({
        where: {
          id: parseInt(idUser, 10),
        },
        data: {
          lastScannedEventId: null,
        },
      });
      return res
        .status(400)
        .json({ message: "Cet événement n'est plus actif" });
    }

    return res.status(200).json({ message: 'Événement récupéré', data: event, date : currentDate, dateEventParsed});
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Internal error BG', data: err.message });
  }
};
