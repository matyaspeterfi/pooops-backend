require('dotenv').config();
require('env-yaml').config();
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const router = require('./routes/index');
const express = require('express');
const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(PORT, () => console.log(`Port is listening on ${PORT}`));

module.exports = app;
