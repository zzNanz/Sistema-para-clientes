import { getClientes, deleteCliente } from './api.js';

const lista = document.getElementById('lista-clientes');

function formatarData(data){
   if (!data) return '-';
   return new Date(data).toLocaleDateString('pt-BR');
}

async function excluirCliente(id, botao){
   const confirmado = confirm('Tem certeza que deseja deletar este cliente?')

   if(!confirmado) return;

   try{
      const res = await deleteCliente(id)
      if(res.ok){
         const linha = botao.closest('tr');
         linha.remove();
      } else{
         alert('Erro ao excluir cliente: ' + res.statusText);  
      }
   } catch (error) {
      console.error('Erro ao excluir cliente:', error);
      alert('Erro ao excluir cliente: ' + error.message);
   }
}

async function carregarClientes(){
   try{
      const clientes = await getClientes();
      lista.innerHTML = '';

      clientes.forEach(c => {
         const tr = document.createElement('tr');

         const hoje = new Date();
         const vencimento = new Date(c.dataVencimento);
         let statusClass = ''

         if (!c.dataVencimento) {
            statusClass = 'sem-vencimento'; // se não tiver data
         } else if (vencimento < hoje) {
            statusClass = 'vencido'; // vermelho
            
         } else {
            statusClass = 'ativo'; // verde
         }

         tr.classList.add(statusClass);

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

window.excluir = function(id) {
   const botao = document.querySelector(`button[onclick="excluir('${id}')"]`);
   excluirCliente(id, botao);
}

carregarClientes();