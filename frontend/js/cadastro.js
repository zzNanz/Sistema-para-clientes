const form = document.getElementById('form-cadastrar');
const telefoneInput = document.getElementById('telefone');
const apiURL = 'http://localhost:3000/api/clientes';
const cpfInput = document.getElementById('cpf');

cpfInput.addEventListener('input', () => {
  let value = cpfInput.value.replace(/\D/g, ''); // Remove tudo que não for número

  if (value.length > 11) value = value.slice(0, 11); // Limita a 11 dígitos

  value = value.replace(/(\d{3})(\d)/, '$1.$2');
  value = value.replace(/(\d{3})(\d)/, '$1.$2');
  value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

  cpfInput.value = value;
});

telefoneInput.addEventListener('input', (e) => {
   let value = telefoneInput.value.replace(/\D/g, ''); // Remove tudo que não é número

   if (value.length > 11) value = value.slice(0, 11); // Limita a 11 dígitos

   // Formata para (99) 99999-9999
   if (value.length <= 10) {
      value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
   } else {
      value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
   }

  telefoneInput.value = value;
})

form.addEventListener('submit', async (e) => {
   e.preventDefault();
   const cliente = {
      nome: form.nome.value,
      cpf: form.cpf.value,
      telefone: form.telefone.value,
      email: form.email.value,
      plano: form.plano.value,
      dataInicio: form.dataInicio.value,
      dataVencimento: form.dataVencimento.value
   };

   try{
      const res = await fetch(apiURL, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(cliente)
      });

      if (res.ok) {
         alert('Cliente cadastrado com sucesso!');
         window.location.href = 'clientes.html'; // Redireciona para a lista de clientes
      } else {
         console.error('Erro ao cadastrar cliente:', res.statusText);
         alert('Erro ao cadastrar cliente: ' + res.statusText);
      }
   } catch(err){
      console.error('Erro: ', err);
      alert('Erro ao cadastrar cliente: ' + err.message);
   }
})