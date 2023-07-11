const { PrismaClient } = require("@prisma/client");

const prismaEta = new PrismaClient().etablissement;

module.exports.getAll = async (req, res) => {
  const etablissements = await prismaEta.findMany({
    include: {
      User: true,
      events: true,
    },
  });
  etablissements.forEach((eta) => {
    eta.User.forEach((user) => {
      delete user.password;
    });
  });

  return res.status(200).json({ data: etablissements });
};

module.exports.getOne = async (req, res) => {
  const { id } = req.params;
  const etablissement = await prismaEta.findUnique({
    where: {
      id: parseInt(id, 10),
    },
    include: {
      User: true,
      events: true,
    },
  });
  etablissement.User.forEach((user) => {
    delete user.password;
  });
  if (!etablissement) {
    return res.status(404).json({ message: "Cet établissement n'existe pas" });
  }
  return res.status(200).json({ data: etablissement });
};

module.exports.update = async (req, res) => {
  const { id } = req.params;
  const { nom, adresse } = req.body;
  const etablissement = await prismaEta.findUnique({
    where: {
      id: parseInt(id, 10),
    },
  });
  if (!etablissement) {
    return res.status(404).json({ message: "Cet établissement n'existe pas" });
  }
  const data = {};
  if (nom) {
    data.nom = nom;
  }
  if (adresse) {
    data.adresse = adresse;
  }
  const updatedEtablissement = await prismaEta.update({
    where: {
      id: parseInt(id, 10),
    },
    data,
  });
  return res
    .status(200)
    .json({ message: "Etablissement modifié ", data: updatedEtablissement });
};

module.exports.delete = async (req, res) => {
  const { id } = req.params;
  const etablissement = await prismaEta.findUnique({
    where: {
      id: parseInt(id, 10),
    },
  });
  if (!etablissement) {
    return res.status(404).json({ message: "Cet établissement n'existe pas" });
  }
  await prismaEta.update({
    where: {
      id: parseInt(id, 10),
    },
    data: {
      nom: "Entreprise supprimée",
      adresse: "Entreprise supprimée",
      User: {
        updateMany: {
          data: {
            nom: "Utilisateur supprimé",
            prenom: "Utilisateur supprimé",
            email: "Utilisateur supprimé",
            password: "Utilisateur supprimé",
            telephone: "Utilisateur supprimé",
          },
        },
      },
    },
  });
  return res.status(200).json({ message: "Etablissement supprimé " });
};
