let kanapData = [];
let cart = localStorage;
let productList = "";


console.table(cart);

//async function fetchData() {

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
    console.log(cart)
    
    let line = JSON.parse(cart[i]);
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
             <input type="number" id ="articleNumber${i}" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${line.productQuantity}>
           </div>
           <div class="cart__item__content__settings__delete">
             <p class="deleteItem" id="deleteItem${i}">Supprimer</p>
           </div>
         </div>
       </div>
     </article>  `)
        
    
}

async function Display() // Affichage  des elements du panier
{
    await fetchData();
    let FullData = ""
    let totalPrice = 0
    let totalQuantity = 0
	let y = 0
    for (let i = 0; i < cart.length; i++) {
        if (cart.getItem(i)) {
           let  Line = cart.getItem(i)
            Line = JSON.parse(Line)
			console.log(Line);
			y = getIndex(Line.productId)
            totalPrice += (kanapData[y].price * parseInt(Line.productQuantity))
            totalQuantity += parseInt(Line.productQuantity)
            FullData += displayElem(i)
            }
        }
        document.getElementById("cart__items").innerHTML = FullData
        document.getElementById("totalQuantity").innerHTML = totalQuantity
        document.getElementById("totalPrice").innerHTML = totalPrice + ',00'
        for (let i = 0; i< cart.length; i++) {
            if (cart.getItem(i)) { // Si un changement est operer sur les bouton de changement de quantité et de supression
                document.getElementById(`articleNumber${i}`).addEventListener("change", ChangeQuantity);
                //console.log("changed")
				document.getElementById(`deleteItem${i}`).addEventListener("click", DeleteItem)
                }
        }
}

function ChangeQuantity() {// changement de quantité directement depuis la page panier
	let Line = cart.getItem(this.id.split('Number')[1])
	Line = JSON.parse(Line)
	if (this.value < 1 || this.value > 100)
			return (0)
	Line.productQuantity = (parseInt(this.value, 10))
	cart.setItem(this.id.split('Number')[1], JSON.stringify(Line))
	Display()
}

function DeleteItem() { // supprimer un article et restructurer le localStorage
	let i = parseInt(this.id.split("Item")[1])
	while ( i < cart.length - 1) {
			cart.setItem(i, cart.getItem(i + 1))
			i++
	}
	cart.removeItem((cart.length - 1))
	Display()
}


function  formValidation(){ // validation des champs du formulaire
  let form = document.querySelector(".cart__order__form");
  let charReg =new RegExp("^[a-zA-Z ,.'-]+$");
  let emailReg = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
  let addressReg = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");

  //console.log("par ici")
  form.firstName.addEventListener('change', function() {// Ecoute de la modification du prénom
    validFirstName(this);
  });
 
  form.lastName.addEventListener('change', function() { // Ecoute de la modification du nom
    validLastName(this);
  });

  
  form.city.addEventListener('change', function() { // Ecoute de la modification de la ville
    validCity(this);
  });

  form.address.addEventListener('change', function() { // Ecoute de la modification de l'address
    validAddress(this);
  });

  form.email.addEventListener('change', function(){ // Ecoute de la modification de l'email
    validEmail(this);

  }) ;

  // validation du prenom
  const validFirstName = function(inputFirstName) {
    let firstNameErrorMsg = inputFirstName.nextElementSibling;

    if (charReg.test(inputFirstName.value)) {
        firstNameErrorMsg.innerHTML = '';
    } else {
        firstNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
    }
  };

 //validation du nom
  const validLastName = function(inputLastName) {
  let lastNameErrorMsg = inputLastName.nextElementSibling;

  if (charReg.test(inputLastName.value)) {
      lastNameErrorMsg.innerHTML = '';
  } else {
      lastNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
  }
};

//validation de la ville
const validCity = function(inputCity) {
  let cityErrorMsg = inputCity.nextElementSibling;

  if (charReg.test(inputCity.value)) {
      cityErrorMsg.innerHTML = '';
  } else {
      cityErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
  }
};

  // Validation de l'adresse postal
  const validAddress = function(inputAddress) {
    let addressErrorMsg = inputAddress.nextElementSibling;

        if (addressReg.test(inputAddress.value)) {
            addressErrorMsg.innerHTML = '';
        } else {
            addressErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
  };

    //validation de l'email
  const validEmail = function(inputEmail) {
    let emailErrorMsg = inputEmail.nextElementSibling;

    if (emailReg.test(inputEmail.value)) {
        emailErrorMsg.innerHTML = '';
    } else {
        emailErrorMsg.innerHTML = 'Veuillez renseigner votre email.';
    }
  };
  
}


function  postForm(event){ //Creation du formulaire pour la requete 
 
  event.preventDefault();
    
  const data = new FormData(event.target);
  console.log("bite")

  let idProducts = [];
  for (let i = 0; i < localStorage.length; i++){
    let line = JSON.parse(localStorage[i]);
    
    //console.log("line =",line);   
    idProducts[i] = line.productId;
  
  }
  console.log(idProducts);

  let order = {
      contact : {
          firstName : data.get('firstName'),
          lastName : data.get('lastName'),
          address : data.get('address'),
          city : data.get('city'),
          email : data.get('email')
      },
      products : idProducts
        
  }
 
  console.log(order);

   
  fetch(("http://localhost:3000/api/products/order"),{
   method: "POST",
   body: JSON.stringify(order),
   headers: {"Accept":"application/json", "Content-Type": "application/json"} 

 })
  .then(response => response.json())
  .then((data) => {
  console.log(data);
  localStorage.clear();
  localStorage.setItem("orderId", data.orderId);
  document.location.href = "confirmation.html";
  })
  .catch(err => console.log(err));
 
 }

localStorage.clear;
Display();
formValidation();
document.querySelector("form").addEventListener('submit', postForm);
 


