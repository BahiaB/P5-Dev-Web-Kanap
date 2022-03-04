let kanapData = [];
let cart = localStorage;
console.table(cart);



async function fetchData() {

    await fetch("http://localhost:3000/api/products")
    .then(res => res.json())
    .then((res2) =>{
        kanapData = res2;
        console.table(kanapData);
    })
}



function    displayElem(i)
{
    console.log("cart-length=",cart.length)
    console.log("displayElem =",i);
    let MyVar = document.getElementById("cart__items");
    console.log(localStorage[i]);
    let line = JSON.parse(cart[i]);
    console.log("line =",line);     
    MyVar.innerHTML= ` <article class="cart__item" data-id=${line.productId} data-color=${line.productColor}>
       <div class="cart__item__img">
         <img src=${kanapData[i].imageUrl}  alt=${kanapData[i].altTxt}>
       </div>
       <div class="cart__item__content">
         <div class="cart__item__content__description">
           <h2>${kanapData[i].name}</h2>
           <p>${line.productColor}</p>
           <p>${kanapData[i].price} €</p>
         </div>
         <div class="cart__item__content__settings">
           <div class="cart__item__content__settings__quantity">
             <p>Qté : </p>
             <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${line.productQuantity}>
           </div>
           <div class="cart__item__content__settings__delete">
             <p class="deleteItem">Supprimer</p>
           </div>
         </div>
       </div>
     </article>  `
        
    
}

async function Display()
{
    await fetchData();
    
    for (let i = 0; i < localStorage.length; i++)
    {
        displayElem(i);
        console.log(i);
    }
}

Display();