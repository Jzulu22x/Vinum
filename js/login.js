const URL_USERS = "http://localhost:3000/users";

// selectores

const email = document.querySelector("#email");
const password = document.querySelector("#password");
const formLogin = document.querySelector("#formLogin");

formLogin.addEventListener("submit", async (event) => {
  event.preventDefault();
  await login();
  console.log("submit");
});

async function login() {
  const response = await fetch(`${URL_USERS}?newEmail=${email.value}`);
  const data = await response.json();

  if (data.length === 0) {
    console.error("EMAIL NO ENCONTRADO");
    return;
  }

  if (data[0].newPassword === password.value) {
    console.log("PASSWORD VÁLIDO");
  } else {
    alert("Contraseña invalida");
    console.log("PASSWORD INVÁLIDO");
    return;
  }

  localStorage.setItem("usuario", JSON.stringify(data));
  window.location.href = "/html/homePage.html";
}
