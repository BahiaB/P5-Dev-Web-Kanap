console.log(localStorage)
let str = window.location.href;
let url = new URL(str);
let id = url.searchParams.get("id");
console.log(id);
localStorage.clear();

function displayOrderId(){
    const idOrder = document.getElementById("orderId");
    idOrder.innerText = id//localStorage.getItem("orderId");
  //  console.log(localStorage.getItem("orderId"))
    
}

displayOrderId();