const { conn } = require('../services/connectToDB');

const express = require('express');
const router = express.Router();

const helloWorldController = require('../controllers/hello-world');
const RegistrationController = require('../controllers/registrationController');
const RegistrationService = require('../services/registrationService');

const registrationService = new RegistrationService(conn);
const registrationController = new RegistrationController(registrationService);

router.get('/helloworld', helloWorldController.helloWorldController);

router.post('/register', registrationController.register);

module.exports = router;
