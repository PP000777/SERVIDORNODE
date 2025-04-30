const express = require('express')
const fs = require('fs')
const app = express()
const PORT = 8000

app.use(express.json())

function salvarBanco(dados, res, resposta) {
    fs.writeFile('bancoDeDados.json', JSON.stringify(dados, null, 4), (err) => {
        if (err) return res.status(500).json({ msg: "Erro ao salvar no banco de dados" })
        res.status(200).json(resposta)
    })
}

app.get('/aulas', (req, res) => {
    fs.readFile('bancoDeDados.json', 'utf-8', (err, data) => {
        if (err) return res.status(500).json({ msg: "Erro ao ler o arquivo" })
        const dados = JSON.parse(data)
        res.status(200).json(dados)
    })
})

app.get('/aulas/:id', (req, res) => {
    const id = parseInt(req.params.id)
    fs.readFile('bancoDeDados.json', 'utf-8', (err, data) => {
        if (err) return res.status(500).json({ msg: "Erro ao ler o banco de dados" })
        const dados = JSON.parse(data)
        const aula = dados.find(item => item.id === id)
        if (!aula) return res.status(404).json({ msg: "Aula não encontrada" })
        res.status(200).json(aula)
    })
})

app.put('/aulas/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const novasInfos = req.body
    fs.readFile('bancoDeDados.json', 'utf-8', (err, data) => {
        if (err) return res.status(500).json({ msg: "Erro ao ler o banco de dados" })
        let dados = JSON.parse(data)
        const index = dados.findIndex(item => item.id === id)
        if (index === -1) return res.status(404).json({ msg: "Aula não encontrada" })
        dados[index] = { ...dados[index], ...novasInfos }
        salvarBanco(dados, res, { msg: "Aula atualizada com sucesso" })
    })
})

app.delete('/aulas/:id', (req, res) => {
    const id = parseInt(req.params.id)
    fs.readFile('bancoDeDados.json', 'utf-8', (err, data) => {
        if (err) return res.status(500).json({ msg: "Erro ao ler o banco de dados" })
        let dados = JSON.parse(data)
        const novosDados = dados.filter(item => item.id !== id)
        if (novosDados.length === dados.length) return res.status(404).json({ msg: "Aula não encontrada" })
        salvarBanco(novosDados, res, { msg: "Aula deletada com sucesso" })
    })
})

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})
