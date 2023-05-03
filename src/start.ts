import * as express from 'express';

import * as bodyParser from 'body-parser';
import mongoose, { ConnectOptions } from 'mongoose';

import { router } from './routes';

const run = () => mongoose.connect(
    `${process.env.MONGO_URI}/info`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } as ConnectOptions,
);
run();

const app: express.Application = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api/users', router);

app.listen(port, () => {
    console.log(`User service listening on port ${port}`);
});

module.exports = app;