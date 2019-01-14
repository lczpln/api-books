const User = require('../models/userModel');
const Book = require('../models/bookModel');

exports.post = async (req, res, next) => {
    const user = new User(req.body);
    try {
        const response = await user.save();

        if (!response) throw new Error('Erro ao cadastrar novo usuário.');

        return res.status(201).send({ msg: 'Usuário cadastrado com sucesso!' });
    } catch (e) {
        res.status(500).send({ msg: 'Erro ao cadastrar usuário => ' + e });
    }
};

exports.put = async (req, res, next) => {
    const user_id = req.params.book_card;
    const book_id = req.params.book_id;
    try {
        const book = await Book.findOne({ _id: book_id });

        if (!book) throw new Error('Não foi possível localizar livro.');

        const response_book = await Book.findOneAndUpdate(
            {
                _id: book._id
            },
            {
                'avaliable': false,
            }
        );

        if (!response_book) throw new Error('Não foi possível localizar livro.');

        const response = await User.findOneAndUpdate(
            {
                bookcard: user_id
            },
            {
                'books.book._id': book._id,
                'books.book.name': book.name,
                'books.book.author': book.author,
                'books.book.category': book.category,
            }
        );

        if (!response) throw new Error('Não foi possível cadastrar livro no usuário.');

        req.io.emit('reservedBook', response_book);

        return res.status(200).send({ msg: "Operação realizada com sucesso." });

    } catch (e) {
        res.status(500).send({ msg: 'Erro ao cadastrar livro no usúario => ' + e });
    }
};

exports.get = async (req, res, next) => {
    const id = req.params.id;

    if (!id) {

        try {
            const response = await User.find({}).sort('-createdAt');
            return res.status(200).send(response);

        } catch (e) {
            return res.status(500).send({ message: 'Falha na requisição => ' + e });
        }

    } else {

        try {
            const response = await User.findOne({ bookcard: id });
            return res.status(200).send(response);
        } catch (e) {
            return res.status(500).send({ message: 'Falha na requisição => ' + e });
        }

    }
};

exports.delete = async (req, res, next) => {
    const user_id = req.params.book_card;

    if (req.originalUrl === '/users/del_book/' + user_id) {

        try {
            const user = await User.findOne({ bookcard: user_id });
            const book_response = await Book.findOneAndUpdate(
                {
                    '_id': user.books.book._id
                },
                {
                    'avaliable': true,
                }
            );

            if (!book_response) throw new Error('Não foi possível excluir livro do usuário.');

            const response = await User.findOneAndUpdate(
                {
                    bookcard: user_id
                },
                {
                    'books.book': {}
                }
            );

            if (!response) throw new Error('Não foi possível excluir livro do usuário.');

            req.io.emit('bookAvaliable', book_response);

            return res.status(200).send({ msg: "Operação realizada com sucesso." });

        } catch (e) {
            res.status(500).send({ msg: 'Erro ao excluir livro do usúario => ' + e });
        }

    } else {

        try {
            const response = await User.findOneAndDelete({ bookcard: user_id });

            if (!response) throw new Error('Código do usuário não encontrado');

            return res.status(200).send({ msg: 'Usúario excluído com sucesso.' });

        } catch (e) {
            return res.status(500).send({ message: 'Falha na requisição => ' + e });
        }
    }
};
