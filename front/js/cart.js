let kanapData = [];
let cart = localStorage;
let productList = "";

console.table(cart);



async function fetchData() {

    await fetch("http://localhost:3000/api/products")
    .then(res => res.json())
    .then((res2) =>{
        kanapData = res2;
        console.table(kanapData);
    })
}

function getIndex(id){ // obtenir le bon index (y) de l'élément (dans kanapData) en comparant les _id
    
  for (let y = 0 ; y < kanapData.length; y++)
  {
      if (id == kanapData[y]._id)
      {
          console.log(y);
          return(y);
      }
  }
}

function    displayElem(i) // Applique le Inner html au (i)ème element du local storage 
{
    let y = 0;
    console.log("cart-length=",cart.length)
    console.log("displayElem =",i);
    line = JSON.parse(cart[i]);
    console.log("line =",line);   
    y = getIndex(line.productId);  
    return( ` <article class="cart__item" data-id=${line.productId} data-color=${line.productColor}>
       <div class="cart__item__img">
         <img src=${kanapData[y].imageUrl}  alt=${kanapData[y].altTxt}>
       </div>
       <div class="cart__item__content">
         <div class="cart__item__content__description">
           <h2>${kanapData[y].name}</h2>
           <p>${line.productColor}</p>
           <p>${kanapData[y].price} €</p>
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
     </article>  `)
        
    
}

async function Display() // stock les elements du panier. 
{
    await fetchData();
    
    for (let i = 0; i < cart.length; i++)
    {
      if (i == 0)
            productList = displayElem(i);
      else
            productList += displayElem(i);
      

    }
    let cartList =  document.getElementById("cart__items");
    cartList.innerHTML = productList;  // affichage de tout les elements du panier
}


//localStorage.clear(cart);
Display();