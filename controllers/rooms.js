const Room = require('../models').Room;
const Reservation = require('../models').Reservation;

const Op = require('sequelize').Op;
module.exports = {

    list(req, res) {
        return Room
            .findAll({
            })
            .then((rooms) => res.status(200).send(rooms))
            .catch((error) => { res.status(400).send(error); });
    },
    listt(req, res) {

        console.log("listt -> req.params.id", req.params.from)

        console.log("listt -> req.params.id", req.params.to)
        return Room
            .findAvailable()
            .then((rooms) => res.status(200).send(rooms))
            .catch((error) => { res.status(400).send(error); });
    },
    getById(req, res) {
        return Room
            .findByPk(req.params.id, {

            })
            .then((room) => {
                if (!room) {
                    return res.status(404).send({
                        message: 'room Not Found',
                    });
                }
                return res.status(200).send(room);
            })
            .catch((error) => {
                console.log(error);
                res.status(400).send(error);
            });
    },
    getInventory(req, res) {
        return Room
            .findByPk(req.params.id, {
                include: [{
                    model: Reservation,
                    as: 'Reservations'
                }]
            })
            .then((room) => {
                if (!room) {
                    return res.status(404).send({
                        message: 'room Not Found',
                    });
                }
                return res.status(200).send(room);
            })
            .catch((error) => {
                console.log(error);
                res.status(400).send(error);
            });
    },

    getAvailabe(req, res) {

        return Room
            .findAll({
                include: [{
                    model: Reservation,
                    as: 'Reservations',
                    required: false


                }], where: {
                    [Op.or]: [
                        {
                            '$Reservations.checkIn$': { [Op.gt]: req.params.to },
                            
                        },
                        {
                            '$Reservations.checkOut$': { [Op.lt]: req.params.from }
                        },
                        {
                            '$Reservations.checkOut$': { [Op.eq]: null }
                        },

                    ],
                },
            })
            .then((room) => {
                if (!room) {
                    return res.status(404).send({
                        message: 'room Not Found',
                    });
                }
                return res.status(200).send(room);
            })
            .catch((error) => {
                console.log(error);
                res.status(400).send(error);
            });
    },
    add(req, res) {
        return Room
            .create({
                bedNumber: req.body.bedNumber,
                price: req.body.price,
            })
            .then((room) => res.status(201).send(room))
            .catch((error) => res.status(400).send(error));
    },


    update(req, res) {
        return Room
            .findByPk(req.params.id)
            .then(room => {
                if (!room) {
                    return res.status(404).send({
                        message: 'room Not Found',
                    });
                }
                return room
                    .update({
                        bedNumber: req.body.bedNumber || room.bedNumber,
                        price: req.body.price || room.price,
                    })
                    .then(() => res.status(200).send(room))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
    delete(req, res) {
        return Room
            .findByPk(req.params.id)
            .then(room => {
                if (!room) {
                    return res.status(400).send({
                        message: 'room Not Found',
                    });
                }
                return room
                    .destroy()
                    .then(() => res.status(204).send({
                        message: 'done'
                    }))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
};