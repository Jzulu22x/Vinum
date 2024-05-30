
//Const creation for Dom elements
const userName = document.querySelector("#name");
const lastName = document.querySelector("#userlastname");
const phone = document.querySelector("#phone");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const formRegister = document.querySelector("#form_register");
const URL = "http://localhost:3000/users";

//Creaction of event to set user register
formRegister.addEventListener("submit", async (event) => {
  event.preventDefault()
  await setJSONserver()
});

//asyn function to connect to json.server
let setJSONserver = async () => {
  let newUserName = userName.value.trim(); //delete espaces before and after value
  let newLastName = lastName.value.trim();
  let newPhone = phone.value.trim();
  let newEmail = email.value.trim();
  let newPassword = password.value.trim();

  if (
    newUserName === "" ||
    newLastName === "" ||
    newPhone === "" ||
    newPassword === ""
  ) {
    alert("Por favor, completa todos los campos.");
  } else {
    // Si todos los campos están completos, puedes enviar el formulario
    let data = await fetch(URL);
    let dataString = await data.json();
    let send = true;

    dataString.forEach((element) => {
      if (element.newEmail === newEmail) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Ya hay un usuario registrado con este Email",
        });
        send = false;
      }
      if (element.newPhone === newPhone) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Ya hay un usuario registrado con este telefono",
        });
        send = false;
      }
    });

    if (send) {
      let objectRegister = {
        newUserName,
        newLastName,
        newPhone,
        newEmail,
        newPassword,
      };



      setTimeout(async () => {
        await fetch(URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(objectRegister),
        });

        window.location.href = "./homePage.html"

      }, 2000);

      Swal.fire({
        icon: "success",
        title: "Excelente...",
        text: "Usuario Registrado Correctamente",
        showConfirmButton: false
      });
    }
  }
  formRegister.reset()

};
