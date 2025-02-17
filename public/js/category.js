window.addEventListener('load', init);

function init() {
    let signedIn = false;
    let myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json')
    const urlID = new URLSearchParams(window.location.search).get('id')

    // Set page title to category title
    fetch('https://wiki-ads.onrender.com/categories', {method: "GET", headers: myHeaders})
    .then(response => response.json())
    .then(obj => {
        // Get current category from array using ID
        document.title = document.getElementById("categoryTitle").innerHTML = obj[urlID-1].title
    })
    .catch(error => {console.log(error)})

    // Get ads for category
    fetch('https://wiki-ads.onrender.com/ads?category='+ urlID, {method: "GET", headers: myHeaders})
    .then(response => response.json())
    .then(data =>{
        let adsTemplateScript = Handlebars.compile(document.getElementById("category-ads-template").textContent);
        document.getElementById("shop").innerHTML = adsTemplateScript({ads: data});
    })
    .catch(error => {console.log(error)})

    // Add to favorites
    document.getElementById('shop').addEventListener("click", (event) => {
        if (event.target.tagName === 'BUTTON') {
            if (signedIn) {
                event.target.style.color = "silver";
                event.target.title = ""
                let ad = document.getElementById("ad"+event.target.id.split("_")[1]) // Get div ID from button ID
                fetch('http://localhost:8080/favorites', {
                    method: "POST",
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        id: ad.dataset.ad_id,
                        title: ad.dataset.ad_title,
                        description: ad.dataset.ad_description,
                        cost: ad.dataset.ad_cost,
                        img: ad.dataset.ad_img
                    })
                })
                .catch(error => {console.log(error)})
            } else {
                alert("Παρακαλώ συνδεθείτε για προσθήκη στη λίστα αγαπημένων")
            }
        }
    });

    fetch('http://localhost:8080/login', {method: "GET", headers: myHeaders})
    .then(response => response.json())
    .then(obj => {
        document.getElementById("view-favorites").href = "favorite-ads.html?username="+obj.username+"&sessionId="+obj.sessionId
        // Show link to favorites and welcome message, hide login form when user is logged in
        if (obj!=null) {
            signedIn = true;
            document.getElementById("sign-in").style.display = "none"
            document.getElementById("welcome-user").style.display = document.getElementById("view-favorites").style.display = "block"
            document.getElementById("welcome-user").innerHTML += obj.username
        }
    })
    .catch(error => {console.log(error)})

    // Get subcategories for filters
    fetch('https://wiki-ads.onrender.com/categories/'+ urlID +'/subcategories', {method: "GET", headers: myHeaders})
    .then(response => response.json())
    .then(obj => {
        let subcategoryFiltersTemplate = Handlebars.compile(document.getElementById("subcategory-filters-template").innerHTML)
        document.getElementById("filters").innerHTML += subcategoryFiltersTemplate({subcategories: obj})
    })

    // Filter by subcategory
    document.getElementById("filters").onchange = function() {
        let filter
        for (let button of document.getElementsByName("filter")) {
            if (button.checked) {
                filter = button.value
                break;
            }
        }
        for (let ad of document.getElementsByClassName("ad")) {
            if (ad.dataset.subcategory_id == filter || filter==0) {
                ad.style.display = "block"
            } else {
                ad.style.display = "none"
            }
        }
    }
}