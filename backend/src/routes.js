const express = require('express');
const OngControler = require('./controllers/OngController');
const IncidentControler = require('./controllers/IncidentController');
const ProfileControler = require('./controllers/ProfileController');
const SessionControler = require('./controllers/SessionController');


const routes = express.Router();

routes.post('/sessions', SessionControler.create)

routes.get('/ongs', OngControler.index);
routes.post('/ongs', OngControler.create);

routes.get('/incident', IncidentControler.index);
routes.post('/incident', IncidentControler.create);
routes.delete('/incident/:id', IncidentControler.delete);

routes.get('/profile', ProfileControler.index);

module.exports = routes;