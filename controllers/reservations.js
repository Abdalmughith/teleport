const Room = require('../models').Room;
const Customer = require('../models').Customer;
const Reservation = require('../models').Reservation;
const sequelize = require('../models').sequelize
const Op = require('sequelize').Op;


module.exports = {
    list(req, res) {
        return Reservation
            .findAll({
                include: [{
                    model: Customer,
                    as: 'Customer'
                }, {
                    model: Room,
                    as: 'Rooms'
                }],
                order: [
                    ['createdAt', 'DESC'],
                    [{ model: Customer, as: 'Customer' }, 'createdAt', 'DESC'],
                ],
            })
            .then((reservations) => res.status(200).send(reservations))
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        return Reservation
            .findByPk(req.params.id, {
                include: [{
                    model: Customer,
                    as: 'Customer'
                }, {
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

    async add(req, res) {
        const transaction = await sequelize.transaction();
        try {

            let reservation = await Reservation
                .create({
                    checkIn: req.body.checkIn,
                    checkOut: req.body.checkOut,
                    totalPayment: req.body.totalPayment,
                    CustomerId: req.body.CustomerId,
                    Rooms: req.body.Rooms
                }, {
                    include: [{
                        model: Customer,
                        as: 'Customer'
                    }],
                transaction})

            await Promise.all(req.body.Rooms.map(async (element) => {

                let room = await Room.findAll(
                    {
                        include: [{
                            model: Reservation,
                            as: 'Reservations',
                            required: false
                        }], where: {
                            [Op.or]: [
                                {
                                    '$Reservations.checkIn$': { [Op.gt]: req.body.checkOut },

                                },
                                {
                                    '$Reservations.checkOut$': { [Op.lt]: req.body.checkIn }
                                },
                                {
                                    '$Reservations.checkOut$': { [Op.eq]: null }
                                },
                            ],
                            '$Room.id$': { [Op.eq]: element }
                        },
                    }
                );
                if (room.length == 0)
                    throw {err:"room not available!"};
                await reservation.addRoom(room,{    })
            
            }))
            await transaction.commit();
            res.status(201).send(reservation)

        } catch (error) {
            if (transaction) await transaction.rollback();
            res.status(400).send(error)
        }


    },

    addWithRooms(req, res) {
        return Reservation
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
        return Reservation
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
        return Reservation
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