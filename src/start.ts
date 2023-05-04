import * as express from 'express';
import { Application } from 'express';

import { connect, ConnectOptions } from 'mongoose';

import { router } from './routes';
import { userModel } from './services/UserService';

const serve = (): void => {
    const app: Application = express();
    const port = process.env.PORT || 3000;

    app.use(express.json());
    app.use('/api/users', router);

    app.listen(port, () => {
        // connected to express
        console.log(`User service listening on port ${port}`);
    });
}

// await for mongo connection before starting the server
const run = async (): Promise<void> => {
    try {
        // connected to mongo
        console.log("Connected to MongoDB");

        await connect(`${process.env.MONGO_URI}/info`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: true
        } as ConnectOptions);

        await userModel.createIndexes();
        serve();
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
}

run();