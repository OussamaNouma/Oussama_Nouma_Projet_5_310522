//variables
const url = "http://localhost:3000/api/products/";

const itemsId = document.getElementById("items");

// On récupère le lien de l'api et on injecte les données dans le HTML pour chaque produit.
fetch(url)
  .then((res) => res.json())
  .then((data) => {
    for (let i = 0; i < data.length; i++) {
      itemsId.innerHTML += `
    <a href="./product.html?${data[i]._id}">
    <article>
      <img src="${data[i].imageUrl}" alt="${data[i].altTxt}">
      <h3 class="productName">${data[i].name}</h3>
      <p class="productDescription">${data[i].description}</p>
    </article>
  </a> `;
    }
  })
  .catch(function (err) {
    alert("Une erreur c'est produite");
  });
