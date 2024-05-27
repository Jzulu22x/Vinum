const URL_USERS = "http://localhost:3000/users";

// selectores

const email = document.querySelector("#email");
const password = document.querySelector("#password");
const formLogin = document.querySelector("#formLogin");

formLogin.addEventListener("submit", async (event) => {
  event.preventDefault();
  await login;
});

async function login() {
  const response = await fetch(`${URL_USERS}?EMAIL=${email.value}`);
  const data = await response.json();

  if (data.length === 0) {
    console.log();
  }
}
