var express = require('express');
var router = express.Router();

// ---------- Página inicial ---------- //
router.get('/', function(req, res) {
  global.db.findAll((e, docs) => {
      if(e) { return console.log(e); }
      res.render('index', { title: 'Estante Colmeia de Livros', docs: docs });
  })
})

module.exports = router;

// ---------- Parte de criação de novo registro ---------- //
router.get('/new', function(req, res, next) {
  res.render('new', { title: 'Novo Cadastro', doc: {"titulo":"", "autor":"", "editora":"",
  "paginas":"", "genero":"", "ano":"", "local":"", "serie":""}, action: '/new' });
});

router.post('/new', function(req, res) {
  var titulo = req.body.titulo;
  var autor = req.body.autor;
  var editora = req.body.editora;
  var paginas = parseInt(req.body.paginas);
  var genero = req.body.genero;
  var ano = parseInt(req.body.ano);
  var local = req.body.local;
  var serie = req.body.serie;
  
  global.db.insert({titulo, autor, editora, paginas, genero, ano, local, serie}, (err, result) => {
          if(err) { return console.log(err); }
          res.redirect('/');
  })
})

// ---------- Parte de edicao ---------- //
router.get('/edit/:id', function(req, res, next) {
  var id = req.params.id;
  global.db.findOne(id, (e, docs) => {
      if(e) { return console.log(e); }
      res.render('new', { title: 'Edição de Cliente', doc: docs[0], action: '/edit/' + docs[0]._id });
  });
})

router.post('/edit/:id', function(req, res) {
  var id = req.params.id;
  var titulo = req.body.titulo;
  var autor = req.body.autor;
  var editora = req.body.editora;
  var paginas = parseInt(req.body.paginas);
  var genero = req.body.genero;
  var ano = parseInt(req.body.ano);
  var local = req.body.local;
  var serie = req.body.serie;

  global.db.update(id, {titulo, autor, editora, paginas, genero, ano, local, serie}, (e, result) => {
        if(e) { return console.log(e); }
        res.redirect('/');
  });
});

// ---------- Parte de deleção ---------- //
router.get('/delete/:id', function(req, res) {
  var id = req.params.id;
  global.db.deleteOne(id, (e, r) => {
        if(e) { return console.log(e); }
        res.redirect('/');
      });
});

// ---------- Parte de criação de novo registro ---------- //
router.get('/book', function(req, res, next) {
  res.render('book', { title: 'Novo Cadastro', doc: {}, action: '/book' });
});

router.get('/book/:id', function(req, res, next) {
  var id = req.params.id;
  global.db.findOne(id, (e, docs) => {
      if(e) { return console.log(e); }
      res.render('book', { title: 'Livro', doc: docs[0], action: '/book/' + docs[0]._id });
  });
})