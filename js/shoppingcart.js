document.querySelector(".btn-plus").addEventListener("click", sumaruno);
document.querySelector(".btn-rest").addEventListener("click", restaruno);
document.querySelector(".btn-trash").addEventListener("click",borrarContenido);

let contador = 0;
let precio = 0;

function sumaruno() {
    contador = contador + 1;
    precio = contador *290.99 ; 
    document.querySelector("#msgcontador").innerHTML = contador;
    document.querySelector("#price_desktop").innerHTML = precio;
}

function restaruno() {
    if (contador > 0) {
        contador = contador - 1;
        precio = contador * 290.99 ; 
        document.querySelector("#msgcontador").innerHTML = contador;
        document.querySelector("#price_desktop").innerHTML = precio;
    }
}
function borrarContenido() {
    document.querySelector("container_product_desktop").innerHTML = "";
    document.querySelector("#price_desktop").innerHTML = "";
    contador = 0;
    precio = 0;
}