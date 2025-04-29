const fs = require('fs')


console.log('Antes da leitura')

try {
    const data = fs.readFileSync('bancoDeDados.json', 'utf-8')
    console.log('Conteúdo do JSON:', JSON.parse(data))
} catch (e) {
    console.log('Erro ao ler o arquivo:', e)
}

console.log('Depois da leitura')
