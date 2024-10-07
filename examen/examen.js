const cartButton = document.getElementById('cart-button');
const cartSidebar = document.getElementById('cart-sidebar');
const orderList = document.getElementById('order-list');
const totalElement = document.getElementById('total');
let total = 0;
let itemCount = 0;

// Cargar datos del localStorage al iniciar
document.addEventListener('DOMContentLoaded', loadCart);

cartButton.addEventListener('click', () => {
    cartSidebar.classList.toggle('active');
});

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        const product = e.target.parentElement;
        const productName = product.querySelector('h3').innerText;
        const productPrice = parseFloat(product.querySelector('p').innerText.replace('$', ''));

        // Añadir al carrito
        addToCart(productName, productPrice);
    });
});

// Función para agregar productos al carrito
function addToCart(name, price) {
    const listItem = document.createElement('li');
    listItem.textContent = `${name} - $${price.toFixed(2)}`;
    
    // Botón para eliminar
    const removeButton = document.createElement('button');
    removeButton.textContent = '✖';
    removeButton.classList.add('remove');
    removeButton.onclick = () => {
        removeFromCart(listItem, price);
    };

    listItem.appendChild(removeButton);
    orderList.appendChild(listItem);

    // Actualizar total y conteo
    total += price;
    itemCount++;
    updateCart();

    // Guardar en localStorage
    saveCart();
}

// Función para actualizar el carrito
function updateCart() {
    totalElement.textContent = `Total: $${total.toFixed(2)}`;
    cartButton.textContent = `Carrito (${itemCount})`;
}

// Función para eliminar productos
function removeFromCart(item, price) {
    orderList.removeChild(item);
    total -= price;
    itemCount--;
    updateCart();

    // Guardar cambios en localStorage
    saveCart();
}

// Función para guardar el carrito en localStorage
function saveCart() {
    const cartData = {
        total,
        itemCount,
        items: Array.from(orderList.children).map(item => item.textContent.replace('✖', '').trim()),
    };
    localStorage.setItem('cart', JSON.stringify(cartData));
}

// Función para cargar el carrito desde localStorage
function loadCart() {
    const cartData = JSON.parse(localStorage.getItem('cart'));
    if (cartData) {
        total = cartData.total;
        itemCount = cartData.itemCount;
        cartData.items.forEach(item => {
            const [name, price] = item.split(' - $');
            addToCart(name, parseFloat(price));
        });
        updateCart();
    }
}

// Botón para cerrar el carrito
document.getElementById('close-cart').addEventListener('click', () => {
    cartSidebar.classList.remove('active');
});
