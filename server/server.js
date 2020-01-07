/**
 * Created by jithin on 30/12/19.
 */
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require("body-parser");
const app = express();
const path = require('path');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('./dist'));
//require('./models')(mongoose);
require('./todo.routes')(app);
//app.use(express.static('./dist'));

app.get('/', (req, res) => {
  res.sendFile(path.resolve('./dist/index.html'));
});

const db = 'mongodb://localhost/todo-test-1';
const PORT = 4004;
mongoose
    .connect(
        process.env.MONGODB_URI || db,
        { useNewUrlParser: true }
    )
    .then(() => console.log("Mongo connected"))
    .catch(err => console.log(err));

// Specify the Port where the backend server can be accessed and start listening on that port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port}.`));
