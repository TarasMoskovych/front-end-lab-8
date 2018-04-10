const express = require('express');
const routes = require('./routes.js');
const bodyParser = require('body-parser');
const port = process.env.port || 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
routes(app);
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});