function calcularStatus(dataVencimento){
   if(!dataVencimento) return 'vencido';

   const hoje = new Date();
   const vencimento = new Date(dataVencimento);

   return vencimento >= hoje ? 'ativo' : 'vencido';
}

module.exports = { calcularStatus }