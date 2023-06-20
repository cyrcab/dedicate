const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client')
const prismaUser = new PrismaClient().User;

module.exports.authTokenUser = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.status(401).json({ message: "Vous n'êtes pas connecté" });
    }
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (user.getUser.refRole != "Client") {
            return res.status(403).json({ message: "Vous n'êtes pas authorisé à faire ça" });
        }
        if (err) return res.status(403).json({ message: "Vous n'êtes pas authorisé à faire ça" });

        next();
    });
}

module.exports.authTokenEta = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.status(401).json({ message: "Vous n'êtes pas connecté" });
    }
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (user.getUser.refRole != "Gerant") {
            return res.status(403).json({ message: "Vous n'êtes pas authorisé à faire ça" });
        }
        if (err) return res.status(403).json({ message: "Vous n'êtes pas authorisé à faire ça" });

        next();
    });
}

module.exports.authTokenAdmin = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.status(401).json({ message: "Vous n'êtes pas connecté" });
    }
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (user.refRole != "SuperAdmin") {
            return res.status(403).json({ message: "Vous n'êtes pas authorisé à faire ça" });
        }
        if (err) return res.status(403).json({ message: "Vous n'êtes pas authorisé à faire ça" });

        next();
    });
}

module.exports.checkMe = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.status(401).json({ message: "Vous n'êtes pas connecté" });
    }


    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Vous n'êtes pas authorisé à faire ça" });
        if (user.id !== parseInt(req.params.id)) {
            if (user.refRole.toLowerCase() !== "superadmin") {
                return res.status(403).json({ message: "Vous n'êtes pas authorisé à faire ça" });
            }
        }
        next();
    });
}
