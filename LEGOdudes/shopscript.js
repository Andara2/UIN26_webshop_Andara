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

//Legg til handlevogn funksjon:
function addToCart(prodid) {
    console.log("Legg til produkt med id: " + prodid)
    cart.push(prodid)
    console.log(cart)
    document.getElementById("cart-quantity").innerText = cart.length
}