import { getClientes } from './api.js';

const lista = document.getElementById('lista-clientes');

function formatarData(data){
   if (!data) return '-';
   return new Date(data).toLocaleDateString('pt-BR');
}

async function carregarClientes(){
   try{
      const clientes = await getClientes();
      lista.innerHTML = '';

      clientes.forEach(c => {
         const tr = document.createElement('tr');

         tr.innerHTML = `
            <td>${c.nome}</td>
            <td>${c.cpf}</td>
            <td>${c.telefone}</td>
            <td>${c.email}</td>
            <td>${c.plano}</td>
            <td>${formatarData(c.dataInicio)}</td>
            <td>${formatarData(c.dataVencimento)}</td>
            <td>${c.status}</td>
            <td>
               <button class="botao deletar" onclick="excluir('${c._id}')">🗑️</button>
            </td>
         `;

      lista.appendChild(tr);
  });

   } catch (error) {
      console.error('Erro ao carregar clientes:', error);
      lista.innerHTML = '<li>Erro ao carregar clientes</li>';
   }
}

carregarClientes();