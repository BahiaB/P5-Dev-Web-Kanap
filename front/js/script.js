KanapData= [];
var ProductList="";
var y = 0;


async function FetchData() {

    await fetch("http://localhost:3000/api/products")
    .then(res => res.json())
    .then((res2) =>{
        KanapData = res2;
        console.table(KanapData);
        y = KanapData.length;
    })
}

 function CreatElem(i){
    return( `<a href="./product.html?id=${KanapData[i]._id}"><article> 
    <img src="${KanapData[i].imageUrl}" alt="${KanapData[i].altTxt}">
    <h3 class="productName">"${KanapData[i].name}"</h3>
    <p class="productDescription">"${KanapData[i].description}"</p>
    </article></a>`) ;
}



async function GetLine(){

    await FetchData()
    var i = 0;
    GetProducts(i)
}

async function GetProducts(i)
{
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

GetLine();

