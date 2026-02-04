function renderTable() {
  // clone data để tránh mutate state.filtered
  let data = [...state.filtered];

  // SORT LOGIC CHUẨN
  if (state.sortKey) {
    data.sort((a, b) => {
      let valA = a[state.sortKey];
      let valB = b[state.sortKey];

      // sort theo STRING
      if (typeof valA === 'string') {
        return state.sortAsc
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      }

      // sort theo NUMBER
      if (typeof valA === 'number') {
        return state.sortAsc
          ? valA - valB
          : valB - valA;
      }

      return 0;
    });
  }

  // PAGINATION SAU SORT
  const start = (state.page - 1) * state.pageSize;
  const view = data.slice(start, start + state.pageSize);

  tableBody.innerHTML = view.map(p => `
    <tr title="${p.description}" onclick="openDetailModal(${p.id})">
      <td>${p.id}</td>
      <td>${p.title}</td>
      <td>$${p.price}</td>
      <td>${p.category?.name}</td>
      <td>
        <img src="${p.images[0]}" class="product-img">
      </td>
    </tr>
  `).join('');

  renderPagination(data.length);
}

function renderPagination(total) {
  const pages = Math.ceil(total / state.pageSize);
  pagination.innerHTML = '';

  for (let i = 1; i <= pages; i++) {
    pagination.innerHTML += `
      <li class="page-item ${i === state.page ? 'active' : ''}">
        <button class="page-link" onclick="changePage(${i})">${i}</button>
      </li>
    `;
  }
}

function changePage(p) {
  state.page = p;
  renderTable();
}

/**
 * SORT HANDLER
 * @param {'title'|'price'} key
 */
function sortBy(key) {
  if (state.sortKey === key) {
    // click lại cùng cột -> đảo chiều
    state.sortAsc = !state.sortAsc;
  } else {
    // click cột mới
    state.sortKey = key;
    state.sortAsc = true;
  }

  // reset icon
  document.getElementById('sort-title').innerText = '⇅';
  document.getElementById('sort-price').innerText = '⇅';

  // set icon theo trạng thái
  document.getElementById(`sort-${key}`).innerText =
    state.sortAsc ? '↑' : '↓';

  // reset về page 1 sau khi sort
  state.page = 1;

  renderTable();
}
