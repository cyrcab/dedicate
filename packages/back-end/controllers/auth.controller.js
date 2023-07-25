const { PrismaClient } = require('@prisma/client');

const prismaUser = new PrismaClient().User;
const prismaEta = new PrismaClient().Etablissement;
const prismaRole = new PrismaClient().Role;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();

const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const regexTel = /^[0-9]{10}$/;

function generateAccessToken(user) {
  return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: '86400s' });
}

module.exports.registerEta = async (req, res) => {
  const {
    nom,
    prenom,
    email,
    tel,
    nomEta,
    adresse,
    password,
    ville,
    codePostal,
  } = req.body;
  if (
    !nom ||
    !prenom ||
    !email ||
    !tel ||
    !nomEta ||
    !adresse ||
    !password ||
    !ville ||
    !codePostal
  ) {
    return res
      .status(400)
      .json({ message: 'Veuillez remplir tous les champs' });
  }

  if (!regex.test(email)) {
    return res
      .status(400)
      .json({ message: "L'adresse email n'est pas valide" });
  }
  if (!regexTel.test(tel)) {
    return res
      .status(400)
      .json({ message: "Le numéro de téléphone n'est pas valide" });
  }

  const user = await prismaUser.findFirst({
    where: {
      OR: [{ mail: email }, { tel }],
    },
  });
  if (user) {
    return res
      .status(400)
      .json({ message: 'Cet adresse email ou ce téléphone est déjà utilisé' });
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  try {
    const newEta = await prismaEta.create({
      data: {
        nom: nomEta,
        adresse,
        ville,
        codePostal,
      },
    });

    const newUser = await prismaUser.create({
      data: {
        nom,
        prenom,
        mail: email,
        tel,
        password: hash,
        Role: {
          connect: {
            id: 2,
          },
        },
        Etablissement: {
          connect: {
            id: newEta.id,
          },
        },
      },
    });
    delete newUser.password;
    const refRole = await prismaRole.findFirst({
      where: {
        id: newUser.roleId,
      },
    });
    if (!refRole) {
      return res.status(400).json({ message: 'Identifiant incorect' });
    }
    const token = generateAccessToken({
      id: newUser.id,
      role: newUser.roleId,
      refRole: refRole.refRole,
    });
    return res
      .status(201)
      .json({ message: 'Votre compte a bien été créé', data: newUser, token });
  } catch (err) {
    return res.status(500).json({
      message: "Erreur lors de la création de l'utilisateur",
      data: err,
    });
  }
};

module.exports.register = async (req, res) => {
  const { nom, prenom, email, tel, password } = req.body;

  if (!nom || !prenom || !email || !tel || !password) {
    return res
      .status(400)
      .json({ message: 'Veuillez remplir tous les champs' });
  }

  if (!regex.test(email)) {
    return res
      .status(400)
      .json({ message: "L'adresse email n'est pas valide" });
  }
  if (!regexTel.test(tel)) {
    return res
      .status(400)
      .json({ message: "Le numéro de téléphone n'est pas valide" });
  }

  const user = await prismaUser.findFirst({
    where: {
      OR: [{ mail: email }, { tel }],
    },
  });
  if (user) {
    return res
      .status(400)
      .json({ message: 'Cet adresse email ou ce téléphone est déjà utilisé' });
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  try {
    const newUser = await prismaUser.create({
      data: {
        nom,
        prenom,
        mail: email,
        tel,
        password: hash,
        Role: {
          connect: {
            id: 1,
          },
        },
      },
    });
    const refRole = await prismaRole.findFirst({
      where: {
        id: newUser.roleId,
      },
    });
    if (!refRole) {
      return res.status(400).json({ message: 'Identifiant incorect' });
    }
    delete newUser.password;
    const token = generateAccessToken({
      id: newUser.id,
      role: newUser.roleId,
      refRole: refRole.refRole,
    });
    res
      .status(201)
      .json({ message: 'Votre compte a bien été créé', data: newUser, token });
  } catch (err) {
    return res.status(500).json({
      message: "Erreur lors de la création de l'utilisateur",
      data: err,
    });
  }
};

module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: 'Veuillez remplir tous les champs' });
  }

  const user = await prismaUser.findFirst({
    where: {
      mail: email,
    },
  });
  if (!user) {
    return res.status(400).json({ message: 'Identifiant incorect' });
  }
  if (user.roleId === 2) {
    return res.status(400).json({ message: 'Identifiant incorect' });
  }
  const refRole = await prismaRole.findFirst({
    where: {
      id: user.roleId,
    },
  });
  if (!refRole) {
    return res.status(400).json({ message: 'Identifiant incorect' });
  }
  const hash = await bcrypt.compare(password, user.password);
  if (!hash) {
    return res.status(400).json({ message: 'Identifiant incorect' });
  }
  delete user.password;
  const token = generateAccessToken({
    id: user.id,
    role: user.roleId,
    refRole: refRole.refRole,
  });
  return res
    .status(200)
    .json({ message: 'Vous êtes connecté', token, data: user });
};

module.exports.loginEta = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: 'Veuillez remplir tous les champs' });
  }

  const user = await prismaUser.findFirst({
    where: {
      mail: email,
    },
  });
  if (!user) {
    return res.status(400).json({ message: 'Identifiant incorect' });
  }
  if ((await user.roleId) === 1) {
    return res
      .status(400)
      .json({ message: 'Identifiant incorect' });
  }
  const refRole = await prismaRole.findFirst({
    where: {
      id: user.roleId,
    },
  });
  if (!refRole) {
    return res.status(400).json({ message: 'Identifiant incorect' });
  }
  const hash = await bcrypt.compare(password, user.password);
  if (!hash) {
    return res.status(400).json({ message: 'Identifiant incorect' });
  }
  delete user.password;
  const token = generateAccessToken({
    id: user.id,
    role: user.roleId,
    refRole: refRole.refRole,
  });
  return res.status(200).json({
    message: 'Vous êtes connecté',
    token,
    data: user,
    refRole: user.roleId,
  });
};
