const socket = io();


const liveProducts = document.getElementById("productsOnline");

socket.on('newProductAdded', (data) => {
  document.getElementById("producstOffline").innerHTML = "";
  const {name, description, price, thumbnails, code, stock, status, category, id} = data;
  console.log(name)
  let html =   
    `<div class="product-info">
      <h3>${name}</h3>
      <p>description: ${description}</p>
      <p>price: ${price}</p>
      <p>thumbnail: ${thumbnails}</p>
      <p>code: ${code}</p>
      <p>stock: ${stock}</p>
      <p>status: ${status}</p>
      <p>category: ${category}</p>
      <p>id: ${id}</p>
    </div>`;
  liveProducts.innerHTML = html
});

socket.on('error', (error) => {
  console.error(error);
});