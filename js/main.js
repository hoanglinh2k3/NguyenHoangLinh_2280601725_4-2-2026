async function init() {
  state.products = await fetchProducts();
  state.filtered = state.products;
  renderTable();
}

searchInput.oninput = e => {
  const q = e.target.value.toLowerCase();
  state.filtered = state.products.filter(p =>
    p.title.toLowerCase().includes(q)
  );
  state.page = 1;
  renderTable();
};

pageSize.onchange = e => {
  state.pageSize = +e.target.value;
  state.page = 1;
  renderTable();
};

init();
