window.addEventListener('load', init);

function init() {
    let myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json')

    //Title&Image of each category 

    fetch('https://wiki-ads.onrender.com/categories', {method: "GET", headers: myHeaders})
    .then(response => response.json())
    .then(data => {
        let categoryIndexTemplate = Handlebars.compile(document.getElementById("index-template").innerHTML);
        document.getElementById("category-list").innerHTML = categoryIndexTemplate({categories: data});
    })
    .catch(error => {console.log(error)});

    //List of subcategories
    fetch('https://wiki-ads.onrender.com/subcategories', {method: "GET", headers: myHeaders})
    .then(response => response.json())
    .then(data => {
        let subcategoryIndexTemplate = Handlebars.compile(document.getElementById("subcategory-list-template").innerHTML);
        document.getElementById("subcategory-list").innerHTML = subcategoryIndexTemplate({subcategories: data});
    })
    .catch(error => {console.log(error)});    
}