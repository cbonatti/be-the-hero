const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const OngControler = require('./controllers/OngController');
const IncidentControler = require('./controllers/IncidentController');
const ProfileControler = require('./controllers/ProfileController');
const SessionControler = require('./controllers/SessionController');


const routes = express.Router();

routes.post('/sessions', celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required()
    })
}), SessionControler.create)

routes.get('/ongs', OngControler.index);
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2)
    })
}), OngControler.create);

routes.get('/incident', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
    }),
}), IncidentControler.index);
routes.post('/incident', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(), 
        description: Joi.string().required(),
        value: Joi.number().required()
    }),
}), IncidentControler.create);
routes.delete('/incident/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    }),
}), IncidentControler.delete);

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), ProfileControler.index);

module.exports = routes;