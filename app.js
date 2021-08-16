const express = require('express')

const app = express();
require('./bootStrap')(app);
require('./middlewares')(app);
require('./routes/index')(app);

const run = () => {
    app.listen(process.env.APP_PORT, () => {
        console.log(`listening to port ${process.env.APP_PORT} ...`);
    })
}

module.exports = run;