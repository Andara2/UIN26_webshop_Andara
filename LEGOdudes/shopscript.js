document.getElementById("cart-button").addEventListener("click", function() {
    document.getElementById("cart").classList.toggle("hidden");
})

//Funkjson for produktopplisting:
function fetchProductInfo() {
    let productsHTML = ""
    products.map(p=> productsHTML += ` <article class="product-card">
                <img src="website_images/PROD_${p.imagefile}" alt="${p.title}" />
                <a href="#">${p.category}</a>
                <h3>${p.title}</h3>
                <p>Kr. ${p.price},-</p>
                <button OnClick="addToCart(${p.prodid})">Legg til handlevogn</button>
            </article>`)

    document.getElementById("product-list").innerHTML = productsHTML
}

fetchProductInfo()

//Generer handlevogn visning:
function showCart() {
    //Unike produkter
    let uniqueItems = new Set(cart)
    let uniqueArray = [...uniqueItems]
    //Oversikt over antall per produkt
    let CartItems = []
    uniqueArray.map(item => {
        cart.filter(i => i === item).length
        CartItems.push({prodid: item, quantity: cart.filter (i => i === item).length})
    })
    
    //Gå gjennom cartItems for å lage HTML til handlekurv og regne ut totalpris
    let cartHTML = ""
    let totalPrice = 0
    
    CartItems.map(ci => {
        //Hente produktinformasjon
        let product = products.find(i => i.prodid === ci.prodid)
        //Skrive ut HTML
        cartHTML += `<tr>
                    <td class="title">${product.title}</td>
                    <td class="price">${product.price}</td>
                    <td class="quantity">${ci.quantity}</td>
                    <td class="delete"><butten onClick="deleteFromCart(${product.prodid})">X</button></td>
                </tr>`
        //Summere totalpris
        totalPrice += Number(product.price) * ci.quantity
    })

    if(cart.length === 0) {
        cartHTML += "<tr><td>Ingen varer</td></tr>"
    }

    //Oppdater HTML-elementer
    document.getElementById("cart-items").innerHTML = cartHTML
    document.getElementById("total-price").innerHTML = totalPrice
    document.getElementById("cart-quantity").innerText = cart.length
}

//Slette fra handlekurv
function deleteFromCart(prodid) {
    let deleteIndex = cart.indexOf(prodid)
    if(deleteIndex >-1) {
        cart.splice(deleteIndex, 1)
    }
    //Oppdatere handlevogn-utskrift
    showCart()
}

//Legg til handlevogn funksjon:
function addToCart(prodid) {
    console.log("Legg til produkt med id: " + prodid)
    cart.push(prodid)
    console.log(cart)
    document.getElementById("cart-quantity").innerText = cart.length

    //oppdatere handlevongvisning
    showCart()
}