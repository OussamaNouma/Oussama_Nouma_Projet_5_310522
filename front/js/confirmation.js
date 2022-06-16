let url = new URL(window.location);
// On affiche l'id de la commande récupérer depuis l'URL
document.getElementById("orderId").innerHTML = url.searchParams.get("orderId");
