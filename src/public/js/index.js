const socket = io();


const liveProducts = document.getElementById("productsOnline");


socket.on('newProductAdded', (data) => {
  document.getElementById("producstOffline").innerHTML = "";
  
  console.log(data);
  let html = data.map( (data) => {
    let respon =  
    `<div class="product-info">
      <h3>${data.name}</h3>
      <p>description: ${data.description}</p>
      <p>price: ${data.price}</p>
      <p>thumbnail: ${data.thumbnails}</p>
      <p>code: ${data.code}</p>
      <p>stock: ${data.stock}</p>
      <p>status: ${data.status}</p>
      <p>category: ${data.category}</p>
      <p>id: ${data.id}</p>
    </div>`;
    return respon;

  })
  liveProducts.innerHTML = html
});

socket.on('error', (error) => {
  console.error(error);
});