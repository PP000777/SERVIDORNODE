const express = require('express')
const {listarAulas,atualizarAulas} = require('./aulas_modelo.js')
const {pegarTodasAulas,postarAula, putAulas,deletarAula} = require('./controle_aulas.js')
const router_aulas = express.Router()

//incluir rotas que fazem parte do roteador

router_aulas.get('/aulas', pegarTodasAulas);


router_aulas.post('/aulas',postarAula);


router_aulas.put('/aulas/:id',putAulas);

router_aulas.delete('/aulas/:id', deletarAula);

module.exports = router_aulas