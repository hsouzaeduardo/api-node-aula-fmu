const express = require('express');
const app = express();
const PORT = 3000;
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const cors = require('cors');

app.use(cors());

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

app.get('/:id/estados', (req, res) => {
    const id = req.params.id;
    const ordem = req.headers.ordem || 'desc';
    const estados = getEstadosPorRegiao(id, ordem);
    res.json(estados);
  });

  app.get('/:id/csv', async (req, res) => {
    const id = req.params.id;
    const estados = getEstadosPorRegiao(id); 
    const csvWriter = createCsvWriter({
      path: 'out.csv',
      header: [
        {id: 'nome', title: 'Nome'},
        {id: 'codigo', title: 'Codigo'}
      ]
    });
  
    await csvWriter.writeRecords(estados); // retorna uma promise
    res.download('out.csv');
  });

  function getEstadosPorRegiao(id, ordem = 'asc') {
    const regioes = {
      '1': [{ nome: 'Acre', codigo: 'AC' }, { nome: 'Amapá', codigo: 'AP' }, { nome: 'Amazonas', codigo: 'AM' }, { nome: 'Pará', codigo: 'PA' }, { nome: 'Rondônia', codigo: 'RO' }, { nome: 'Roraima', codigo: 'RR' }, { nome: 'Tocantins', codigo: 'TO' }],
      '2': [{ nome: 'Alagoas', codigo: 'AL' }, { nome: 'Bahia', codigo: 'BA' }, { nome: 'Ceará', codigo: 'CE' }, { nome: 'Maranhão', codigo: 'MA' }, { nome: 'Paraíba', codigo: 'PB' }, { nome: 'Pernambuco', codigo: 'PE' }, { nome: 'Piauí', codigo: 'PI' }, { nome: 'Rio Grande do Norte', codigo: 'RN' }, { nome: 'Sergipe', codigo: 'SE' }],
      '3': [{ nome: 'Goiás', codigo: 'GO' }, { nome: 'Mato Grosso', codigo: 'MT' }, { nome: 'Mato Grosso do Sul', codigo: 'MS' }, { nome: 'Distrito Federal', codigo: 'DF' }],
      '4': [{ nome: 'Espírito Santo', codigo: 'ES' }, { nome: 'Minas Gerais', codigo: 'MG' }, { nome: 'Rio de Janeiro', codigo: 'RJ' }, { nome: 'São Paulo', codigo: 'SP' }],
      '5': [{ nome: 'Paraná', codigo: 'PR' }, { nome: 'Rio Grande do Sul', codigo: 'RS' }, { nome: 'Santa Catarina', codigo: 'SC' }]
    };
  
    let estados = regioes[id] || [];
    if (ordem === 'desc') {
      estados = estados.sort((a, b) => b.nome.localeCompare(a.nome));
    } else {
      estados = estados.sort((a, b) => a.nome.localeCompare(b.nome));
    }
    return estados;
  }
  