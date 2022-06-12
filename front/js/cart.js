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

