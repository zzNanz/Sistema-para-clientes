const express = require('express');
const router = express.Router();
const Cliente = require('../models/Cliente');
const { calcularStatus } = require('../utils/statusHelper');


// Rota para criar um novo cliente
router.post('/', async (req, res) => {
  try {
    const { nome, cpf, telefone, email, plano, dataInicio, dataVencimento } = req.body;

    const status = calcularStatus(dataVencimento);

    const novoCliente = new Cliente({
      nome,
      cpf,
      telefone,
      email,
      plano,
      dataInicio,
      dataVencimento,
      status
    });

    console.log('Status calculado:', status);

    const savedCliente = await novoCliente.save();
    console.log('SALVO:', savedCliente);
    res.status(201).json(savedCliente);
  } catch (err) {
    console.error('❌Erro ao salvar cliente:', err);
    res.status(500).json({ error: 'Erro ao salvar cliente' });   
  }
});


// Rota para buscar todos os clientes
router.get('/', async (req, res) => {
    try {
        const clientes = await Cliente.find();
        const atualizados = await Promise.all(
            clientes.map(async (cliente) => {
                const statusAtual = calcularStatus(cliente.dataVencimento);
                if (cliente.status !== statusAtual) {
                    cliente.status = statusAtual;
                    await cliente.save();
                }
                return cliente;
            })
        )
        res.json(atualizados);
    } catch (err) {
        console.error('❌Erro ao buscar clientes:', err);
        res.status(500).json({ error: 'Erro ao buscar clientes' });
    }
});

// Rota para buscar um cliente por ID
router.get('/:id', async (req, res) => {
    try {
        const client = await Cliente.findById(req.params.id);
        if(!client) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }
        res.json(client);
    } catch (err) {
        console.error('❌Erro ao buscar cliente:', err);
        res.status(500).json({ error: 'Erro ao buscar cliente' });
    }
})

//Rota para atualizar um cliente por ID
router.put('/:id', async (req, res) => {
  try {
      const cliente = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!cliente) {
          return res.status(404).json({ error: 'Cliente não encontrado' });
      }
      res.json(cliente);
  } catch (err) {
      console.error('❌Erro ao atualizar cliente:', err);
      res.status(500).json({ error: 'Erro ao atualizar cliente' });
  }
});

// Rota para deletar um cliente por ID
router.delete('/:id', async (req, res) => {
  try {
      await Cliente.findByIdAndDelete(req.params.id);
      res.sendStatus(204);
  } catch (err) {
      console.error('❌Erro ao deletar cliente:', err);
      res.status(500).json({ error: 'Erro ao deletar cliente' });
  }
});

module.exports = router;