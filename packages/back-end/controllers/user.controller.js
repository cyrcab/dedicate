const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prismaUser = new PrismaClient().User;
const prismaRole = new PrismaClient().Role;

const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const regexTel = /^[0-9]{10}$/;

module.exports.getAllUsers = async (req, res) => {
  const users = await prismaUser.findMany({
    include: {
      Role: true,
      Etablissement: true,
      events: true,
    },
  });
  users.forEach((user) => {
    delete user.password;
  });
  return res.status(200).json({ data: users });
};

module.exports.getUser = async (req, res) => {
  const { id } = req.params;
  const user = await prismaUser.findUnique({
    where: {
      id: parseInt(id, 10),
    },
    include: {
      Role: true,
      Etablissement: true,
      events: true,
    },
  });
  delete user.password;
  if (!user) {
    return res.status(404).json({ message: "Cet utilisateur n'existe pas" });
  }
  return res.status(200).json({ data: user });
};

module.exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { nom, prenom, mail, tel } = req.body;
  const data = {};
  const user = await prismaUser.findUnique({
    where: {
      id: parseInt(id, 10),
    },
  });
  if (!user) {
    return res.status(404).json({ message: "Cet utilisateur n'existe pas" });
  }
  if (mail) {
    const emailAlreadyTaken = await prismaUser.findUnique({
      where: {
        mail: mail,
      },
    });
    if (emailAlreadyTaken) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé' });
    }
  }
  if (tel) {
    const telAlreadyTaken = await prismaUser.findUnique({
      where: {
        tel,
      },
    });
    if (telAlreadyTaken) {
      return res
        .status(400)
        .json({ message: 'Ce numéro de téléphone est déjà utilisé' });
    }
  }
  if (nom) {
    data.nom = nom;
  }
  if (prenom) {
    data.prenom = prenom;
  }
  if (mail) {
    if (!regex.test(mail)) {
      return res.status(400).json({ message: 'Email invalide' });
    }
    data.mail = mail;
  }
  if (tel) {
    if (!regexTel.test(tel)) {
      return res.status(400).json({ message: 'Numéro de téléphone invalide' });
    }
    data.tel = tel;
  }
  const updatedUser = await prismaUser.update({
    where: {
      id: parseInt(id, 10),
    },
    include: {
      Role: true,
      Etablissement: true,
    },
    data,
  });
  delete updatedUser.password;
  return res
    .status(200)
    .json({ message: 'Utilisateur modifié', data: updatedUser });
};

module.exports.updatePassword = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ message: 'Missing field' });
  }
  const user = await prismaUser.findUnique({
    where: {
      id: parseInt(id, 10),
    },
  });
  if (!user) {
    return res.status(404).json({ message: "Cet utilisateur n'existe" });
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  await prismaUser.update({
    where: {
      id: parseInt(id, 10),
    },
    data: {
      password: hash,
    },
  });
  return res.status(200).json({ message: 'Mot de passe modifié' });
};

module.exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: 'Missing field' });
  }
  const user = await prismaUser.findUnique({
    where: {
      id: parseInt(id, 10),
    },
  });
  if (!user) {
    return res.status(404).json({ message: "Cet utilisateur n'existe pas" });
  }
  const role = await prismaRole.findUnique({
    where: {
      refRole: 'Supprime',
    },
  });
  if (!role) {
    return res.status(500).json({ message: 'Internal server error' });
  }
  const updatedUser = await prismaUser.update({
    where: {
      id: parseInt(id, 10),
    },
    data: {
      nom: 'Utilisateur supprimé',
      prenom: 'Utilisateur supprimé',
      mail: 'Utilisateur supprimé',
      tel: 'Utilisateur supprimé',
      password: 'Utilisateur supprimé',
      Role: {
        connect: {
          id: role.id,
        },
      },
    },
  });
  delete updatedUser.password;
  return res.status(200).json({ message: 'Utilisateur supprimé' });
};

// get dediCoins
module.exports.getUserDediCoins = async (req, res) => {
  const { id } = req.params;
  const user = await prismaUser.findUnique({
    where: {
      id: parseInt(id, 10),
    },
  });
  if (!user) {
    return res.status(404).json({ message: "Cet utilisateur n'existe pas" });
  }
  return res.status(200).json({ data: user.dediCoins });
};
