const { PrismaClient } = require('@prisma/client');
const prismaRole = new PrismaClient().Role;

module.exports.createRole = async (req, res) => {
    const { nom } = req.body;
    if (!nom) {
        return res.status(400).json({ message: "Veuillez remplir tous les champs" });
    }
    const role = await prismaRole.findUnique({
        where: {
            refRole: nom
        }
    });
    if (role) {
        return res.status(400).json({ message: "Ce rôle existe déjà" });
    }
    const newRole = await prismaRole.create({
        data: {
            refRole: nom
        }
    });
    res.status(201).json({ message: "Le rôle a bien été créé", data: newRole });
}

module.exports.getRoles = async (req, res) => {
    const roles = await prismaRole.findMany();
    res.status(200).json({ data: roles });
}

module.exports.getRole = async (req, res) => {
    const { id } = req.params;
    const role = await prismaRole.findUnique({
        where: {
            id: parseInt(id)
        }
    });
    if (!role) {
        return res.status(404).json({ message: "Ce rôle n'existe pas" });
    }
    res.status(200).json({ data: role });
}

module.exports.updateRole = async (req, res) => {
    const { id } = req.params;
    if (id === "1" || id === "2") {
        return res.status(400).json({ message: "Vous ne pouvez pas modifier ce rôle" });
    }
    const { nom } = req.body;
    if (!nom) {
        return res.status(400).json({ message: "Veuillez remplir tous les champs" });
    };
    const role = await prismaRole.findUnique({
        where: {
            id: parseInt(id)
        }
    });
    if (!role) {
        return res.status(404).json({ message: "Ce rôle n'existe pas" });
    }
    const updateRole = await prismaRole.update({
        where: {
            id: parseInt(id)
        },
        data: {
            refRole: nom
        }
    })
    res.status(200).json({ message: "Le rôle a bien été modifié", data: updateRole });
}

module.exports.deleteRole = async (req, res) => {
    const { id } = req.params;
    if (id === "1" || id === "2") {
        return res.status(400).json({ message: "Vous ne pouvez pas supprimer ce rôle" });
    }
    const role = await prismaRole.findUnique({
        where: {
            id: parseInt(id)
        }
    })
    if (!role) {
        return res.status(404).json({ message: "Ce rôle n'existe pas" });
    }
    const deleteRole = await prismaRole.delete({
        where: {
            id: parseInt(id)
        }
    })
    res.status(200).json({ message: "Le rôle a bien été supprimé", data: deleteRole });
}