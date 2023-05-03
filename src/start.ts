var express = require('express');
var mongoose = require('mongoose');

var userRouter = require('./routes');

const run = () => mongoose.connect(
    `${process.env.MONGO_URI}/info`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);
run();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/users', userRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

module.exports = app;