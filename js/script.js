

function addToCart (elem) {
    const itemImg = elem.children[0].getAttribute("src"); 
    const itemName = elem.children[1].innerText; 
    const itemPrice = elem.children[2].innerText.split(" ")[0]; 
    
    const item = {
        itemName,
        itemPrice,
        itemImg
    };

    let cartItems = localStorage.getItem("cartItems");

    if (cartItems)
    {
        cartItems = JSON.parse(cartItems);
        cartItems.push(item);
    }
    else
    {
        cartItems = [item]
    }
    
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    populateUI();
}

function removeItem(itemIndex){
    let cartItems = localStorage.getItem("cartItems")

    if ( cartItems )
    {
        cartItems = JSON.parse(cartItems);
        cartItems = cartItems.filter( (element, index) => index != itemIndex)

        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        populateUI();
    }
}

function populateUI(){
    let cartItems = localStorage.getItem("cartItems")
    let mainCartItems = `<div class="row cart-label"><p>ITEM</p><p>PRICE</p></div>`;
    let totalPrice = 0.00;
    const mainCart = document.querySelector(".cart-items");
    const itemCount = document.querySelector(".item-count");
    const subTotal = document.querySelector("#subtotal");
    const estTotal = document.querySelector("#est-total");

    if ( cartItems )
    {
        cartItems = JSON.parse(cartItems);

        cartItems.forEach( (element, index) => {
            mainCartItems += `
                <div class="row item">
                    <div class="item-detail">
                        <img src="${element.itemImg}">
                        <div>
                            <h3 class="item-name">${element.itemName}</h3>
                            <button class="btn-remove-item" onclick="removeItem(${index})">Remove</button>
                        </div>
                    </div>
                    <p class="item-price">${element.itemPrice}</p>
                </div>
            `;

            totalPrice += parseFloat(element.itemPrice.replace("$",""));
        });

        mainCart.innerHTML = mainCartItems;
        itemCount.innerText = `(${cartItems.length})`;
        subTotal.innerText = totalPrice.toFixed(2);
        estTotal.innerText = totalPrice.toFixed(2);
    }
}


populateUI()