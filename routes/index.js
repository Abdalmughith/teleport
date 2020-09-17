const hotelController = require('../controllers').hotels;
const roomController = require('../controllers').rooms;
const customersController = require('../controllers').customers;
const reservationsController = require('../controllers').reservations;



module.exports = (app) => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the teleport API!',
    }));

    app.post('/api/hotels', hotelController.add);
    app.post('/api/hotels/addWithRooms', hotelController.addWithRooms);
    app.get('/api/hotels', hotelController.list);
    app.get('/api/hotels/:id', hotelController.getById);
    app.put('/api/hotels/:id', hotelController.update);
    app.delete('/api/hotels/:id', hotelController.delete);


    app.post('/api/rooms', roomController.add);
    app.get('/api/rooms', roomController.list);
    app.get('/api/rooms/getInventory/:id', roomController.getInventory);
    app.get('/api/rooms/getAvailbe/:from/:to', roomController.getAvailabe);

    app.get('/api/rooms/:id', roomController.getById);
    app.put('/api/rooms/:id', roomController.update);
    app.delete('/api/rooms/:id', roomController.delete);

    
    app.post('/api/customers', customersController.add);
    app.get('/api/customers', customersController.list);
    app.get('/api/customers/:id', customersController.getById);
    app.put('/api/customers/:id', customersController.update);
    app.delete('/api/customers/:id', customersController.delete);
    

    app.post('/api/reservations', reservationsController.add);
    app.get('/api/reservations', reservationsController.list);
    app.get('/api/reservations/:id', reservationsController.getById);
    app.put('/api/reservations/:id', reservationsController.update);
    app.delete('/api/reservations/:id', reservationsController.delete);
   


    app.get('/api/initializeDB', (req,res)=>{

        const sequelize = require('../models').sequelize
        sequelize.sync({ force: true })
        res.send({ message:"initializing DB done!"})

    });

}