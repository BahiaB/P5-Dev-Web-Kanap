let kanapData = [];

async function fetchData() {

    await fetch("http://localhost:3000/api/products")
        .then(response => response.json())
        .then((data) => {
            kanapData = data;
            console.table(kanapData);
        })
}

// Création  de l'item  
function creatElem(i) {
    return (`<a href="./product.html?id=${kanapData[i]._id}"><article> 
    <img src="${kanapData[i].imageUrl}" alt="${kanapData[i].altTxt}">
    <h3 class="productName">${kanapData[i].name}</h3>
    <p class="productDescription">"${kanapData[i].description}"</p>
    </article></a>`);
}

// Affichage de chaque item 
async function getProducts() {
    let productList = "";
    await fetchData();

    for (let i = 0; i < kanapData.length; i++) {

        if (i == 0)
            productList = creatElem(i);
        else
            productList += creatElem(i);
    }
    let item = document.getElementById("items");
    item.innerHTML = productList;
}

getProducts();
