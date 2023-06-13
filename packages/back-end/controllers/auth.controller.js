const { PrismaClient } = require('@prisma/client');
const prismaUser = new PrismaClient().User;
const prismaEta = new PrismaClient().Etablissement;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const regexTel = /^[0-9]{10}$/;

module.exports.registerEta = async (req, res) => {
    const { nom, prenom, email, tel, nomEta, adresse, password } = req.body;
    if (!nom || !prenom || !email || !tel || !nomEta || !adresse || !password) {
        return res.status(400).json({ message: "Veuillez remplir tous les champs" });
    }
    const user = await prismaUser.findUnique({
        where: {
            mail: email
        }
    });
    if (user) {
        return res.status(400).json({ message: "Cet adresse email à déjà été utilisé" });
    }

    if (!regex.test(email)) {
        return res.status(400).json({ message: "L'adresse email n'est pas valide" });
    }
    if (!regexTel.test(tel)) {
        return res.status(400).json({ message: "Le numéro de téléphone n'est pas valide" });
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newEta = await prismaEta.create({
        data: {
            nom: nomEta,
            adresse: adresse
        }
    });
    const newUser = await prismaUser.create({
        data: {
            nom: nom,
            prenom: prenom,
            mail: email,
            tel: tel,
            password: hash,
            Etablissement: {
                connect: {
                    id: newEta.id
                }
            }
        }
    });
    res.status(201).json({ message: "Votre compte a bien été créé", data: "Utilisateur :" + newUser });
};