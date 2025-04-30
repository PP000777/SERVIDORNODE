const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());

app.use('/f1', require('./aulas_router.js'));
app.listen(8000, () => console.log('Servidor rodando na porta 8000'));
