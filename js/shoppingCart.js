const divShoppingCart = document.querySelector("main")

let getCartElements = async () => {
    let getElements = await fetch ("http://localhost:3000/cart")
    let getElementsCode = await getElements.json()
    getElementsCode.forEach(element => {
        divShoppingCart.innerHTML += `
        <div id="container_product_desktop">
        <img src="${element.image}" alt="">
        <div id="squeare_desciption_desktop">
            <h2>${element.name}</h2>
            <div id="button_pay_desktop">
                <h5>${element.price}</h5>
                <button>
                    <box-icon name='trash' size="25px" type='solid' color='#ffffff' ></box-icon>
                    <box-icon name='plus-circle' size="25px" color='#ffffff' ></box-icon>
                    <p>1</p>
                    <box-icon name='minus-circle' size="25px" color='#ffffff' ></box-icon>
                </button>
            </div>
        </div> 
      </div>`
    })
}

getCartElements()