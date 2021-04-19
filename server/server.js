const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const session = require("express-session");
const cookieParser = require("cookie-parser");

const app = express()

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(cookieParser())
app.use(session({
	secret: "Its my secret session - final project wohoo!",
	resave: true,
	saveUninitialized: true,
	cookie: { secure: true }
}))

app.use('/api', require('./apiRouter'));

const port = 8080;
mongoose.connect(
	'mongodb://localhost:27017/316278613',
	{ useNewUrlParser: true, useUnifiedTopology: true }
).then(() => app.listen(port, () => console.log(`Server is running on port ${port}`)))
	.catch(error => console.log(error));

