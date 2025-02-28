// Fungsi untuk memuat menu dari backend dan menampilkan pada halaman utama
document.addEventListener('DOMContentLoaded', function () {
    fetch('/api/menu')
        .then(response => response.json())
        .then(menuData => {
            const menuContainer = document.getElementById('menu-container');
            menuData.forEach(item => {
                const menuItem = document.createElement('div');
                menuItem.innerHTML = `
                    <input type="checkbox" name="items" value="${item.id}">
                    <label>${item.name} - Rp ${item.price}</label>
                `;
                menuContainer.appendChild(menuItem);
            });
        });

    // Menampilkan rincian pesanan pada halaman order.html
    if (window.location.pathname === '/order.html') {
        const orderDetails = JSON.parse(localStorage.getItem('orderDetails'));
        const orderDetailsElement = document.getElementById('order-details');
        const totalPriceElement = document.getElementById('total-price');

        orderDetailsElement.innerHTML = `Pesanan: ${orderDetails.items.join(', ')}`;
        totalPriceElement.innerHTML = `Total Harga: Rp ${orderDetails.total}`;
    }
});
