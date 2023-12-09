const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const { lnd } = require('./utils');

dotenv.config();

const app = express();

lnd.connect();

app.use(bodyParser.json());

app.use(cors({
   origin: '*',
   methods: ['GET', 'POST'],
   allowedHeaders: ['Content-Type', 'Authorization']
}));

app.options('*', cors());

app.get('/', (req, res) => {
   res.send('Im alive!');
});

app.use("/", require("./routes"));
app.listen(process.env.PORT || 3000, () => {
   console.log(`Server listening on port ${process.env.PORT || 3000}`);
});