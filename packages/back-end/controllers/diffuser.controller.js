const {PrismaClient} = require('@prisma/client');


const prisma = new PrismaClient();

module.exports.diffuser = async (req, res) => {
    const testEnchere = req.body.encheres;
    const {idEvent} = req.params;
    if(!testEnchere || !idEvent){
        return res.status(400).json({message: 'Il manque des informations'});
    }
    try{
        // Je veux recuperer les enchères de l'event enregistrer dans la base diffuser les nbslots premières enchères et rembourser les autres

        const enchere = await prisma.enchere.findMany({
            where: {
                idEvent: parseInt(idEvent, 10),
            },
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
            },
            orderBy: {
                prix: 'desc',
            },
        });
        const event = await prisma.event.findUnique({
            where: {
                id: parseInt(idEvent, 10),
            },
        });
        const nbslots = event.nbSlots;
        const enchereDiffusees = enchere.slice(0, nbslots);
        enchereDiffusees.forEach(async (lstEnchere) => {
            await prisma.diffuser.create({
                data: {
                    idEvent: parseInt(idEvent, 10),
                    idUser: lstEnchere.idUser,
                    idMusique: lstEnchere.idMusique,
                    slot: enchereDiffusees.indexOf(lstEnchere) + 1,
                },
            });
        },
        );
        const enchereARembourser = enchere.slice(nbslots);
        enchereARembourser.forEach(async (lstEnchere2) => {
            await prisma.user.update({
                where: {
                    id: parseInt(lstEnchere2.idUser, 10),
                },
                data: {
                    dediCoins: {
                        increment: lstEnchere2.prix,
                    },
                },
            });
        });
        await prisma.event.update({
            where: {
                id: parseInt(idEvent, 10),
            },
            data:{
                isActive: false,
            },
        });
        return res.status(200).json({message: 'Les enchères ont bien été diffusées', enchere: enchereDiffusees, remboursé : enchereARembourser});
    }
    catch (e) {
        return res.status(500).json({message: "Une erreur s'est produite", error: e});
    }
    finally {
        await prisma.$disconnect();
    }
};

module.exports.vote = async (req, res) => {
    const {idEvent} = req.params;
    if(!idEvent){
        return res.status(400).json({message: 'Il manque des informations'});
    }
    try{
        const enchere = await prisma.event.findUnique({
            where: {
                id: parseInt(idEvent, 10),
            },
            include: {
                diffuser: {
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
                    },
                    orderBy: {
                        prix: 'desc',
                    },
                },
            },
        })
        return res.status(200).json({message: 'Les enchères ont bien été diffusées', enchere});
    }
    catch (e) {
        return res.status(500).json({message: "Une erreur s'est produite", error: e});
    }
    finally {
        await prisma.$disconnect();
    }


};