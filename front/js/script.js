let kanapData= [];
let ProductList="";
let y = 0;


async function FetchData() {

    await fetch("http://localhost:3000/api/products")
    .then(res => res.json())
    .then((res2) =>{
        kanapData = res2;
        console.table(kanapData);
        y = kanapData.length;
    })
    GetProducts();
}

function CreatElem(i){
    return( `<a href="./product.html?id=${kanapData[i]._id}"><article> 
    <img src="${kanapData[i].imageUrl}" alt="${kanapData[i].altTxt}">
    <h3 class="productName">"${kanapData[i].name}"</h3>
    <p class="productDescription">"${kanapData[i].description}"</p>
    </article></a>`) ;
}


async function GetProducts()
{
    let i = 0;

    while (i < y){
    
        if (i == 0)
            ProductList = CreatElem(i);
        else
            ProductList += CreatElem(i);
        i++;
    }
    let MyVar = document.getElementById("items");
    MyVar.innerHTML= ProductList
}

FetchData();

