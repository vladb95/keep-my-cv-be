import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import initializeDb from './db';
import middleware from './middleware';
import api from './api';
import config from './config.json';

let app = express();
app.server = http.createServer(app);

app.set('superSecret', 'HowToBePolite1221?SayPlease');

// logger
app.use(morgan('dev'));

// 3rd party middleware
app.use(cors({
	exposedHeaders: config.corsHeaders
}));

app.use(bodyParser.urlencoded())

app.use(bodyParser.json());

// internal middleware
app.use(middleware({ config }));

// api router
app.use('/api', api({ config }));

app.use('/static', express.static(__dirname + '/public'));

app.server.listen(process.env.PORT || config.port);

console.log(`Started on port ${app.server.address().port}`);

export default app;