function exportCSV() {
  let csv = 'id,title,price,category\n';

  state.filtered.forEach(p => {
    csv += `${p.id},"${p.title}",${p.price},"${p.category?.name}"\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'products.csv';
  a.click();
}
