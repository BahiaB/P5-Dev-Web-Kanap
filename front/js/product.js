let kanapData = [];
let str = window.location.href;
let url = new URL(str);
let id = url.searchParams.get("id");
console.log(id);


async function FetchData() {

    await fetch("http://localhost:3000/api/products")
    .then(res => res.json())
    .then((res2) =>{
        kanapData = res2;
        console.table(kanapData);
    })
}

function getIndex(){
    
    for (let i = 0 ; i < kanapData.length; i++)
    {
        if (id == kanapData[i]._id)
        {
            console.log(i);
            return(i);
        }
    }
}

function displayImg(i)
{
    console.log(kanapData[i].imageUrl);
    document.getElementsByClassName("item__img")[0].innerHTML= ` <img src=${kanapData[i].imageUrl} alt=${kanapData[i].altTxt}> `;
    
}function displayTitle(i){
    document.getElementById("title").innerHTML = ` ${kanapData[i].name}`;
}


function displayPrice(i){
    document.getElementById("price").innerHTML = ` ${kanapData[i].price}`;
}

function displayDescription(i){
    document.getElementById("description").innerHTML = ` ${kanapData[i].description}`;
}

function displayColor(i){
    let colorStr =[];
    for (let colorIndex = 0; colorIndex < kanapData[i].colors.length; colorIndex++)
    {
        colorStr += `<option value="${kanapData[i].colors[colorIndex]}">${kanapData[i].colors[colorIndex]}`
    } 
    fullColorStr=   `<option value="">--SVP, choisissez une couleur --</option>
                        <option value="vert">vert</option>
                        <option value="blanc">blanc</option> ` + colorStr;
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

displayAll();