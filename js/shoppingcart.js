const productCar = document.querySelector("#add_objects_js_desktop");
let countProduct = 1;

// Function to fetch data from the server and render products
let getDataJson = async () => {
    let response = await fetch("http://localhost:3000/cart");
    let data = await response.json();
    let price;
    let id;

    let productsHTML = ''; // Here we will build the HTML for all products
    data.forEach(element => {
        // Build the HTML for each product and concatenate it to productsHTML
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
                        <!-- Here we add a unique identifier for the paragraph -->
                        <p class="count-product">${countProduct}</p>
                        <button class="minus-btn">
                            <box-icon name='minus-circle' size="25px" color='#ffffff'></box-icon>
                        </button>
                    </div>
                </div>
            </div>
        `;
        price = element.price;
        id = element.id;
    });

    // Now that we have built all the HTML, we assign it to productCar.innerHTML
    productCar.innerHTML = productsHTML;

    // Select the dynamic price element only once
    const priceDinamic = document.querySelector(".priceDinamic");

    // After assigning the HTML, we add the event listener
    productCar.addEventListener("click", (event) => {
        if (event.target.classList.contains('plus-btn')) {
            countProduct += 1;
            // Once we increment countProduct, we update the value of the paragraph
            priceDinamic.innerText = price * countProduct;
            document.querySelector('.count-product').innerText = countProduct;
        }
    });
    productCar.addEventListener("click", (event) => {
        if (event.target.classList.contains('minus-btn')) {
            if(countProduct > 1){
                countProduct -= 1;
                // Once we decrement countProduct, we update the value of the paragraph
                priceDinamic.innerText = price * countProduct;
                document.querySelector('.count-product').innerText = countProduct;
            }
        }
    });
    
    productCar.addEventListener("click", async (event) => {
        if (event.target.classList.contains('delete-btn')) {
            // Get the ID of the product to delete from the data-id attribute of the button
            const productId = event.target.dataset.id;
            await fetch(`http://localhost:3000/cart/${productId}`, {
                method: 'DELETE'
            });
        }
    });
    
};

getDataJson();
