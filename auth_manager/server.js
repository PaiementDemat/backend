const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { MongoClient } = require('mongodb')

const { PORT, HOST, MONGO_URL } = require('./src/config/config');

const routes = require('./src/routes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('combined'));

app.use('/auth', routes)

// Connect to mongo

console.log(MONGO_URL)

MongoClient.connect(MONGO_URL, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    function (err, client) {
        if (err) console.error(err);
        if (client) {
            app.locals.db = {
                payment: client.db()
            }

            app.listen(PORT, HOST, err => {
                if (err) throw err;

                console.log('Listening on http://' + HOST + ':' + PORT );
            });
        }
});

process.on('exit', () => {
    MongoClient.close()
})