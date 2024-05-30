const URL_USERS = "http://localhost:3000/users";

// selectors

const email = document.querySelector("#email");
const password = document.querySelector("#password");
const formLogin = document.querySelector("#formLogin");

// Listener event submit form
formLogin.addEventListener("submit", async (event) => {
  event.preventDefault();
  await login();
  console.log("submit");
});

// Login Function
async function login() {
  // API request
  const response = await fetch(`${URL_USERS}?newEmail=${email.value}`);
  // Transform the response to JSON
  const data = await response.json();

  // Email verification
  if (data.length === 0) {
    console.error("EMAIL NO ENCONTRADO");
    return;
  }
  // Pasword verification
  if (data[0].newPassword === password.value) {
    console.log("PASSWORD VÁLIDO");
  } else {
    alert("Contraseña invalida");
    console.log("PASSWORD INVÁLIDO");
    return;
  }

  // Store user data in local Storage
  localStorage.setItem("usuario", JSON.stringify(data));
  // Redirect to Homepage
  window.location.href = "/html/homePage.html";
}
