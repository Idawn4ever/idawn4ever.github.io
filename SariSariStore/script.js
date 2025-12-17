let products = JSON.parse(localStorage.getItem('products') || '[]');
if (products.length === 0) {
    products = [
        {id: 1, name: "Wireless Earbuds", price: 29.99, img: "https://m.media-amazon.com/images/I/51MBOAtktlL._AC_UF894,1000_QL80_.jpg"},
        {id: 2, name: "Insulated Tumbler", price: 19.99, img: "https://m.media-amazon.com/images/I/71-opbDU-mL._AC_UF894,1000_QL80_.jpg"},
        {id: 3, name: "Yoga Mat", price: 39.99, img: "https://m.media-amazon.com/images/I/51MBOAtktlL._AC_UF894,1000_QL80_.jpg"},
        // Add more...
    ];
    localStorage.setItem('products', JSON.stringify(products));
}

let cart = JSON.parse(localStorage.getItem('cart') || '[]');

function renderProducts() {
    const grid = document.getElementById('productGrid');
    if (!grid) return;
    grid.innerHTML = products.map(p => `
        <div class="bg-white rounded-xl shadow-lg p-6 text-center">
            <img src="${p.img}" alt="${p.name}" class="w-full h-64 object-cover mb-4 rounded">
            <h3 class="text-xl font-bold mb-2">${p.name}</h3>
            <p class="text-2xl font-bold text-green-600 mb-4">$${p.price}</p>
            <button onclick="addToCart(${p.id})" class="bg-green-600 text-white px-6 py-3 rounded-lg">Add to Cart</button>
        </div>
    `).join('');
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    const item = cart.find(i => i.id === id);
    if (item) item.qty++;
    else cart.push({id, name: product.name, price: product.price, qty: 1});
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    document.getElementById('cartCount').textContent = cart.reduce((s, i) => s + i.qty, 0);
}

function showCart() {
    let html = '';
    let total = 0;
    cart.forEach(item => {
        const prod = products.find(p => p.id === item.id);
        total += prod.price * item.qty;
        html += `<div class="flex justify-between mb-4"><p>${prod.name} x ${item.qty}</p><p>$${(prod.price * item.qty).toFixed(2)}</p></div>`;
    });
    document.getElementById('cartItems').innerHTML = html || '<p>Empty</p>';
    document.getElementById('cartTotal').textContent = total.toFixed(2);
    document.getElementById('cartModal').classList.remove('hidden');
}

function hideCart() {
    document.getElementById('cartModal').classList.add('hidden');
}

function checkout() {
    if (cart.length === 0) return alert('Cart empty');
    const encoded = encodeURIComponent(JSON.stringify(cart));
    window.location.href = `checkout.html?cart=${encoded}`;
}

renderProducts();
updateCartCount();
