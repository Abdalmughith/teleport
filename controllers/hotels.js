const Hotel = require('../models').Hotel;
const Room = require('../models').Room;
const Customer = require('../models').Customer;
const Reservation = require('../models').Reservation;



module.exports = {
    list(req, res) {
        return Hotel
            .findAll({
                include: [{
                    model: Room,
                    as: 'Rooms'
                }],
            })
            .then((hotels) => res.status(200).send(hotels))
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        return Hotel
            .findByPk(req.params.id, {
                include: [{
                    model: Room,
                    as: 'Rooms'
                }],
            })
            .then((hotel) => {
                if (!hotel) {
                    return res.status(404).send({
                        message: 'hotel Not Found',
                    });
                }
                return res.status(200).send(hotel);
            })
            .catch((error) => {
                console.log(error);
                res.status(400).send(error);
            });
    },

    add(req, res) {
        return Hotel
            .create({
                hotelName: req.body.hotelName,
            })
            .then((hotel) => res.status(201).send(hotel))
            .catch((error) => res.status(400).send(error));
    },

    addWithRooms(req, res) {
        return Hotel
            .create({
                hotelName: req.body.hotelName,
                Rooms: req.body.Rooms,
            }, {
                include: [{
                    model: Room,
                    as: 'Rooms'
                }]
            })
            .then((hotel) => res.status(201).send(hotel))
            .catch((error) => res.status(400).send(error));
    },

    update(req, res) {
        return Hotel
            .findByPk(req.params.id)
            .then(hotel => {
                if (!hotel) {
                    return res.status(404).send({
                        message: 'hotel Not Found',
                    });
                }
                return hotel
                    .update({
                        hotelName: req.body.hotelName || hotel.hotelName,
                    })
                    .then(() => res.status(200).send(hotel))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

    delete(req, res) {
        return Hotel
            .findByPk(req.params.id)
            .then(hotel => {
                if (!hotel) {
                    return res.status(400).send({
                        message: 'hotel Not Found',
                    });
                }
                return hotel
                    .destroy()
                    .then(() => res.status(204).send({
                        message: 'done' 
                    }))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
};