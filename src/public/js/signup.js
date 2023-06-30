const form = document.getElementById("signupForm");
const loginLink = document.getElementById("loginLink");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const obj = {};

  formData.forEach((value, key) => {
    obj[key] = value;
  });

  const url = "/api/users";
  const method = "POST";
  const headers = {
    "Content-type": "application/json",
  };
  const body = JSON.stringify(obj);

  fetch(url, { method, headers, body })
    .then((response) => {
      response.json();
    })
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
});
