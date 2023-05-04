import * as express from 'express';
import { Application } from 'express';

import * as bodyParser from 'body-parser';
import mongoose, { ConnectOptions } from 'mongoose';

import { router } from './routes';

const run = (): Promise<typeof mongoose> => mongoose.connect(
    `${process.env.MONGO_URI}/info`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } as ConnectOptions
);

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use('/api/users', router);

run()
    .then(() => {
        app.listen(port, () => {
            console.log(`User service listening on port ${port}`);
        });
    })
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
