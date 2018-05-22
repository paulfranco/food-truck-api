import http from 'http';
import express from 'express';
import bp from 'body-parser';
import mongoose from 'mongoose';

import config from './config';
import routes from './routes';

let app = express();
app.server = http.createServer(app);

// middleware
// parse application/json
app.use(bp.json({
    limit: config.bodyLimit
}))
// passport config

// api route v1
app.use('/v1', routes);

app.server.listen(config.port);
console.log('Started on port ${app.server.address().port}');

export default app;
