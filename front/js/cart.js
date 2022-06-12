//variable
let totalQuantity = document.getElementById("totalQuantity");
let totalExpense = document.getElementById("totalPrice");
let cartItems = document.getElementById("cart__items");
let itemQuantity = document.getElementsByClassName("itemQuantity");
let deleteItem = document.getElementsByClassName("deleteItem");
let totalPrice = 0;
let totalItem = 0;
// méthode d'enregistrement d'un objet dans le local storage 

Storage.prototype.setObj = function (key, obj) {
    return this.setItem(key, JSON.stringify(obj))
  }
  Storage.prototype.getObj = function (key) {
    return JSON.parse(this.getItem(key))
  }

  fetch ("http://localhost:3000/api/products/")
  .then((res)=> res.json())
  .then((productData)=> {
      // boucle qui va parcourire les données dans le local storage
     for (let i = 0; i < localStorage.getObj("cart").length; i++) {
         //boucle qui va parcourir les donnée de l'api
         for (let x = 0; x < productData.length; x++){
             if(productData[x]._id == localStorage.getObj("cart")[i].urlId ) {
                 var product = productData[x] ;
              }
          }
      //Cela va renvoyer la quantité totale et le prix total
         totalItem += parseInt(localStorage.getObj("cart")[i].quantity);
         totalPrice += parseInt(localStorage.getObj("cart")[i].quantity) * product.price;
          // On injecte dans le Html les donnée requise.
         totalExpense.innerText = totalPrice;
         totalQuantity.innerText = totalItem;

         cartItems.innerHTML +=
         ` 
         <article class="cart__item" data-id="${localStorage.getObj("cart")[i].urlId}" data-color="${localStorage.getObj("cart")[i].color}">
         <div class="cart__item__img">
           <img src="${product.imageUrl}" alt="${product.altTxt}">
         </div>
         <div class="cart__item__content">
           <div class="cart__item__content__description">
             <h2>${product.name}</h2>
             <p>${localStorage.getObj("cart")[i].color}</p>
             <p>${product.price}</p>
           </div>
           <div class="cart__item__content__settings">
             <div class="cart__item__content__settings__quantity">
               <p>Qté : ${localStorage.getObj("cart")[i].quantity} </p>
               <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${localStorage.getObj("cart")[i].quantity}">
             </div>
             <div class="cart__item__content__settings__delete">
               <p class="deleteItem">Supprimer</p>
             </div>
           </div>
         </div>
       </article> 
         `;
      
     }


           // Fonction qui va mêtre à jour le prix
           function updatePrice(urlId, color, quantity) {
            if (quantity > 0) {
              let productUpdate = localStorage.getObj("cart");
              for (let y = 0; y < productUpdate.length; y++) {
                if (productUpdate[y].urlId == urlId && productUpdate[y].color == color) {
                  productUpdate[y].quantity = quantity
                  localStorage.setObj("cart", productUpdate);
                  window.location.reload();
                }
              }
            }
          }
          // mise à jour du prix
          for (let z = 0; z < itemQuantity.length; z++) {
            itemQuantity[z].addEventListener("click", (e) => {
              updatePrice(e.target.parentNode.parentNode.parentNode.parentNode.dataset.id, e.target.parentNode.parentNode.parentNode.parentNode.dataset.color, e.target.value);
              
          });
         
          }
           //fonction pour supprimer un article
           function removeItem(urlId, color) {
            let deleteItemFromCart = localStorage.getObj("cart");
            for (let z = 0; z < deleteItemFromCart.length; z++) {
              if (deleteItemFromCart[z].urlId == urlId && deleteItemFromCart[z].color == color) {
                deleteItemFromCart.splice(z, 1);
                localStorage.setObj("cart", deleteItemFromCart);
                window.location.reload();
              }
            }
          }
            // suppression d'un article
            for (let k = 0; k < deleteItem.length; k++) {
            deleteItem[k].addEventListener("click", (e) => {
              removeItem(e.target.parentNode.parentNode.parentNode.parentNode.dataset.id, e.target.parentNode.parentNode.parentNode.parentNode.dataset.color);
            });
          }
      
  })
