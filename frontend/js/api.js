const apiURL = 'http://localhost:3000/api/clientes'; 

export async function getClientes() {
  const res = await fetch(apiURL);
  if (!res.ok) {
    throw new Error(`Erro ao buscar clientes: ${res.status}`);
  }
  return await res.json();
}

export async function deleteCliente(id) {
   return await fetch(`${apiURL}/${id}`, {
     method: 'DELETE'
   });
}

