const form = document.getElementById("forgotForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const obj = {};

  data.forEach((value, key) => (obj[key] = value));

  const url = "/auth/forgotPassword";

  const headers = {
    "Content-Type": "application/json",
  };

  const method = "POST";
  const body = JSON.stringify(obj);

  fetch(url, { headers, method, body })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((err) => console.error(err));
});
