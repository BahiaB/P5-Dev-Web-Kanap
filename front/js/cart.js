let kanapData = [];
let cart = localStorage;
console.log(cart);
//let productList = "";


//console.table(cart);

async function fetchData() {

	await fetch("http://localhost:3000/api/products")
		.then(res => res.json())
		.then((res2) => {
			kanapData = res2;
			console.table(kanapData);
		})
}

// obtenir le bon index (y) de l'élément (dans kanapData) en comparant les _id

function getIndex(id) {

	for (let y = 0; y < kanapData.length; y++) {
		if (id == kanapData[y]._id) {
			console.log(y);
			return (y);
		}
	}
}

// Applique le Inner html au (i)ème element du local storage 
function displayElem(i) {
	let line = JSON.parse(cart[i]);
	let y = getIndex(line.productId);

	return (` <article class="cart__item" data-id=${line.productId} data-color=${line.productColor}>
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

// Affichage  des elements du panier
async function display() {
	await fetchData();

	if (localStorage.length == 0) {
		window.alert("Votre panier est vide pour le moment")
	}
	let FullData = ""
	let totalPrice = 0
	let totalQuantity = 0
	let y = 0
	for (let i = 0; i < cart.length; i++) {
		if (cart.getItem(i)) {
			let line = cart.getItem(i)
			line = JSON.parse(line)
			y = getIndex(line.productId)
			totalPrice += (kanapData[y].price * parseInt(line.productQuantity))
			totalQuantity += parseInt(line.productQuantity)
			FullData += displayElem(i)
		}
	}
	document.getElementById("cart__items").innerHTML = FullData
	document.getElementById("totalQuantity").innerHTML = totalQuantity
	document.getElementById("totalPrice").innerHTML = totalPrice + ',00'
	for (let i = 0; i < cart.length; i++) {
		if (cart.getItem(i)) { // Si un changement est operer sur les bouton de changement de quantité et de supression
			document.getElementById(`articleNumber${i}`).addEventListener("change", changeQty);
			document.getElementById(`deleteItem${i}`).addEventListener("click", deleteItem)
		}
	}
}

// changement de quantité directement depuis la page panier
function changeQty() {
	let Line = cart.getItem(this.id.split('Number')[1])
	Line = JSON.parse(Line)
	if (this.value < 1 || this.value > 100)
		return (0)
	Line.productQuantity = (parseInt(this.value, 10))
	cart.setItem(this.id.split('Number')[1], JSON.stringify(Line))
	display()
}

// supprimer un article et restructurer le localStorage
function deleteItem() {
	let i = parseInt(this.id.split("Item")[1])
	while (i < cart.length - 1) {
		cart.setItem(i, cart.getItem(i + 1))
		i++
	}
	cart.removeItem((cart.length - 1))
	display()
}

// validation des champs du formulaire
function formValidation() {
	let form = document.querySelector(".cart__order__form");
	let charReg = new RegExp("^[a-zA-Z ,.'-]+$");
	let emailReg = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
	let addressReg = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");

	form.firstName.addEventListener('change', function () {// Ecoute de la modification du prénom
		validFirstName(this);
	});

	form.lastName.addEventListener('change', function () { // Ecoute de la modification du nom
		validLastName(this);
	});


	form.city.addEventListener('change', function () { // Ecoute de la modification de la ville
		validCity(this);
	});

	form.address.addEventListener('change', function () { // Ecoute de la modification de l'address
		validAddress(this);
	});

	form.email.addEventListener('change', function () { // Ecoute de la modification de l'email
		validEmail(this);

	});

	// validation du prenom
	let validFirstName = function (inputFirstName) {
		let firstNameErrorMsg = inputFirstName.nextElementSibling;

		if (charReg.test(inputFirstName.value))
			firstNameErrorMsg.innerHTML = '';
		else
			firstNameErrorMsg.innerHTML = "Merci  de renseigner votre prénom, Veuillez n'utiliser que des characteres alphabetique";

	};

	//validation du nom
	let validLastName = function (inputLastName) {
		let lastNameErrorMsg = inputLastName.nextElementSibling;

		if (charReg.test(inputLastName.value))
			lastNameErrorMsg.innerHTML = '';
		else
			lastNameErrorMsg.innerHTML = "Merci de renseigner nom de famille. Veuillez n'utiliser que des characteres alphabetique";
	};

	//validation de la ville
	let validCity = function (inputCity) {
		let cityErrorMsg = inputCity.nextElementSibling;

		if (charReg.test(inputCity.value))
			cityErrorMsg.innerHTML = '';
		else
			cityErrorMsg.innerHTML = 'Veuillez renseigner votre ville.';
	};

	// Validation de l'adresse postal
	let validAddress = function (inputAddress) {
		let addressErrorMsg = inputAddress.nextElementSibling;

		if (addressReg.test(inputAddress.value))
			addressErrorMsg.innerHTML = '';
		else
			addressErrorMsg.innerHTML = 'Veuillez renseigner votre adresse.';
	};

	//validation de l'email
	let validEmail = function (inputEmail) {
		let emailErrorMsg = inputEmail.nextElementSibling;

		if (emailReg.test(inputEmail.value))
			emailErrorMsg.innerHTML = '';
		else
			emailErrorMsg.innerHTML = 'Veuillez renseigner votre email.';
	};

}

//Creation du formulaire pour la requete 
function postForm(event) {

	if (localStorage.length > 0) {
		event.preventDefault();
		const data = new FormData(event.target);

		let idProducts = [];
		for (let i = 0; i < localStorage.length; i++) {
			let line = JSON.parse(localStorage[i]);
			idProducts[i] = line.productId;
		}
		console.log(idProducts);

		let order = {
			contact: {
				firstName: data.get('firstName'),
				lastName: data.get('lastName'),
				address: data.get('address'),
				city: data.get('city'),
				email: data.get('email')
			},
			products: idProducts
		}

		fetch(("http://localhost:3000/api/products/order"), {
			method: "POST",
			body: JSON.stringify(order),
			headers: { "Accept": "application/json", "Content-Type": "application/json" }

		})
			.then(response => response.json())
			.then((data) => {
				console.log(data);
				localStorage.clear();
				document.location.href = `confirmation.html?id=${data.orderId}`;
			})
			.catch(err => console.log(err));
	}
	else
		window.alert("Votre panier est vide.")

}

localStorage.clear;
display();
formValidation();
document.querySelector("form").addEventListener('submit', postForm);



