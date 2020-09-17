const Customer = require('../models').Customer;


module.exports = {
    list(req, res) {
        return Customer
            .findAll({
            })
            .then((customers) => res.status(200).send(customers))
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        return Customer
            .findByPk(req.params.id, {

            })
            .then((customer) => {
                if (!customer) {
                    return res.status(404).send({
                        message: 'customer Not Found',
                    });
                }
                return res.status(200).send(customer);
            })
            .catch((error) => {
                console.log(error);
                res.status(400).send(error);
            });
    },

    add(req, res) {
        return Customer
            .create({
                firstName: req.body.firstName,
                lastName: req.body.firstName,
            })
            .then((customer) => res.status(201).send(customer))
            .catch((error) => res.status(400).send(error));
    },


    update(req, res) {
        return Customer
            .findByPk(req.params.id)
            .then(customer => {
                if (!customer) {
                    return res.status(404).send({
                        message: 'customer Not Found',
                    });
                }
                return customer
                    .update({

                        firstName: req.body.firstName || customer.firstName,
                        lastName: req.body.firstName || customer.firstName,
                    })
                    .then(() => res.status(200).send(customer))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
    delete(req, res) {
        return Customer
            .findByPk(req.params.id)
            .then(customer => {
                if (!customer) {
                    return res.status(400).send({
                        message: 'customer Not Found',
                    });
                }
                return customer
                    .destroy()
                    .then(() => res.status(204).send({
                        message: 'done'
                    }))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
};