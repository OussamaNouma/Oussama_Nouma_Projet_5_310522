const url = "http://localhost:3000/api/products/";
const itemsId = document.getElementById("items")
fetch (url)

.then(function(res){
    if (res.ok){
        return res.json();
    }
})
.then(function(data) {
    itemsId.innerHTML = data.map(
        (items) =>
    `
    <a href="./product.html?${items._id}">
    <article>
      <img src="${items.imageUrl}" alt="${items.altTxt}">
      <h3 class="productName">${items.name}</h3>
      <p class="productDescription">${items.description}</p>
    </article>
  </a> `     
    ).join("") ;
  
})
.catch(function(err){
   alert("Une erreur c'est produite")
})

