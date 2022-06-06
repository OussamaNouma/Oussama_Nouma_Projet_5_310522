const urlId  = window.location.search.split("?").join("");

const allColors = document.getElementById("colors");

const title = document.getElementById("title");

const description = document.getElementById("description");

const image = document.getElementsByClassName("item__img")[0];

console.log(document.getElementsByClassName("item__img"))

const price = document.getElementById("price");

const productLink = `http://localhost:3000/api/products/${urlId}`;



fetch(productLink)
.then((res) => res.json())

.then((productData) => {

title.innerText = productData.name;

description.innerText = productData.description;

price.innerText= productData.price;

image.innerHTML = `<img src="${productData.imageUrl}" alt="${productData.altTxt}">`

for (color of productData.colors){

    allColors.innerHTML += 
    `<option value="${color}">${color}</option>`;
}

})
.catch(function(err){
    alert("Une erreur c'est produite")
 })


console.log(allColors)
     
