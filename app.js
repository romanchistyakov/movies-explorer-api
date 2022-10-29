const express = require('express');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');
const routes = require('./routes/index');
const errorHandler = require('./middlewares/errorhandler');
const { MONGO_URL } = require('./utils/config');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect(MONGO_URL);

app.use(bodyParser.json());

app.use(requestLogger);

app.use(cors);

app.use(routes);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, console.log('Server listening on Port:', PORT));
