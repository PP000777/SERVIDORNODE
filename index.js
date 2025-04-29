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