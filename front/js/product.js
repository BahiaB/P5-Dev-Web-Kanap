let kanapData = [];
let str = window.location.href;
let url = new URL(str);
let id = url.searchParams.get("id");
console.log(id);
let cart = [];



async function FetchData() {

    await fetch("http://localhost:3000/api/products")
    .then(res => res.json())
    .then((res2) =>{
        kanapData = res2;
        console.table(kanapData);
    })
}

function getIndex(){ // obtenir l'index (i) de l'élément en comparant les _id
    
    for (let i = 0 ; i < kanapData.length; i++)
    {
        if (id == kanapData[i]._id)
        {
            console.log(i);
            return(i);
        }
    }
}

function displayImg(i) // affichage de l'image correspondant à l'index (i)
{
   
    document.getElementsByClassName("item__img")[0].innerHTML= ` <img src=${kanapData[i].imageUrl} alt=${kanapData[i].altTxt}> `;
    
}

function displayTitle(i){// affichage du non de l'élément correspondant à l'index (i)

    document.getElementById("title").innerHTML = ` ${kanapData[i].name}`;
    
}


function displayPrice(i){// affichage du prix correspondant à l'index (i)
    document.getElementById("price").innerHTML = ` ${kanapData[i].price}`;

}

function displayDescription(i){// affichage de la description correspondant à l'index(i)
    document.getElementById("description").innerHTML = ` ${kanapData[i].description}`;
    
}

function displayColor(i){// Recuperation des couleurs dans le dom et les afficher
    let colorStr =[];
    for (let colorIndex = 0; colorIndex < kanapData[i].colors.length; colorIndex++)
    {
        colorStr += `<option value="${kanapData[i].colors[colorIndex]}">${kanapData[i].colors[colorIndex]}`
    } 
    fullColorStr=   `<option value="">--SVP, choisissez une couleur --</option>
                    ` + colorStr;
    document.getElementById("colors").innerHTML = fullColorStr;


}

async function displayAll(){ /* call for each display function */
    await FetchData();
    let i = getIndex();
    displayImg(i);
    displayTitle(i);
    displayPrice(i);
    displayDescription(i);
    displayColor(i);
}


function checkNewElem(newProduct){
    
    if (!localStorage[0])
        return(0);
    
    for (let i = 0; i < localStorage.length; i++)
    {
        let line = localStorage.getItem(i);
        line = JSON.parse(line)
        console.log(line);
       if (newProduct.productId == line.productId && newProduct.productColor == line.productColor)
        {
            console.log("meme id meme quantité")
            console.log(newProduct.productId)
            console.log(line.productId)
            console.log(newProduct.productQuantity)
            console.log(line.productQuantity)
            line.productQuantity = (parseInt(newProduct.productQuantity, 10 )+ parseInt(line.productQuantity, 10)).toString();
            console.log(line.productQuantity)
            line = JSON.stringify(line)
            localStorage.setItem(i, line)
           return(1);
        }
       
    }
    return(0);

}

function addToCart()
{
    let colorChoice = document.querySelector("#colors").value;
    let quantityChoice = document.querySelector("#quantity").value;
    let newProduct= 
    {
        productId: id,
        productColor: colorChoice,
        productQuantity: Number(quantityChoice)
    }
    let elemCart = JSON.stringify(newProduct);
    if (checkNewElem(newProduct) == 0)
    {
        console.log("ici");
        localStorage[localStorage.length]= elemCart;
        
    }
    console.log(localStorage);

}

displayAll();
//localStorage.clear("cart");
let btn_AddToCart = document.getElementById("addToCart");
btn_AddToCart.addEventListener("click", addToCart);

