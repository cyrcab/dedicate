const PrismaClient = require('@prisma/client').PrismaClient;
const prismaEnchere = new PrismaClient().enchere;
const prismaMusique = new PrismaClient().musique;
const prismaUser = new PrismaClient().user;
const prismaEvent = new PrismaClient().event;

module.exports.vote = async (req, res) => {
 const { eventId, userId, enchereId, nomMusique, artisteMusique, prix} = req.body;
 if(!eventId || !userId || !prix){
   return res.status(400).json({ message: "Il manque des informations" });
 }
 const user = await prismaUser.findUnique({
    where: {
        id: parseInt(userId, 10),
    }
    });
    if (!user) {
        return res.status(404).json({ message: "Cet utilisateur n'existe pas" });
    }
    const event = await prismaEvent.findUnique({
        where: {
            id: parseInt(eventId, 10),
        }
        });
        if (!event) {
            return res.status(404).json({ message: "Cet évènement n'existe pas" });
        }


    if(enchereId){
        const enchere = await prismaEnchere.findUnique({
            where: {
                id: parseInt(enchereId, 10),
            }
            });
            if (!enchere) {
                return res.status(404).json({ message: "Cette enchère n'existe pas" });
            }
            if(enchere.prix > prix){
                return res.status(400).json({ message: "Le prix de l'enchère est supérieur à celui proposé", enchere: enchere });
            }
            const updatedEnchere = await prismaEnchere.update({
                where: {
                    id: parseInt(enchereId, 10),
                },
                data: {
                    prix: prix,
                    user: {
                        connect: {
                            id: parseInt(userId, 10),
                        }
                    },
                }
            });

            const updatedMusique = await prismaMusique.update({
                where: {
                    id: parseInt(enchere.musiqueId, 10),
                },
                data: {
                    countVote: {
                        increment: 1,
                    },
                }
            });
            return res.status(200).json({ message: "L'enchère a bien été mise à jour", enchere: updatedEnchere, musique: updatedMusique });
    } else {
        if(!nomMusique || !artisteMusique){
            return res.status(400).json({ message: "Il manque des informations" });
        }
        const musique = await prismaMusique.findUnique({
            where: {
                titre: nomMusique,
                artiste: artisteMusique,
            }
        });
        if (!musique) {
            const newMusique = await prismaMusique.create({
                data: {
                    titre: nomMusique,
                    artiste: artisteMusique,
                    countVote: 1,
                    countDiffuse: 0,
                }
            });
            const newEnchere = await prismaEnchere.create({
                data: {
                    prix: prix,
                    user: {
                        connect: {
                            id: parseInt(userId, 10),
                        }
                    },
                    event: {
                        connect: {
                            id: parseInt(eventId, 10),
                        }
                    },
                    musique: {
                        connect: {
                            id: newMusique.id,
                        }
                    },
                }
            });
            return res.status(200).json({ message: "L'enchère a bien été créée", enchere: newEnchere, musique: newMusique });
        } else {
            const newEnchere = await prismaEnchere.create({
                data: {
                    prix: prix,
                    user: {
                        connect: {
                            id: parseInt(userId, 10),
                        }
                    },
                    event: {
                        connect: {
                            id: parseInt(eventId, 10),
                        }
                    },
                    musique: {
                        connect: {
                            id: musique.id,
                        }
                    },
                }
            });
            const updatedMusique = await prismaMusique.update({
                where: {
                    id: musique.id,
                },
                data: {
                    countVote: {
                        increment: 1,
                    },
                }
            });

            return res.status(200).json({ message: "L'enchère a bien été créée", enchere: newEnchere, musique: updatedMusique });

        }        
    }
        
}

