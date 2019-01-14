const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);
io.origins("*:*");

app.use(cors());

//Conecta a DB
mongoose.connect('mongodb://xxxlucasxxx:lucasxxx123@ds030719.mlab.com:30719/api-books', { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

app.use((req, res, next) => {
    req.io = io;
    return next();
});

//Carrega as rotas
const routes = require('./routes');
app.use(routes);

//Porta randomica
var port = process.env.PORT || 3001;

//Ouve a porta 
server.listen(port, () => {
    console.log("Server listening on port " + port + " (:");
})

module.exports = app;