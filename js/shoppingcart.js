const productCar = document.querySelector("#add_objects_js_desktop");
let countProduct = 1;

let getDataJson = async () => {
    let response = await fetch("http://localhost:3000/cart");
    let data = await response.json();
    let price
    let id

    let productsHTML = ''; // Aquí vamos a construir el HTML de todos los productos
    data.forEach(element => {
        // Construimos el HTML para cada producto y lo concatenamos a productsHTML
        productsHTML += `
            <div id="container_product_desktop">
                <img src="${element.image}" alt="">
                <div id="squeare_desciption_desktop">
                    <h2>${element.name}</h2>
                    <div id="button_pay_desktop">
                        <span class="priceDinamic">${element.price * countProduct}</span>
                        <button class="delete-btn" data-id="${element.id}">
                            <box-icon name='trash' size="25px" type='solid' color='#ffffff'></box-icon>
                        </button>
                        <button class="plus-btn">
                            <box-icon name='plus-circle' size="25px" color='#ffffff'></box-icon>
                        </button>
                        <!-- Aquí agregamos un identificador único para el párrafo -->
                        <p class="count-product">${countProduct}</p>
                        <button class="minus-btn">
                            <box-icon name='minus-circle' size="25px" color='#ffffff'></box-icon>
                        </button>
                    </div>
                </div>
            </div>
        `;
        price = element.price;
        id = element.id
    });

    // Ahora que hemos construido todo el HTML, lo asignamos a productCar.innerHTML
    productCar.innerHTML = productsHTML;

    // Seleccionamos el elemento del precio dinámico una sola vez
    const priceDinamic = document.querySelector(".priceDinamic");

    // Después de asignar el HTML, añadimos el event listener
    productCar.addEventListener("click", (event) => {
        if (event.target.classList.contains('plus-btn')) {
            countProduct += 1;
            // Una vez que incrementamos countProduct, actualizamos el valor del párrafo
            priceDinamic.innerText = price * countProduct;
            document.querySelector('.count-product').innerText = countProduct;
        }
    });
    productCar.addEventListener("click", (event) => {
        if (event.target.classList.contains('minus-btn')) {
            if(countProduct > 1){
                countProduct -= 1;
                // Una vez que incrementamos countProduct, actualizamos el valor del párrafo
                priceDinamic.innerText = price * countProduct;
                document.querySelector('.count-product').innerText = countProduct;
            }
        }
    });
    
    productCar.addEventListener("click", async (event) => {
        if (event.target.classList.contains('delete-btn')) {
            // Obtener el ID del producto a eliminar del atributo data-id del botón
            const productId = event.target.dataset.id;
            await fetch(`http://localhost:3000/cart/${productId}`, {
                method: 'DELETE'
            });
        }
    });
    
};

getDataJson();


