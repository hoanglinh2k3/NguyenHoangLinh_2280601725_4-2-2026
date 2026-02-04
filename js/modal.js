function openDetailModal(id) {
  const p = state.products.find(x => x.id === id);

  modalContainer.innerHTML = `
<div class="modal fade" id="detailModal">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5>Product Detail</h5>
        <button class="btn-close" data-bs-dismiss="modal"></button>
      </div>

      <div class="modal-body row">
        <div class="col-md-5">
          <img src="${p.images[0]}" class="img-fluid rounded">
        </div>

        <div class="col-md-7">
          <input type="hidden" id="editId" value="${p.id}">

          <label>Title</label>
          <input id="editTitle" class="form-control mb-2" value="${p.title}">

          <label>Price</label>
          <input id="editPrice" type="number" class="form-control mb-2" value="${p.price}">

          <label>Description</label>
          <textarea id="editDesc" class="form-control mb-2">${p.description}</textarea>

          <label>Image URL</label>
          <input id="editImage" class="form-control" value="${p.images[0]}">
        </div>
      </div>

      <div class="modal-footer">
        <button class="btn btn-primary" onclick="updateProduct()">Save</button>
      </div>
    </div>
  </div>
</div>`;

  new bootstrap.Modal(document.getElementById('detailModal')).show();
}

async function updateProduct() {
  await updateProductAPI(editId.value, {
    title: editTitle.value,
    price: +editPrice.value,
    description: editDesc.value,
    images: [editImage.value]
  });

  location.reload();
}

function openCreateModal() {
  modalContainer.innerHTML = `
<div class="modal fade" id="createModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5>Create Product</h5>
        <button class="btn-close" data-bs-dismiss="modal"></button>
      </div>

      <div class="modal-body">
        <input id="cTitle" class="form-control mb-2" placeholder="Title">
        <input id="cPrice" type="number" class="form-control mb-2" placeholder="Price">
        <textarea id="cDesc" class="form-control mb-2" placeholder="Description"></textarea>
        <input id="cImage" class="form-control" placeholder="Image URL">
      </div>

      <div class="modal-footer">
        <button class="btn btn-success" onclick="createProduct()">Create</button>
      </div>
    </div>
  </div>
</div>`;

  new bootstrap.Modal(document.getElementById('createModal')).show();
}

async function createProduct() {
  await createProductAPI({
    title: cTitle.value,
    price: +cPrice.value,
    description: cDesc.value,
    categoryId: 1,
    images: [cImage.value]
  });

  location.reload();
}
