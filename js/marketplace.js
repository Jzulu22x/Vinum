// Selecting elements from the DOM
const divCreationProduct = document.querySelector("#swiper-wrapper"); // Container for displaying products
const fatherDiv = document.querySelector("#swiper-wrapper"); // Container for event delegation
const urlWine = "http://localhost:3000/wines"; // URL for fetching wine products

// Function to fetch wine products from the server
let getWineProduct = async () => {
    try {
        // Fetching wine products from the server
        let products = await fetch(urlWine);
        let codeProducts = await products.json(); // Parsing the JSON response

        // Rendering wine products on the page
        codeProducts.forEach(element => {
            divCreationProduct.innerHTML += `
                <div class="swiper-slide">
                    <div class="icons">
                        <i class="fa-solid fa-circle-arrow-left"></i>
                        <img src="/assets/img/copablanca.png" alt="#">
                        <i class="fa-regular fa-heart"></i>
                    </div>
                    <div class="products-content">
                        <div class="product-txt">
                            <span>${element.price}</span>
                            <h3>${element.name}</h3>
                            <p>${element.description}</p>
                        </div>
                        <div class="product-img">
                            <img src="${element.image}" alt="">
                        </div>
                    </div>
                    <button class="button_add_cart" data-id="${element.id}">Add to Cart</button>
                </div>`;
        });
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

// Calling the function to fetch wine products when the page loads
getWineProduct();

// Event listener for adding products to the cart
fatherDiv.addEventListener("click", async (event) => {
    event.preventDefault()
    if (event.target.classList.contains("button_add_cart")) {
        const productId = event.target.getAttribute("data-id"); // Getting the product ID from the button
        let dataWine = await fetch(urlWine); // Fetching wine products again (can be optimized)
        let dataWineCode = await dataWine.json(); // Parsing the JSON response

        // Finding the selected product by ID
        dataWineCode.forEach(element => {
            if (productId === element.id) {
                let objectAddCar = element; // Creating an object with the selected product
                sendObject(objectAddCar); // Sending the selected product to be added to the cart
            }
        });
    }
});

// Function to send the selected product to be added to the cart
let sendObject = async (objectAddCar) => {
    try {
        // Sending a POST request to add the product to the cart
        const response = await fetch("http://localhost:3000/cart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(objectAddCar),
        });
        if (response.ok) {
            console.log("Product added to cart successfully"); // Logging success message 
            alert("Producto Agregado al carrito")             
        } else {
            console.error("Error adding product to cart:", response.status); // Logging error message if request fails
        }
    } catch (error) {
        console.error("Error adding product to cart:", error); // Logging error message if an error occurs
    }
};