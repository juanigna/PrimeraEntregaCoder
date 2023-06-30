const form = document.getElementById("loginForm");
const productsLink = document.getElementById("productsLink");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const obj = {};

  formData.forEach((value, key) => {
    obj[key] = value;
  });

  const url = "/api/auth";
  const method = "POST";
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const body = JSON.stringify(obj);

  fetch(url, { method, headers, body })
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // Handle the response data as needed

      // Redirect to the homepage
      window.location.href = "/api/products";

      
    })
    .catch((error) => console.log(error));
});
