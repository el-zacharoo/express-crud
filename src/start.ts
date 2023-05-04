import * as express from 'express';
import { Application } from 'express';

import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';

import { router } from './routes';

// await for mongo connection before starting the server
async (): Promise<void> => {
    try {
        // connected to mongo
        console.log("Connected to MongoDB");
        await mongoose.connect(`${process.env.MONGO_URI}/info`)
        const app: Application = express();
        const port = process.env.PORT || 3000;

        app.use(express.json());
        app.use(bodyParser.json());
        app.use('/api/users', router);

        app.listen(port, () => {
            // connected to express
            console.log(`User service listening on port ${port}`);
        });
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
}