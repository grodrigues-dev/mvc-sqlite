const db = require('../config/database');
const LivroDao = require('../DAO/livro-dao');

module.exports = app => {

    app.get('/livros', (req, res) => {
        const livroDao = new LivroDao(db);
        livroDao.lista()
            .then(livros => res.marko(
                require('../views/livros/listagem/lista.marko'),
                {
                    livros: livros
                }
            ))
            .catch(erro => console.log(erro));
    });


    app.get('/livros/form', (req, res) => {
        res.marko(require('../views/livros/form/form.marko'), {livro: {}});
    });


    // app.post('/livros', (req, res) => console.log(req.body))

    app.post('/livros', (req, res) => {
        console.log(req.body);
        const livroDao = new LivroDao(db);
        livroDao.add(req.body)
            .then(res.redirect('/livros'))
            .catch(erro => console.log(erro));
    });

    app.put('/livros', (req, res) => {
        console.log(req.body);
        const livroDao = new LivroDao(db);
        livroDao.update(req.body)
            .then(res.redirect('/livros'))
            .catch(erro => console.log(erro));
    });


    app.get('/livros/busca', (req, res) => {
        res.marko(require('../views/livros/buscar/busca.marko'))
    })



    app.post('/livros', (req, res) => {
        const livroDao = new LivroDao(db); 
        livroDao.busca(req.body)
            .then(console.log())
            .catch(erro => console.log(erro)
            )
    })

    app.delete('/livros/:id', (req, res) => {
        let id = req.params.id;
        const livroDao = new LivroDao(db);
        livroDao.remove(id)
            .then(() => {
                res.status(200).end()
            })
            .catch(err => console.log(err)
            )
    })

    app.get('/livros/form/:id', (req, res) => {
        const id = req.params.id;
        const livroDao = new LivroDao(db);
        livroDao.busca(id)
            .then(livro => res.marko(require('../views/livros/form/form.marko'),
                { livro: livro }
            )
            )
            .catch(err => console.log(err))
    });

}