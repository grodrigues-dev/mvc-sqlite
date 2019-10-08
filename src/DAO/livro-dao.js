class LivroDao {
    constructor(db) {
        this._db = db;
    }

    lista() {
        return new Promise((resolve, reject) => {
            this._db.all(
                'SELECT * FROM LIVROS',
                (err, result) => {
                    if (err) return reject('Não foi possível listar os livros');
                    return resolve(result);
                })
        })
    }


    add(livro) {
        return new Promise((resolve, reject) => {
            this._db.run(`INSERT INTO LIVROS (
            titulo, preco, descricao) 
            values (?,?,?)`, [
                livro.titulo,
                livro.preco,
                livro.descricao
            ],
                err => {
                    if (err) {
                        console.log(err);
                        return reject('Erro ao adicionar livro')
                    }
                    resolve()
                }
            )
        })
    }

    busca(id) {
        return new Promise((resolve, reject) => {
            this._db.get(
                `SELECT * FROM LIVROS WHERE id = ?`, [
                id
            ],
                (err, result) => {
                    if (err) {
                        console.log(err);
                        return reject("Livro não localizado")
                    }
                    return resolve(result);
                }
            )
        })
    }

    remove(id) {
        return new Promise((resolve, reject) => {
            this._db.run(
                `DELETE FROM livros WHERE id=?`, [
                id
            ],
                err => {
                    if (err) {
                        return reject("Erro ao excluir livro")
                    }
                    return resolve()
                })
        })
    }

    update(livro) {
        return new Promise((resolve, reject) => {
            this._db.run(
                `UPDATE livros SET
                titulo = ?,
                preco= ?, 
                descricao = ?
                WHERE id = ?`, [
                livro.titulo,
                livro.preco,
                livro.descricao,
                livro.id
            ],
                (err) => {
                    if (err) {
                        return reject("Livro não localizado")
                    }
                     resolve()
                })
        })
    }

}

module.exports = LivroDao;

