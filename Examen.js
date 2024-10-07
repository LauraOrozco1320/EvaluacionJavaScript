document.addEventListener('DOMContentLoaded', function () {
    const cartButton = document.querySelectorAll('.small-img'); // Botones de añadir al carrito
    const cartSidebar = document.getElementById('cart-sidebar');
    const closeCartButton = document.getElementById('close-cart');
    const orderList = document.getElementById('order-list');
    const totalText = document.getElementById('total');

    let total = 0;
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Calcular el total inicial basado en cartItems
    cartItems.forEach(item => {
        total += item.price; // Sumar el precio de cada producto al total
    });

    // Función para abrir el sidebar
    function openCart() {
        cartSidebar.classList.add('active');
        renderCart(); // Mostrar productos del carrito al abrir
    }

    // Función para cerrar el sidebar
    function closeCart() {
        cartSidebar.classList.remove('active');
    }

    // Función para agregar un producto al carrito
    function addToCart(product) {
        cartItems.push(product);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        total += product.price; // Actualizar total al añadir producto
        updateTotal();
        renderCart();
    }

    // Función para eliminar un producto del carrito
    function removeFromCart(index) {
        const removedItem = cartItems.splice(index, 1)[0]; // Elimina el producto del array
        total -= removedItem.price; // Resta el precio del total
        localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Actualiza el localStorage
        updateTotal();
        renderCart(); // Volver a renderizar el carrito
    }

    // Función para actualizar el total
    function updateTotal() {
        totalText.textContent = `Total: $${total.toFixed(2)}`;
    }

    // Función para renderizar los productos del carrito
    function renderCart() {
        orderList.innerHTML = ''; // Limpiar la lista
        cartItems.forEach((item, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="product-image">
                <div class="product-info">
                    <p class="product-name">${item.name}</p>
                    <p class="product-price">$${item.price.toFixed(2)}</p>
                </div>
                <span class="remove-item" data-index="${index}">✖</span>
            `;
            orderList.appendChild(li);
        });

        // Agregar evento para eliminar item
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function () {
                const index = button.getAttribute('data-index');
                removeFromCart(index);
            });
        });
    }

    // Añadir evento de clic a cada botón de añadir al carrito
    cartButton.forEach((button) => {
        button.addEventListener('click', function () {
            const product = {
                name: 'Bicycle', // Cambiar esto según el producto
                price: 120.00, // Cambiar según el precio del producto
                image: 'file:///C:/Users/Formacion/Desktop/img%20examen/bici.jpg' // Ruta de la imagen
            };
            addToCart(product);
            openCart();
        });
    });

    closeCartButton.addEventListener('click', closeCart);

    // Renderizar el carrito y el total al cargar la página
    renderCart();
    updateTotal(); // Asegúrate de que el total se muestre correctamente
});