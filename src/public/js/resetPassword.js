const form = document.getElementById("resetForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = new FormData(form);
  
  const obj = {};
  data.forEach((value, key) => {
    obj[key] = value
    obj["id"] = window.location.pathname.split("/").pop()
    obj["token"] = window.location.pathname.split("/")[3]
});

  const url = "/auth/resetPassword";

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  const method = "POST";
  const body = JSON.stringify(obj);

  fetch(url, { headers, method, body })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((err) => console.error(err));
});
