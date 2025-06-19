require('dotenv').config();
const express = require('express');
const routes = require('./routes/rotas');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/clientes', routes);

app.use((req, res, next) => {
      res.status(404).json({ error: 'Rota não encontrada' });
})
//Logs
console.log('🚨 server.js começou a rodar');
console.log('🛠 Iniciando servidor...');

//Conectando ao MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => {
   console.log('✅ Conectado ao MongoDB');
   app.listen(process.env.PORT || 3000, () => {
      console.log(`🚀 Servidor rodando na porta ${process.env.PORT || 3000}`)
   });
}).catch(err => {
   console.error('❌ Erro ao conectar no MongoDB:', err.message);
});