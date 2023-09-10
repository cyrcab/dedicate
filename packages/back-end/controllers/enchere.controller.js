const { PrismaClient } = require('@prisma/client');
const { DateTime } = require('luxon');

const prisma = new PrismaClient();

module.exports.vote = async (req, res) => {
  const {
    eventId, userId, enchereId, nomMusique, artisteMusique, album, prix,
  } = req.body;

  if (!eventId || !userId || !prix) {
    return res.status(400).json({ message: 'Il manque des informations' });
  }
  try {
    const [user, event] = await Promise.all([
      prisma.user.findUnique({ where: { id: parseInt(userId, 10) } }),
      prisma.event.findUnique({ where: { id: parseInt(eventId, 10) } }),
    ]);

    if (!user) {
      return res.status(404).json({ message: "Cet utilisateur n'existe pas" });
    }

    if (!event) {
      return res.status(404).json({ message: "Cet événement n'existe pas" });
    }

    if(event.isActive === false){
      return res.status(400).json({ message: "Cet événement n'est plus actif" });
    }

    const currentDate = DateTime.now().setZone('utc');
    const dateEvent = DateTime.fromJSDate(event.date).setZone('utc');

    if (dateEvent < currentDate) {
      return res.status(400).json({ message: 'Cet événement est terminé' });
    }

    const userInEvent = await prisma.event.findUnique({
      where: { id: parseInt(eventId, 10) },
      include: { User: { where: { id: parseInt(userId, 10) } } },
    });

    if (!userInEvent.User[0]) {
      return res.status(400).json({ message: "Cet utilisateur n'est pas inscrit à cet événement" });
    }

    if(userInEvent.User[0].dediCoins < prix){
      return res.status(400).json({ message: "Vous n'avez pas assez de dédiCoins" });
    }

    if (enchereId) {
      const enchere = await prisma.enchere.findUnique({ where: { id: parseInt(enchereId, 10) } });
      if (!enchere) {
        return res.status(404).json({ message: "Cette enchère n'existe pas" });
      }
      if (enchere.idUser === parseInt(userId, 10)) {
        return res.status(400).json({ message: 'Vous ne pouvez pas renchérir pour votre propre enchère' });
      }

      if (enchere.prix >= prix) {
        return res.status(400).json({ message: "Le prix de l'enchère est supérieur à celui proposé", prix: enchere.prix });
      }

      const musique = await prisma.musique.findUnique({
        where: { id: parseInt(enchere.idMusique, 10) },
      });
      if (musique.artiste !== artisteMusique || musique.titre !== nomMusique) {
        return res.status(400).json({ message: "La musique ne correspond pas à celle de l'enchère" });
      }

      await prisma.user.update({
        where: { id: parseInt(enchere.idUser, 10) },
        data: { dediCoins: { increment: enchere.prix } },
      });

      const updatedEnchere = await prisma.enchere.update({
        where: { id: parseInt(enchereId, 10) },
        data: {
          prix,
          User: { connect: { id: parseInt(userId, 10) } },
        },
        include: { Musique: true },
      });

      const updatedMusique = await prisma.musique.update({
        where: { id: parseInt(enchere.idMusique, 10) },
        data: { countVote: { increment: 1 } },
      });

      await prisma.user.update({
        where: { id: parseInt(userId, 10) },
        data: { dediCoins: { decrement: prix } },
      });

      return res.status(200).json({ message: "L'enchère a bien été mise à jour", enchere: updatedEnchere, musique: updatedMusique });
    }
    if (!nomMusique || !artisteMusique || !album) {
      return res.status(400).json({ message: 'Il manque des informations' });
    }

    let musique = await prisma.musique.findFirst({
      where: { titre: nomMusique, artiste: artisteMusique },
    });

    if (!musique) {
      if (event.prix >= prix) {
        return res.status(400).json({ message: "Le prix de l'enchère est supérieur à celui proposé", prix: event.prix });
      }

      musique = await prisma.musique.create({
        data: {
          titre: nomMusique,
          artiste: artisteMusique,
          album,
          countVote: 1,
          countDiffuse: 0,
        },
      });
    } else {
      const existingEnchere = await prisma.enchere.findFirst({
        where: { idMusique: musique.id, idEvent: parseInt(eventId, 10) },
      });

      if (existingEnchere) {
        return res.status(400).json({ message: 'Une enchère existe déjà pour cette musique' });
      }
    }

    const newEnchere = await prisma.enchere.create({
      data: {
        prix,
        User: { connect: { id: parseInt(userId, 10) } },
        Event: { connect: { id: parseInt(eventId, 10) } },
        Musique: { connect: { id: musique.id } },
      },
      include: { Musique: true },
    });

    await prisma.musique.update({
      where: { id: parseInt(musique.id, 10) },
      data: { countVote: { increment: 1 } },
    });

    await prisma.user.update({
      where: { id: parseInt(userId, 10) },
      data: { dediCoins: { decrement: prix } },
    });

    return res.status(200).json({ message: "L'enchère a bien été créée", enchere: newEnchere, musique });
  } catch (error) {
    console.error("Une erreur s'est produite :", error);
    return res.status(500).json({ message: "Une erreur s'est produite" });
  } finally {
    await prisma.$disconnect();
  }
};

module.exports.getVotes = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'Il manque des informations' });
  }

  try {
    const votes = await prisma.enchere.findMany({
      where: { idEvent: parseInt(id, 10) },
      include: {
        User: {
          select: {
            nom: true,
            prenom: true,
          },
        },
        Musique: {
          select: {
            titre: true,
            artiste: true,
            album: true,
          },
        },
        Event: {
          select: {
            isActive: true,
          },
        },
      },
      orderBy: { prix: 'desc' },
    });

    const filteredVotes = votes.map((vote) => ({
      id: vote.id,
      prix: vote.prix,
      User: vote.User,
      Musique: vote.Musique,
    }));
    const isACtive = await prisma.event.findUnique({
      where: { id: parseInt(id, 10) },
      select : {
        isActive:true,
      },
    })
    return res.status(200).json({ votes: filteredVotes, actif : isACtive});
  }catch(error){
    console.error("Une erreur s'est produite :", error);
    return res.status(500).json({ message: "Une erreur s'est produite" });
  } finally {
    await prisma.$disconnect();
  }
};
