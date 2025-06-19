const mongoose = require('mongoose');

const ClienteSchema = new mongoose.Schema({
  nome: String,
  cpf: String,
  telefone: String,
  email: String,
  plano: String,
  dataInicio: Date,
  dataVencimento: Date,
  status: { type: String, default: 'ativo' },
});

module.exports = mongoose.model('Cliente', ClienteSchema);