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
                        <span>${totalProductPrice}</span> <!-- Display the total price of the product -->
                        <button class="delete-btn" data-id="${element.id}">
                            <box-icon name='trash' size="25px" type='solid' color='#ffffff'></box-icon>
                        </button>
                        <button class="plus-btn">
                            <box-icon name='plus-circle' size="25px" color='#ffffff'></box-icon>
                        </button>
                        <p>${count}</p>
                        <button class="minus-btn">
                            <box-icon name='minus-circle' size="25px" color='#ffffff'></box-icon>
                        </button>
                    </div>
                </div>
            </div>`;
    });
    // Display the total cart price in the UI
    console.log(totalPrice); // Check if totalPrice updates correctly

    // Event listeners for the buttons
    divShoppingCart.querySelectorAll('.plus-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const countElement = button.parentNode.querySelector('p');
            let count = parseInt(countElement.textContent);
            count++;
            countElement.textContent = count;
            updateTotalPrice(); // Update total price after changing quantity
        });
    });

    divShoppingCart.querySelectorAll('.minus-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const countElement = button.parentNode.querySelector('p');
            let count = parseInt(countElement.textContent);
            if (count > 1) {
                count--;
                countElement.textContent = count;
                updateTotalPrice(); // Update total price after changing quantity
            }
        });
    });

    divShoppingCart.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', async (event) => {
            event.preventDefault();
            const productId = button.getAttribute('data-id');
            await fetch(`http://localhost:3000/cart/${productId}`, {
                method: "DELETE"
            });
            updateCart(event);
        });
    });
};

// Function to calculate and update the total price of the cart
const updateTotalPrice = () => {
    let totalPrice = 0; // Initialize totalPrice within the function
    divShoppingCart.querySelectorAll('#container_product_desktop').forEach(container => {
        const priceElement = container.querySelector('span');
        const countElement = container.querySelector('p');
        const productPrice = parseFloat(priceElement.textContent);
        const count = parseInt(countElement.textContent);
        const totalProductPrice = productPrice * count; // Calculate the total price of the product
        totalPrice += totalProductPrice; // Add to the total cart price
        priceElement.textContent = totalProductPrice; // Update the total price of the product in the UI
    });
    // Display the total cart price in the console
    console.log(totalPrice);
};

// Function to update the entire cart
const updateCart = () => {
    divShoppingCart.innerHTML = '';
    getCartElements();
};

// Initial call to fetch and display cart elements
getCartElements();
