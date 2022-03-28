let str = window.location.href;
let url = new URL(str);
let id = url.searchParams.get("id");
localStorage.clear();

function displayOrderId() {
  const idOrder = document.getElementById("orderId");
  idOrder.innerText = id

}

displayOrderId();