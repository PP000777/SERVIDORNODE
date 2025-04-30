const fs = require('fs');

const listarAulas = () => {
    try {
      const dados = fs.readFileSync('bancoDeDados.json', 'utf-8');
      return JSON.parse(dados);
    } catch {
      return [];
    }
  };
  
  const atualizarAulas = (aulas) => {
    try {
      fs.writeFileSync('bancoDeDados.json', JSON.stringify(aulas, null, 2));
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };
  