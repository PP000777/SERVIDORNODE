const {listarAulas,atualizarAulas} = require('./aulas_modelo.js')

function pegarTodasAulas(req, res){
    const aulas = listarAulas();
    res.json(aulas);
}

function postarAula(req, res){
    const aulas = listarAulas();
    const novaAula = req.body;
    const ultimoId = aulas.length > 0 ? Math.max(...aulas.map(a => a.id)) : 0;
    novaAula.id = ultimoId + 1;

    aulas.push(novaAula);
    atualizarAulas(aulas);
    res.status(201).json(novaAula);
}

function putAulas(req, res){
        const aulas = listarAulas();
        const id = parseInt(req.params.id);
        const index = aulas.findIndex(a => a.id === id);
        if (index === -1) return res.status(404).json({ erro: "Aula não encontrada" });
    
        aulas[index] = { ...aulas[index], ...req.body };
        atualizarAulas(aulas);
        res.json(aulas[index]);
}

function deletarAula(req, res){
    let aulas = listarAulas();
    const id = parseInt(req.params.id);
    const novaLista = aulas.filter(a => a.id !== id);
    if (novaLista.length === aulas.length) return res.status(404).json({ erro: "Aula não encontrada" });

    atualizarAulas(novaLista);
    res.status(204).send();
}

module.exports = {
    pegarTodasAulas,
    postarAula,
    putAulas,
    deletarAula
}