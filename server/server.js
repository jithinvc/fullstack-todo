/**
 * Created by jithin on 30/12/19.
 */
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require("body-parser");
const app = express();

app.use(cors());
app.use(bodyParser.json());
//require('./models')(mongoose);
require('./todo.routes')(app);
//app.use(express.static('./dist'));

//app.use('*', (req, res) => {
//  res.sendFile(path.resolve('./dist/index.html'));
//});

const db = 'mongodb://localhost/todo-test-1';
const PORT = 4004;
mongoose
    .connect(
        db,
        { useNewUrlParser: true }
    )
    .then(() => console.log("Mongo connected"))
    .catch(err => console.log(err));

// Specify the Port where the backend server can be accessed and start listening on that port
const port = PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port}.`));
