window.onload = init;

function init() {
    const username = new URLSearchParams(window.location.search).get('username')
    const sessionId = new URLSearchParams(window.location.search).get('sessionId')
    document.getElementById("userFavorites").innerHTML = "Αγαπημένα του χρήστη " + username

    fetch('http://localhost:8080/favorites', {method: "GET", headers: {'Accept': 'application/json'}})
    .then(response => response.json())
    .then(obj => {
        let favoritesTemplateScript = Handlebars.compile(document.getElementById("favorite-ads-template").innerHTML)
        document.getElementById("favorites").innerHTML = favoritesTemplateScript({ads: obj.filter(function(ad){return ad.sessionId == sessionId})})
    })
    .catch(error => console.log(error))
}