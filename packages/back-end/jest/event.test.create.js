const jwt = require('jsonwebtoken');
const QRCode = require('qrcode');
const fs = require('fs');
const { jest, describe, expect, it } = require('jest');
const eventController = require('../controllers/event.controller'); 

describe('create', () => {
  it('should create an event', async () => {
    const req = {
      body: {
        nom: 'Event Name',
        lieu: 'Event Location',
        date: '30/09/2023 14:00:00',
        type: 'Event Type',
        prix: 10,
        nbSlots: 100,
        description: 'Event Description',
      },
      headers: {
        authorization: 'Bearer your_jwt_token_here',
      },
    };

    const res = {
      status: jest.fn(),
      json: jest.fn(),
    };

    jwt.verify = jest.fn().mockReturnValue({ id: 1, refRole: 'Gérant' });

    QRCode.toDataURL = jest.fn().mockResolvedValue('mocked_qr_code_image_data');

    fs.createWriteStream = jest.fn().mockReturnValue({ on: jest.fn(), end: jest.fn() });

    await eventController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Événement créé',
      data: {
        id: expect.any(Number), 
        qrCode: 'mocked_qr_code_image_data',
      },
    });
  });

  it('should handle invalid data', async () => {
    const req = {
      body: {
        lieu: 'Event Location',
        date: '30/09/2023 14:00:00',
        type: 'Event Type',
        prix: 10,
        nbSlots: 100,
        description: 'Event Description',
      },
      headers: {
        authorization: 'Bearer your_invalid_jwt_token_here',
      },
    };

    const res = {
      status: jest.fn(),
      json: jest.fn(),
    };

    jwt.verify = jest.fn().mockImplementation(() => {
      throw new Error('Invalid token');
    });

    await eventController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Veuillez remplir tous les champs' });
  });

  it('should handle invalid data', async () => {
    const req = {
      body: {
        nom: 'Event Name',
        date: '30/09/2023 14:00:00',
        type: 'Event Type',
        prix: 10,
        nbSlots: 100,
        description: 'Event Description',
      },
      headers: {
        authorization: 'Bearer your_invalid_jwt_token_here',
      },
    };

    const res = {
      status: jest.fn(),
      json: jest.fn(),
    };

    jwt.verify = jest.fn().mockImplementation(() => {
      throw new Error('Invalid token');
    });

    await eventController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Veuillez remplir tous les champs' });

  });

  it('should handle invalid data', async () => {
    const req = {
      body: {
        nom: 'Event Name',
        date: '30/09/2023 14:00:00',
        type: 'Event Type',
        prix: 10,
        nbSlots: 100,
        description: 'Event Description',
      },
      headers: {
        authorization: 'Bearer your_invalid_jwt_token_here',
      },
    };

    const res = {
      status: jest.fn(),
      json: jest.fn(),
    };

    jwt.verify = jest.fn().mockImplementation(() => {
      throw new Error('Invalid token');
    });

    await eventController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Veuillez remplir tous les champs' });

    });

    it('should handle invalid data', async () => {
        const req = {
          body: {
            nom: 'Event Name',
            lieu: 'Event Location',
            type: 'Event Type',
            prix: 10,
            nbSlots: 100,
            description: 'Event Description',
          },
          headers: {
            authorization: 'Bearer your_invalid_jwt_token_here',
          },
        };
    
        const res = {
          status: jest.fn(),
          json: jest.fn(),
        };
    
        jwt.verify = jest.fn().mockImplementation(() => {
          throw new Error('Invalid token');
        });
    
        await eventController.create(req, res);
    
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'Veuillez remplir tous les champs' });
    
        });
        
    it('should handle invalid data', async () => {
        const req = {
          body: {
            nom: 'Event Name',
            lieu: 'Event Location',
            prix: 10,
            nbSlots: 100,
            description: 'Event Description',
          },
          headers: {
            authorization: 'Bearer your_invalid_jwt_token_here',
          },
        };
    
        const res = {
          status: jest.fn(),
          json: jest.fn(),
        };
    
        jwt.verify = jest.fn().mockImplementation(() => {
          throw new Error('Invalid token');
        });
    
        await eventController.create(req, res);
    
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'Veuillez remplir tous les champs' });
    
        });
      
        it('should handle invalid data', async () => {
          const req = {
            body: {
              nom: 'Event Name',
              date: '30/09/2023 14:00:00',
              prix: 10,
              nbSlots: 100,
              description: 'Event Description',
            },
            headers: {
              authorization: 'Bearer your_invalid_jwt_token_here',
            },
          };
      
          const res = {
            status: jest.fn(),
            json: jest.fn(),
          };
      
          jwt.verify = jest.fn().mockImplementation(() => {
            throw new Error('Invalid token');
          });
      
          await eventController.create(req, res);
      
          expect(res.status).toHaveBeenCalledWith(400);
          expect(res.json).toHaveBeenCalledWith({ message: 'Veuillez remplir tous les champs' });
      
          });
        
          it('should handle invalid data', async () => {
            const req = {
              body: {
                nom: 'Event Name',
                date: '30/09/2023 14:00:00',
                type: 'Event Type',
                nbSlots: 100,
                description: 'Event Description',
              },
              headers: {
                authorization: 'Bearer your_invalid_jwt_token_here',
              },
            };
        
            const res = {
              status: jest.fn(),
              json: jest.fn(),
            };
        
            jwt.verify = jest.fn().mockImplementation(() => {
              throw new Error('Invalid token');
            });
        
            await eventController.create(req, res);
        
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Veuillez remplir tous les champs' });
        
            });
          
      it('should handle invalid data', async () => {
            const req = {
              body: {
                nom: 'Event Name',
                date: '30/09/2023 14:00:00',
                type: 'Event Type',
                prix: 10,
                description: 'Event Description',
              },
              headers: {
                authorization: 'Bearer your_invalid_jwt_token_here',
              },
            };
        
            const res = {
              status: jest.fn(),
              json: jest.fn(),
            };
        
            jwt.verify = jest.fn().mockImplementation(() => {
              throw new Error('Invalid token');
            });
        
            await eventController.create(req, res);
        
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Veuillez remplir tous les champs' });
        
            });

            it('should handle invalid data', async () => {
              const req = {
                body: {
                  nom: 'Event Name',
                  lieu: 'Event Location',
                  prix: 10,
                  nbSlots: 100,
                },
                headers: {
                  authorization: 'Bearer your_invalid_jwt_token_here',
                },
              };
          
              const res = {
                status: jest.fn(),
                json: jest.fn(),
              };
          
              jwt.verify = jest.fn().mockImplementation(() => {
                throw new Error('Invalid token');
              });
          
              await eventController.create(req, res);
          
              expect(res.status).toHaveBeenCalledWith(400);
              expect(res.json).toHaveBeenCalledWith({ message: 'Veuillez remplir tous les champs' });
          
              });
});