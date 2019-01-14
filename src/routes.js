const express = require('express');
const route = express.Router();
const bodyParser = require('body-parser');

route.use(bodyParser.json());
route.use(bodyParser.urlencoded({ extended: false }));

const bookCtrl = require('./controllers/bookController');
const userCtrl = require('./controllers/userController');

route.get('/', (req, res, next) => {
    res.status(200).send({
        "API-name": "api-books",
        "version": "v1"
    });
});

route.get('/users', userCtrl.get);
route.get('/users/:id', userCtrl.get);
route.post('/users/add', userCtrl.post);
route.put('/users/:book_card/:book_id', userCtrl.put);
route.delete('/users/del_user/:book_card', userCtrl.delete);
route.delete('/users/del_book/:book_card', userCtrl.delete);

route.get('/books', bookCtrl.get);
route.get('/books/:id', bookCtrl.get);
route.post('/books/add', bookCtrl.post);
route.delete('/books/del/:book_id', bookCtrl.delete);

module.exports = route;