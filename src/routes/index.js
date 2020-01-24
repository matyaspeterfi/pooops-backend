const { conn } = require('../services/connectToDB');

const express = require('express');
const router = express.Router();

const helloWorldController = require('../controllers/hello-world');
const RegistrationController = require('../controllers/registrationController');
const RegistrationService = require('../services/registrationService');
const Authentication = require('../services/authenticationService');
const LoginController = require('../controllers/loginController');
const LoginService = require('../services/loginService');
const ShitController = require('../controllers/shitController');
const ShitService = require('../services/shitService');

let accTokSec = process.env.ACCESS_TOKEN_SECRET;
let refTokSec = process.env.REFRESH_TOKEN_SECRET;

const auth = new Authentication(accTokSec, refTokSec);

const registrationService = new RegistrationService(conn);
const registrationController = new RegistrationController(registrationService);
const loginService = new LoginService(conn, registrationService, auth.generateAccess, auth.generateRefresh);
const loginController = new LoginController(loginService);
const shitService = new ShitService(conn);
const shitController = new ShitController(shitService, Authentication.getIdFromToken);

router.get('/helloworld', helloWorldController.helloWorldController);

router.post('/register', registrationController.register);

router.post('/login', loginController.login);

router.post('/getToken', auth.refreshedToken);

router.get('/shits', auth.authenticateToken, shitController.getShits);

router.post('/shit', auth.authenticateToken, shitController.postShit)

module.exports = router;
