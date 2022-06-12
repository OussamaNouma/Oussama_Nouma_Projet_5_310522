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

  })
