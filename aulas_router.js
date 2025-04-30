const express = require('express')
const {listarAulas,atualizarAulas} = require('./aulas_modelo.js')
const router_aulas = express.Router()

//incluir rotas que fazem parte do roteador

router_aulas.get('/aulas', (req, res) => {
    const aulas = listarAulas();
    res.json(aulas);
});


router_aulas.post('/aulas', (req, res) => {
    const aulas = listarAulas();
    const novaAula = req.body;
    aulas.push(novaAula);
    atualizarAulas(aulas);
    res.status(201).json(novaAula);
});


router_aulas.put('/aulas/:id', (req, res) => {
    const aulas = listarAulas();
    const id = parseInt(req.params.id);
    const index = aulas.findIndex(a => a.id === id);
    if (index === -1) return res.status(404).json({ erro: "Aula não encontrada" });

    aulas[index] = { ...aulas[index], ...req.body };
    atualizarAulas(aulas);
    res.json(aulas[index]);
});

router_aulas.delete('/aulas/:id', (req, res) => {
    let aulas = listarAulas();
    const id = parseInt(req.params.id);
    const novaLista = aulas.filter(a => a.id !== id);
    if (novaLista.length === aulas.length) return res.status(404).json({ erro: "Aula não encontrada" });

    atualizarAulas(novaLista);
    res.status(204).send();
});

module.exports = router_aulas