const Book = require('../models/bookModel');

exports.post = async (req, res, next) => {
    const book = new Book(req.body);
    try {
        const response = await book.save();

        if (!response) throw new Error('Erro ao cadastrar novo livro.');

        req.io.emit('newBook', response);

        return res.status(201).send({ msg: 'Livro cadastrado com sucesso!' });
    } catch (e) {
        res.status(500).send({ msg: 'Erro ao cadastrar cliente => ' + e });
    }
};

exports.get = async (req, res, next) => {
    const id = req.params.id;

    if (!id) {

        try {
            const response = await Book.find({}).sort('-createdAt');
            return res.status(200).send(response);

        } catch (e) {
            return res.status(500).send({ message: 'Falha na requisição => ' + e });
        }

    } else {

        try {
            const response = await Book.findOne({ _id: id });
            return res.status(200).send(response);
        } catch (e) {
            return res.status(500).send({ message: 'Falha na requisição => ' + e });
        }

    }
};

exports.delete = async (req, res, next) => {
    const book_id = req.params.book_id;

    try {
        const response = await Book.findOneAndDelete({ _id: book_id });

        if (!response) throw new Error('Código do livro não encontrado');

        return res.status(200).send({ msg: 'Livro excluído com sucesso.' });

    } catch (e) {
        return res.status(500).send({ message: 'Falha na requisição => ' + e });
    }
};