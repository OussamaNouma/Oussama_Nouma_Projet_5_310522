// variables
const addToCart = document.getElementById("addToCart")

const quantityValue = document.getElementById("quantity");

const urlId  = window.location.search.split("?").join("");

const colorValue = document.getElementById("colors");

const title = document.getElementById("title");

const description = document.getElementById("description");

const image = document.getElementsByClassName("item__img")[0];

const price = document.getElementById("price");

const productLink = `http://localhost:3000/api/products/${urlId}`;
// méthode d'enregistrement d'un objet dans le local storage 

Storage.prototype.setObj = function (key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function (key) {
    return JSON.parse(this.getItem(key))
}
//récupération de l'id depuis le lien et ainsi implémenter le html

fetch(productLink)
.then((res) => res.json())

.then((productData) => {

title.innerText = productData.name;

description.innerText = productData.description;

price.innerText= productData.price;

image.innerHTML = `<img src="${productData.imageUrl}" alt="${productData.altTxt}">`

// Boucle qui va parcourir chaque valeur de Colors dans l'api et les ajouter aux options.
for (color of productData.colors){

    colorValue.innerHTML += 
    `<option value="${color}">${color}</option>`;
    }
// Fonction qui va gérer ce qu'on va envoyer au local storage

 function cartItems (urlId, quantity , color){
    let cart = [];

     if (!localStorage.getObj("cart")) {
        localStorage.setObj("cart", cart);
    } else {
        cart = localStorage.getObj("cart");
    }
    quantity = parseInt(quantity);  
    // vérifier que le produit se trouve dans le panier et agir en conséquence.
    if (quantity > 0 && color.length > 0){
        let alreadyInCart = false ;
        for (let i = 0; i < cart.length; i++) {
           if (cart[i].urlId == urlId && cart[i].color == color) {
               cart[i].quantity += quantity;
               alreadyInCart = true;
           }            
        }

        if (alreadyInCart == false) {
                cart.push({"urlId": urlId, "quantity": quantity, "color": color});
            }
            // On gère l'envoi de notre tableau "cart" dans le local storage 
            localStorage.setObj("cart",cart);
    }
    else{
        alert("Veuillez saisir des valeurs valide")
    }
   
    } 
    // Envoient de nos données au local storage
    addToCart.addEventListener("click", event => {
        cartItems(productData._id, quantityValue.value, colorValue.value);
        
    });
})
