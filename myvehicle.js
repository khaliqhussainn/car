
// const categories = [...new Set(product.map((item) =>
//       {return item}))]
//       let i=0;
// document.getElementById('root').innerHTML = categories.map((item)=>
// {
//     var {image, title, price} = item;
//     return(
//         `<div class='box'>
//             <div class='img-box'>
//                 <img class='images' src=${image}></img>
//             </div>
//          <div class='bottom'>
//          <p>${title}</p>
//          <h2>$ ${price}.00</h2>`+
//          "<button onclick='addtocart("+ (i++) +")'>Add to Cart</button>"+
//          `</div>
//          </div>`
//     )
// }).join('')


// var cart =[];
// function addtocart(a){
//     cart.push({...categories[a]});
//     displaycart();
// }
// function displaycart(a){
//     let j = 0;
//     if(cart.length==0){
//         document.getElementById('cartItem').innerHTML = "Your cart is empty";
//     }
//     else{
//         document.getElementById("cartItem"),innerHTML = cart.map((items)=>
//         {
//             var {image, title, price} = items;
//             return(
//                 `<div class='cart-item'>
//                 <div class='row-img'>
//                     <img class='rowimg' src=${image}>
//                 </div>
//                 <p style='font-size:12px;'>${title}</p>
//                 <h2 style='font-size:15px;'>$ ${price}. 00</h2>`+
//                 "<i class='fa-solid fa-trash' onclick ='delElement("+ (j++) +")'></i></div>"
//             );
//         }).join('');
//     }
// }


let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'Rolls Royce Cullinan',
        image: './img/3.jpg',
        price: 120000
    },
    {
        id: 2,
        name: 'Porsche',
        image: './img/porsche.gif',
        price: 120000
    },
    {
        id: 3,
        name: 'Rolls Royce',
        image: './img/rr.webp',
        price: 220000
    },
    {
        id: 4,
        name: 'Ferrari',
        image: './img/Black LaFerrari-NERO-Animated-Turntable-GIF.webp',
        price: 123000
    },
    {
        id: 5,
        name: 'CRV',
        image: './img/crv.webp',
        price: 320000
    },
    {
        id: 6,
        name: 'BMW',
        image: './img/bmw.gif',
        price: 120000
    }
];
let listCards  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img class="image" src="${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Buy</button>`;
        list.appendChild(newDiv);
    })
}
initApp();
function addToCard(key){
    if(listCards[key] == null){
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}
function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}