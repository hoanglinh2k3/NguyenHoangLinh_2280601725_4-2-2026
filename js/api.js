const API_URL = 'https://api.escuelajs.co/api/v1/products';

async function fetchProducts() {
  const res = await fetch(API_URL);
  return res.json();
}

async function updateProductAPI(id, data) {
  return fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
}

async function createProductAPI(data) {
  return fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
}
