window.addEventListener('load', init);

function init() {
    let myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json')
    const urlID = new URLSearchParams(window.location.search).get('id')

    // Get title and ads for subcategory
    fetch('https://wiki-ads.onrender.com/subcategories', {method: "GET", headers: myHeaders})
    .then(response => response.json())
    .then(obj => {
          document.title = document.getElementById("subcategoryTitle").innerHTML = obj[urlID-1].title
    })
    .catch(error => {console.log(error)})

    fetch('https://wiki-ads.onrender.com/ads?subcategory='+ urlID, {method: "GET", headers: myHeaders})
    .then(response => response.json())
    .then(data =>{
      /* Make features into map.
      Split features by ';', split key from value by ':'.*/
          for (let ad of data) {
            let featureMap = new Map();
            let featureList = ad.features.split(";")
            featureList.forEach(element => {
                  if (element.includes(":")) {
                      featureMap.set(element.split(":")[0], element.split(":")[1])
                } else {
                      featureMap.set(element, "Ναι")
                }
            });
            ad.features = featureMap;
        }      
        let adsTemplateScript = Handlebars.compile(document.getElementById("subcategory-ads-template").textContent);
        document.getElementById("subShop").innerHTML = adsTemplateScript({ads: data});
    })
    .catch(error => {console.log(error)})
}