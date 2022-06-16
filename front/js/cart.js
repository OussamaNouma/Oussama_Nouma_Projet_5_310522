//variables
let totalQuantity = document.getElementById("totalQuantity");

let totalExpense = document.getElementById("totalPrice");

let cartItems = document.getElementById("cart__items");

let itemQuantity = document.getElementsByClassName("itemQuantity");

let deleteItem = document.getElementsByClassName("deleteItem");

let totalPrice = 0;

let totalItem = 0;

const button = document.getElementById("order");

const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");

const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");

const addressErrorMsg = document.getElementById("addressErrorMsg");

const cityErrorMsg = document.getElementById("cityErrorMsg");

const emailErrorMsg = document.getElementById("emailErrorMsg");
// méthode d'enregistrement d'un objet dans le local storage

Storage.prototype.setObj = function (key, obj) {
  return this.setItem(key, JSON.stringify(obj));
};
Storage.prototype.getObj = function (key) {
  return JSON.parse(this.getItem(key));
};

fetch("http://localhost:3000/api/products/")
  .then((res) => res.json())
  .then((productData) => {
    // boucle qui va parcourire les données dans le local storage
    for (let i = 0; i < localStorage.getObj("cart").length; i++) {
      //boucle qui va parcourir les données de l'api
      for (let x = 0; x < productData.length; x++) {
        if (productData[x]._id == localStorage.getObj("cart")[i].urlId) {
          var product = productData[x];
        }
      }
      //Cela va renvoyer la quantité totale et le prix total
      totalItem += parseInt(localStorage.getObj("cart")[i].quantity);
      totalPrice +=
        parseInt(localStorage.getObj("cart")[i].quantity) * product.price;
      // On injecte dans le Html les donnée requise.
      totalExpense.innerText = totalPrice;
      totalQuantity.innerText = totalItem;

      cartItems.innerHTML += ` 
         <article class="cart__item" data-id="${
           localStorage.getObj("cart")[i].urlId
         }" data-color="${localStorage.getObj("cart")[i].color}">
         <div class="cart__item__img">
           <img src="${product.imageUrl}" alt="${product.altTxt}">
         </div>
         <div class="cart__item__content">
           <div class="cart__item__content__description">
             <h2>${product.name}</h2>
             <p>${localStorage.getObj("cart")[i].color}</p>
             <p>${product.price} €</p>
           </div>
           <div class="cart__item__content__settings">
             <div class="cart__item__content__settings__quantity">
               <p>Qté : ${localStorage.getObj("cart")[i].quantity} </p>
               <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${
                 localStorage.getObj("cart")[i].quantity
               }">
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
          if (
            productUpdate[y].urlId == urlId &&
            productUpdate[y].color == color
          ) {
            productUpdate[y].quantity = quantity;
            localStorage.setObj("cart", productUpdate);
            window.location.reload();
          }
        }
      }
    }
    // mise à jour du prix
    for (let z = 0; z < itemQuantity.length; z++) {
      itemQuantity[z].addEventListener("click", (e) => {
        updatePrice(
          e.target.parentNode.parentNode.parentNode.parentNode.dataset.id,
          e.target.parentNode.parentNode.parentNode.parentNode.dataset.color,
          e.target.value
        );
      });
    }
    //fonction pour supprimer un article
    function removeItem(urlId, color) {
      let deleteItemFromCart = localStorage.getObj("cart");
      for (let k = 0; k < deleteItemFromCart.length; k++) {
        if (
          deleteItemFromCart[k].urlId == urlId &&
          deleteItemFromCart[k].color == color
        ) {
          deleteItemFromCart.splice(k, 1);
          localStorage.setObj("cart", deleteItemFromCart);
          window.location.reload();
        }
      }
    }
    // suppression d'un article
    for (let j = 0; j < deleteItem.length; j++) {
      deleteItem[j].addEventListener("click", (e) => {
        removeItem(
          e.target.parentNode.parentNode.parentNode.parentNode.dataset.id,
          e.target.parentNode.parentNode.parentNode.parentNode.dataset.color
        );
      });
    }
    // Fonction qui check si le panier est vide
    function emptyBasket() {
      if (
        localStorage.getObj("cart") === null ||
        localStorage.getObj("cart") === 0 ||
        localStorage.getObj("cart").length === 0
      ) {
        alert("Votre panier est vide!");
        return true;
      } else {
        return false;
      }
    }

    // fonction qui check les charactères pour le prénom
    function checkFirstName(firstName) {
      let regex = /^[a-z][a-z '-.,]{1,31}$|^$/i;
      if (regex.test(firstName) == false || firstName == "") {
        return false;
      } else {
        firstNameErrorMsg.innerText = "";
        return true;
      }
    }

    // fonction qui check les charactères pour le nom
    function checkLastName(lastName) {
      let regex = /^[a-z][a-z '-.,]{1,31}$|^$/i;
      if (regex.test(lastName) == false || lastName == "") {
        return false;
      } else {
        lastNameErrorMsg.innerText = "";
        return true;
      }
    }
    // fonction qui check si l'adresse est valide
    function checkAddress(address) {
      if (address.length < 5 || address == "" || address.length > 45) {
        return false;
      } else {
        addressErrorMsg.innerText = "";
        return true;
      }
    }
    // fonction qui check si la ville est valide
    function checkCity(city) {
      let regex = /^[a-z][a-z '-.,]{1,31}$|^$/i;
      if (
        regex.test(city) == false ||
        city == "" ||
        city.length < 25 ||
        city.length > 2
      ) {
        return false;
      } else {
        cityErrorMsg.innerText = "";
        return true;
      }
    }
    // fonction qui check si l'email est valide
    function checkEmail(email) {
      let regex =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (regex.test(email) == false || email == "" || email.length > 50) {
        return false;
      } else {
        emailErrorMsg.innerText = "";
        return true;
      }
    }
    // fonction qui gère les erreurs des valeurs du formulaire
    function errorHandler(firstName, lastName, address, city, email) {
      if (!checkFirstName(firstName)) {
        firstNameErrorMsg.innerText =
          "Veuillez saisir un prénom valide sans chiffre et caractère spéciaux.";
      }
      if (!checkLastName(lastName)) {
        lastNameErrorMsg.innerText =
          "Veuillez saisir un nom valide sans chiffre et caractère spéciaux.";
      }
      if (!checkAddress(address)) {
        addressErrorMsg.innerText = "Veuillez saisir une adresse valide.";
      }
      if (!checkCity(city)) {
        cityErrorMsg.innerText =
          "Veuillez saisir une ville valide sans chiffre.";
      }
      if (!checkEmail(email)) {
        emailErrorMsg.innerText = "Veuillez saisir une adresse e-mail valide.";
      }
    }
    // Dans le cas où le panier est vide
    if (emptyBasket() == false) {
      // On écoute sur le clic et on fait appel à la fonction errorHandler
      button.addEventListener("click", (e) => {
        e.preventDefault();

        let firstName = document.getElementById("firstName").value;
        let lastName = document.getElementById("lastName").value;
        let address = document.getElementById("address").value;
        let city = document.getElementById("city").value;
        let email = document.getElementById("email").value;

        errorHandler(firstName, lastName, address, city, email);
        //si tout est "true" soumettre le résultat
        if (
          checkFirstName(firstName) == true &&
          checkLastName(lastName) == true &&
          checkAddress(address) == true &&
          checkCity(city) == true &&
          checkEmail(email) == true
        ) {
          //Données que l'on envoie
          let contact = {
            firstName: firstName,
            lastName: lastName,
            address: address,
            city: city,
            email: email,
          };
          let productOrder = [];
          for (let l = 0; l < localStorage.getObj("cart").length; l++) {
            productOrder.push(localStorage.getObj("cart")[l].urlId);
          }
          //Envoie des données dans l'api /order
          fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ contact: contact, products: productOrder }),
          })
            .then((res) => res.json())
            .then((order) => {
              // On vide le local storage
              localStorage.clear();
              // On redirige à la page de confirmation
              window.location =
                "../html/confirmation.html?orderId=" + order.orderId;
            })
            .catch((error) => {
              alert("Il y a eu un problème avec l'opération fetsch: ");
            });
        }
      });
    }
  });
