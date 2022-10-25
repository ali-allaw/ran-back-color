const menuItems = [
    {
        name: 'French Fries with Ketchup',
        price: 2.23,
        image: 'plate__french-fries.png',
        alt: 'French Fries',
        count: 1
    },
    {
        name: 'Salmon and Vegetables',
        price: 5.12,
        image: 'plate__salmon-vegetables.png',
        alt: 'Salmon and Vegetables',
        count: 1
    },
    {
        name: 'Spaghetti Meat Sauce',
        price: 7.82,
        image: 'plate__spaghetti-meat-sauce.png',
        alt: 'Spaghetti with Meat Sauce',
        count: 1
    },
    {
        name: 'Bacon, Eggs, and Toast',
        price: 5.99,
        image: 'plate__bacon-eggs.png',
        alt: 'Bacon, Eggs, and Toast',
        count: 1
    },
    {
        name: 'Chicken Salad with Parmesan',
        price: 6.98,
        image: 'plate__chicken-salad.png',
        alt: 'Chicken Salad with Parmesan',
        count: 1
    },
    {
        name: 'Fish Sticks and Fries',
        price: 6.34,
        image: 'plate__fish-sticks-fries.png',
        alt: 'Fish Sticks and Fries',
        count: 1
    }
]

// variables 
let myProduct = document.querySelectorAll(".menu li .add");
let myCart = document.querySelector("ul.cart-summary")
let plusBtn = document.querySelectorAll("ul button.increase img")
let subtotal = document.querySelector(".amount.subtotal")
console.log(subtotal)
let tax = document.querySelector(".tax");
console.log(tax)
let total = document.querySelector(".line-item .price.total");
console.log(total)
let specProduct;

myProduct.forEach(product => {
    
    // console.log(specProduct)    
    product.onclick = () => {
        specProduct = product.previousElementSibling.previousElementSibling.innerHTML

        console.log(specProduct)
        if (product.classList.contains("add")) {
            addToCart(product);
            getAnyImage(specProduct)
            createItem();
            upgradePrice()
        }
        else {
            removeFromCart(product)
        }
    }
});


// function add to cart
function addToCart(e) {
    e.classList.remove("add")
    e.classList.add("in-cart");
    e.innerHTML = "In Cart";
    e.setAttribute("disabled", "")
}

// function remove from cart
function removeFromCart(e) {
    e.innerHTML = "Add to Cart"
    e.classList.remove("in-cart")
    e.classList.add("add")
}

let specItem;
let specImg;
let specAlt;
let specPrice;
let specName;
let specCount;
// get any item from the object
function getAnyImage(e) {
    for (let i = 0; i < menuItems.length; i++) {
        if (menuItems[i].name === e) {
            specItem = menuItems[i]
            console.log(specItem)
        }
    }
}

let li;
let div_1;
let plateImg;
let plateQuantity;
let div_2;
let contentP1;
let contentP2;
let div_3;
let btn1;
let btn1Img;
let quantity__wrapperDiv;
let btn2;
let btn2Img;
let div_4;

// function creeate item in cart
function createItem() {

    // create the li
    li = document.createElement("li");

    // create first div
    div_1 = document.createElement("div");
    div_1.classList.add("plate");
    plateImg = document.createElement("img");
    plateImg.src = `images/${specItem.image}`;
    plateImg.alt = `${specItem.alt}`;
    plateImg.className = "plate";
    plateQuantity = document.createElement("div");
    plateQuantity.classList.add("quantity");
    plateQuantity.innerHTML = specItem.count;

    // create second div
    div_2 = document.createElement("div");
    div_2.classList.add("content");
    contentP1 = document.createElement("p");
    contentP1.innerHTML = `${specItem.alt}`;
    contentP1.classList.add("menu-item");
    contentP2 = document.createElement("p");
    contentP2.innerHTML = `$${specItem.price}`;
    contentP2.classList.add("price");

    // create third div
    div_3 = document.createElement("div");
    div_3.classList.add("quantity__wrapper");
    btn1 = document.createElement("button");
    btn1.classList.add("decrease");
    btn1Img = document.createElement("img");
    btn1Img.src = "images/chevron.svg";
    quantity__wrapperDiv = document.createElement("div");
    quantity__wrapperDiv.classList.add("quantity");
    quantity__wrapperDiv.innerHTML = `${specItem.count}`;
    btn2 = document.createElement("button");
    btn2.classList.add("increase");
    btn2Img = document.createElement("img");
    btn2Img.src = "images/chevron.svg";

    // create fourth div
    div_4 = document.createElement("div");
    div_4.classList.add("subtotal");
    div_4.innerHTML = `$${specItem.price}`;

    // append childs to the divs
    div_1.appendChild(plateImg);
    div_1.appendChild(plateQuantity);
    div_2.appendChild(contentP1);
    div_2.appendChild(contentP2);
    btn1.appendChild(btn1Img);
    btn2.appendChild(btn2Img);
    div_3.appendChild(btn1);
    div_3.appendChild(quantity__wrapperDiv);
    div_3.appendChild(btn2);

    // append divs to the li
    li.appendChild(div_1);
    li.appendChild(div_2);
    li.appendChild(div_3);
    li.appendChild(div_4);

    // appen the li to the ul
    myCart.appendChild(li)
    btn1Plus(btn1)
    btn2Plus(btn2)
}

let div_4_num;
let div_4_tax;
let subtotal_num;
let tax_num;
let total_num;

// function to upgrade the total price
function upgradePrice() {
    let numRegex = /[0-9]/gi;
    let matcher = div_4.innerHTML.match(numRegex);
    let matcher2 = subtotal.innerHTML.match(numRegex)
    let matcher3 = tax.innerHTML.match(numRegex)
    let matcher4 = total.innerHTML.match(numRegex)
    if (matcher) {
        div_4_num = Number(`${matcher[0]}`);
    }
    if (matcher2) {
        subtotal_num = Number(`${matcher2[0]}`)
    }
    if (matcher3) {
        tax_num = Number(`${matcher3[0]}`)
    }
    if (matcher2) {
        total_num = Number(`${matcher4[0]}`);
    }
}


let sum2 = 0;
let plateQuantityNum;
function btn2Plus(e) {
    e.onclick = function () {
        plateQuantity.innerHTML++
        quantity__wrapperDiv.innerHTML++
        div_4_num = parseInt(plateQuantity.innerHTML) * specItem.price
        div_4.innerHTML = `$${div_4_num.toFixed(2)}`
        subtotal_num = div_4_num
        subtotal.innerHTML = `$${subtotal_num}`
        tax_num+= 0.12
        tax.innerHTML = `$${tax_num}`
        total_num = subtotal_num + tax_num
        total.innerHTML = `$${total_num.toFixed(2)}`
    }
}
function btn1Plus(e) {
    e.onclick = function () {
        if (plateQuantity.innerHTML != 0 && quantity__wrapperDiv.innerHTML != 0) {
            plateQuantity.innerHTML--
            quantity__wrapperDiv.innerHTML--
            div_4_num -= specItem.price 
            div_4.innerHTML = `$${div_4_num.toFixed(2)}`
            subtotal_num -= specItem.price
            subtotal.innerHTML = `$${subtotal_num.toFixed(2)}`
            tax_num -= 0.12
            tax.innerHTML = `$${tax_num}`
            total_num = subtotal_num + tax_num
            total.innerHTML = `$${total_num.toFixed(2)}`
        }
    }
}