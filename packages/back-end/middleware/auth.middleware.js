const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prismaEta = new PrismaClient().etablissement;
const prismaUser = new PrismaClient().user;
const prismaEvent = new PrismaClient().event;
const prismaEnchere = new PrismaClient().enchere;

module.exports.authTokenUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) {
    return res.status(401).json({ message: "Vous n'êtes pas connecté" });
  }
  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (user.refRole !== 'Client') {
      return res
        .status(403)
        .json({ message: "Vous n'êtes pas authorisé à faire ça" });
    }
    if (err) {
      return res
        .status(403)
        .json({ message: "Vous n'êtes pas authorisé à faire ça" });
    }

    next();
  });
};

module.exports.authTokenEta = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) {
    return res.status(401).json({ message: "Vous n'êtes pas connecté" });
  }
  jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ message: "Vous n'êtes pas authorisé à faire ça" });
    }
    if (user.refRole !== 'Gérant' && user.refRole !== 'SuperAdmin') {
      return res
        .status(403)
        .json({ message: "Vous n'êtes pas authorisé à faire ça" });
    }
    const { id } = req.params;
    let etablissement;
    if (!id && user.refRole === 'Gérant') {
      const checkUser = await prismaUser.findUnique({
        where: {
          id: parseInt(user.id, 10),
        },
      });
      if (!user) {
        return res
          .status(404)
          .json({ message: "Cet utilisateur n'existe pas" });
      }
      etablissement = await prismaEta.findUnique({
        where: {
          id: parseInt(checkUser.idEtablissement, 10),
        },
      });
    } else {
      etablissement = await prismaEta.findUnique({
        where: {
          id: parseInt(id, 10),
        },
      });
    }
    if (!etablissement) {
      return res
        .status(404)
        .json({ message: "Cet établissement n'existe pas" });
    }
    const testUser = await prismaUser.findUnique({
      where: {
        id: parseInt(user.id, 10),
      },
    });
    if (testUser.idEtablissement !== etablissement.id) {
      if (user.refRole !== 'SuperAdmin') {
        return res
          .status(403)
          .json({ message: "Vous n'êtes pas authorisé à faire ça" });
      }
    }
    next();
  });
};

module.exports.authTokenAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) {
    return res.status(401).json({ message: "Vous n'êtes pas connecté" });
  }
  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ message: "Vous n'êtes pas authorisé à faire ça" });
    }
    if (user.refRole !== 'SuperAdmin') {
      return res
        .status(403)
        .json({ message: "Vous n'êtes pas authorisé à faire ça" });
    }
    next();
  });
};

module.exports.checkMe = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) {
    return res.status(401).json({ message: "Vous n'êtes pas connecté" });
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ message: "Vous n'êtes pas authorisé à faire ça" });
    }
    if (user.id !== parseInt(req.params.id, 10)) {
      if (user.refRole.toLowerCase() !== 'superadmin') {
        return res.status(403).json({
          message: "Vous n'êtes pas authorisé à faire ça",
          dataUser: user.id,
          dataParam: req.params.id,
        });
      }
    }
    next();
  });
};

module.exports.checkToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) {
    return res.status(401).json({ message: "Vous n'êtes pas connecté" });
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (err) => {
    if (err) {
      return res
        .status(403)
        .json({ message: "Vous n'êtes pas authorisé à faire ça" });
    }
    next();
  });
};

module.exports.checkTokenEtaForEvents = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) {
    return res.status(401).json({ message: "Vous n'êtes pas connecté" });
  }
  if (!req.params.idEvent) {
    return res.status(404).json({ message: "Cet events n'existe pas" });
  }
  const event = await prismaEvent.findUnique({
    where: {
      id: parseInt(req.params.idEvent, 10),
    },
  });
  if (!event) {
    return res.status(404).json({ message: "Cet events n'existe pas" });
  }
  jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ message: "Vous n'êtes pas authorisé à faire ça" });
    }
    const etablissement = await prismaEta.findUnique({
      where: {
        id: parseInt(event.idEtablissement, 10),
      },
    });
    if (!etablissement) {
      return res
        .status(404)
        .json({ message: "Cet établissement n'existe pas" });
    }
    if (user.refRole.toLowerCase() !== 'superadmin') {
      if (user.idEtablissement !== etablissement.id) {
        return res
          .status(403)
          .json({ message: "Vous n'êtes pas authorisé à faire ça" });
      }
    }
    next();
  });
};

module.exports.checkTokenForParticipeEvent = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) {
    return res.status(401).json({ message: "Vous n'êtes pas connecté" });
  }
  jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ message: "Vous n'êtes pas authorisé à faire ça" });
    }
    if (user.refRole.toLowerCase() !== 'client') {
      return res
        .status(403)
        .json({ message: "Vous n'êtes pas authorisé à faire ça" });
    }
    next();
  });
};

module.exports.checkTokenForUpdateEvents = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) {
    return res.status(401).json({ message: "Vous n'êtes pas connecté" });
  }
  if (!req.params.idEvent) {
    return res.status(404).json({ message: "Cet events n'existe pas" });
  }
  const event = await prismaEvent.findUnique({
    where: {
      id: parseInt(req.params.idEvent, 10),
    },
  });
  if (!event) {
    return res.status(404).json({ message: "Cet events n'existe pas" });
  }
  jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ message: "Vous n'êtes pas authorisé à faire ça" });
    }
    if (
      user.refRole.toLowerCase() !== 'gérant'
      && user.refRole.toLowerCase() !== 'superadmin'
    ) {
      return res
        .status(403)
        .json({ message: "Vous n'êtes pas authorisé à faire ça" });
    }
    if (user.refRole.toLowerCase() === 'gérant') {
      const checkUser = await prismaUser.findUnique({
        where: {
          id: parseInt(user.id, 10),
        },
      });
      if (!checkUser) {
        return res.status(404).json({ message: "Cet user n'existe pas" });
      }
      if (checkUser.idEtablissement !== event.idEtablissement) {
        return res
          .status(403)
          .json({ message: "Vous n'êtes pas authorisé à faire ça" });
      }
    }
  });
  next();
};

module.exports.checkTokenDiffuser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) {
    return res.status(401).json({ message: "Vous n'êtes pas connecté" });
  }
  if (!req.params.idEvent) {
    return res.status(404).json({ message: "Cet events n'existe pas" });
  }
  const event = await prismaEvent.findUnique({
    where: {
      id: parseInt(req.params.idEvent, 10),
    },
  });
  if (!event) {
    return res.status(404).json({ message: "Cet events n'existe pas" });
  }
  const encheres = await prismaEnchere.findMany({
    where: {
      idEvent: parseInt(req.params.idEvent, 10),
    },
  });
  if(!encheres) {
    return res.status(404).json({ message: "Il n'y a pas d'enchères pour cette événement" });
  }
  req.body.encheres = encheres;
  jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ message: "Vous n'êtes pas authorisé à faire ça" });
    }
    if (user.refRole.toLowerCase() !== 'superadmin') {
        try{
            const checkUser = await prismaUser.findUnique({
                where: {
                    id: parseInt(user.id, 10),
                },
            });
            if (!checkUser) {
                return res.status(404).json({ message: "Cet user n'existe pas" });
            }
            if (checkUser.idEtablissement !== event.idEtablissement) {
                return res
                    .status(403)
                    .json({ message: "Vous n'êtes pas authorisé à faire ça" });
            }
        }
        catch (e) {
            return res
                .status(403)
                .json({ message: "Vous n'êtes pas authorisé à faire ça 3" });
        }
    }
    next();
  });
}



