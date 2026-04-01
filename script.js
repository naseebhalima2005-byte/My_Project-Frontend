
let buttons = document.querySelectorAll(".add-btn");

buttons.forEach(function(btn){

    btn.addEventListener("click", function(){

        btn.classList.add("clicked");   
        btn.innerText = "ADDED";

        let product = {
            name: btn.dataset.name,
            price: parseInt(btn.dataset.price.replace(/,/g,"")),
            mrp: parseInt(btn.dataset.mrp.replace(/,/g,"")),
            image: btn.dataset.image,
            qty: 1
        };

        localStorage.setItem("cartItem", JSON.stringify(product));
        alert("Added to your cart ✅");
        window.location.href="addtocart.html";
    });

});

let left = document.getElementById("cart-left");
let right = document.getElementById("cart-right");

if(left){
  loadCart();
}

function loadCart(){

    let item = JSON.parse(localStorage.getItem("cartItem"));

    if(!item){
        left.innerHTML="<h2>Your Cart is Empty</h2>";
        right.innerHTML="";
        return;
    }

    left.innerHTML=`
        <div class="cart-item">
            <img src="${item.image}" class="cart-img">
            <div>
                <h3>${item.name}</h3>

                <div class="qty-box">
                    <button onclick="decreaseQty()">-</button>
                    <span>${item.qty}</span>
                    <button onclick="increaseQty()">+</button>
                </div>

                <p>₹${item.price.toLocaleString()}</p>
                <p>MRP <strike>₹${item.mrp.toLocaleString()}</strike></p>

                <p onclick="removeItem()" style="color:red;cursor:pointer;">
                    Remove
                </p>
            </div>
        </div>
    `;

    updateSummary(item);
}
document.addEventListener("click", function(e){
    if(e.target && e.target.id === "checkoutBtn"){
        window.location.href = "checkout.html";
    }
});

function updateSummary(item){

    let totalMRP = item.mrp * item.qty;
    let discount = (item.mrp - item.price) * item.qty;
    let amount = item.price * item.qty;

    right.innerHTML=`
        <h3>Order Summary</h3>

        <div class="summary-line">
            <span>Total MRP</span>
            <span>₹${totalMRP.toLocaleString()}</span>
        </div>

        <div class="summary-line">
            <span>Discount</span>
            <span>- ₹${discount.toLocaleString()}</span>
        </div>

        <div class="summary-line">
            <span>Delivery</span>
            <span>FREE</span>
        </div>

        <hr>

        <div class="summary-line">
            <b>Amount Payable</b>
            <b>₹${amount.toLocaleString()}</b>
        </div>

        <div class="checkout-btn"id="checkoutBtn">Proceed To Checkout</div>
    `;
}

function increaseQty(){
    let item = JSON.parse(localStorage.getItem("cartItem"));
    item.qty++;
    localStorage.setItem("cartItem", JSON.stringify(item));
    loadCart();
}

function decreaseQty(){
    let item = JSON.parse(localStorage.getItem("cartItem"));
    if(item.qty>1){
        item.qty--;
        localStorage.setItem("cartItem", JSON.stringify(item));
        loadCart();
    }
}





document.addEventListener("DOMContentLoaded", function(){

let wishNum = localStorage.getItem("wishNum") || 0;
let cartNum = localStorage.getItem("cartNum") || 0;



let heartIcon = document.querySelector(".wis");
let cartIcon = document.querySelector(".ad");



heartIcon.parentElement.classList.add("icon-wrap");
cartIcon.parentElement.classList.add("icon-wrap");



let wishBadge = document.createElement("span");
wishBadge.className = "wish-badge";
wishBadge.innerText = wishNum;

let cartBadge = document.createElement("span");
cartBadge.className = "cart-badge";
cartBadge.innerText = cartNum;



heartIcon.parentElement.appendChild(wishBadge);
cartIcon.parentElement.appendChild(cartBadge);



document.querySelectorAll(".wishlist").forEach(function(btn){

btn.addEventListener("click",function(){

wishNum++;

localStorage.setItem("wishNum",wishNum);

wishBadge.innerText = wishNum;

});

});



document.querySelectorAll(".add-btn").forEach(function(btn){

btn.addEventListener("click",function(){

cartNum++;

localStorage.setItem("cartNum",cartNum);

cartBadge.innerText = cartNum;

});

});

});








function removeItem(){

    localStorage.removeItem("cartItem");

    
    localStorage.setItem("cartNum", 0);

    let cartBadge = document.querySelector(".cart-badge");
    if(cartBadge){
        cartBadge.innerText = 0;
    }

    loadCart();
}



 function toggleSort(){
const drop = document.getElementById("sortDropdown");
drop.style.display = drop.style.display === "block" ? "none" : "block";
}

document.querySelectorAll(".option").forEach(item=>{
item.addEventListener("click",function(){
document.getElementById("selected").innerText=this.innerText;

document.querySelectorAll(".option").forEach(opt=>{
opt.classList.remove("active");
});

this.classList.add("active");
document.getElementById("sortDropdown").style.display="none";
});
});

function toggleFilter(header){
const body = header.nextElementSibling;
const arrow = header.querySelector(".arrow");

if(body.style.display==="block"){
body.style.display="none";
arrow.textContent="▼";
}else{
body.style.display="block";
arrow.textContent="▲";
}
}






document.querySelectorAll(".wishlist").forEach(function(btn){

btn.addEventListener("click", function(){

let card = btn.closest(".product-card");

let name = card.querySelector("h3").innerText;
let price = card.querySelector(".price").innerText;
let image = card.querySelector(".product-img").src;

let product = {
name:name,
price:price,
image:image
};

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

wishlist.push(product);

localStorage.setItem("wishlist", JSON.stringify(wishlist));

alert("Added to Wishlist ❤️");

});

});