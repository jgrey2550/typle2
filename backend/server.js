const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
//port from .env file

app.use(cors(
    {
        origin: ["https://typle2-frontend.vercel.app"],
        methods: ["POST", "GET", "PUT"],
        credentials: true
    }
));
app.use(express.json());

//testtest
const uri = 'mongodb+srv://jgrey2550:Rq5GF6hwVRYtuutF@cluster0.qgvh47s.mongodb.net/?retryWrites=true&w=majority';
//mongodb uri from .env file

mongoose.connect('mongodb+srv://jgrey2550:Rq5GF6hwVRYtuutF@cluster0.qgvh47s.mongodb.net/?retryWrites=true&w=majority');
// mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
// mongoose.connection.once('open', () => {
//     console.log("Connected MONGODB");
// })
//connect to mongodb

app.get("/", (req, res) => {
    res.json("Hello");
})

const createUserRoute = require('./routes/createUser');
const loginRoute = require('./routes/login');
const globalUser = require('./routes/globalUser');
//routes for login an createUser https

app.use('/createUser', createUserRoute);
app.use('/login', loginRoute);
app.use('/api', globalUser);
// /api for global route can be accessed anywhere

app.listen(port, () => {
    console.log('server run port 5000');
});
//run backend on port 5000
