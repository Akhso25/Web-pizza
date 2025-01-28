// Animasi Typing Effect
const typingText = "Selamat Datang di Pizza Online";
const typingElement = document.querySelector(".typing-effect");
let index = 0;

function type() {
    if (index < typingText.length) {
        typingElement.textContent += typingText.charAt(index);
        index++;
        setTimeout(type, 100); // Kecepatan typing (ms)
    }
}

// Animasi Fade-In untuk seluruh konten
function fadeInContent() {
    const content = document.querySelector(".content"); // Pastikan ada elemen dengan class "content" di HTML
    content.style.opacity = 0; // Mulai dari opacity 0
    let opacity = 0;

    const fadeInInterval = setInterval(() => {
        if (opacity < 1) {
            opacity += 0.05; // Tingkat kenaikan opacity
            content.style.opacity = opacity;
        } else {
            clearInterval(fadeInInterval); // Hentikan interval setelah opacity mencapai 1
        }
    }, 50); // Interval waktu untuk animasi (ms)
}

// Jalankan animasi saat halaman dimuat
window.onload = function () {
    type();
    setTimeout(function () {
        document.getElementById("loading").style.display = "none";
        fadeInContent(); // Jalankan animasi fade-in setelah loading screen hilang
    }, 25); // Loading screen akan hilang setelah 2 detik
};

// Fungsi untuk menambahkan item ke keranjang
function addToCart(itemName, itemPrice) {
    const cartItemsTable = document.getElementById("cart-items-table");
    const totalElement = document.getElementById("total");

    // Ambil kuantitas dari elemen yang sesuai
    const quantityElement = event.target.closest(".product").querySelector(".quantity");
    const quantity = parseInt(quantityElement.textContent);

    // Hitung harga total berdasarkan kuantitas
    const totalItemPrice = itemPrice * quantity;

    // Buat baris baru untuk tabel keranjang
    const row = document.createElement("tr");
    const itemNumber = cartItemsTable.children.length + 1; // Nomor urut item
    row.innerHTML = `
        <td>${itemNumber}</td>
        <td>${itemName} (${quantity}x)</td>
        <td>Rp ${totalItemPrice.toLocaleString()}</td>
    `;
    cartItemsTable.appendChild(row);

    // Update total harga
    let total = parseInt(totalElement.textContent.replace(/\D/g, "")) || 0;
    total += totalItemPrice;
    totalElement.textContent = `Rp ${total.toLocaleString()}`;

    // Animasi klik beli
    const button = event.target;
    button.style.backgroundColor = "#45a049"; // Warna hijau lebih gelap saat diklik
    button.textContent = "Ditambahkan!";
    setTimeout(() => {
        button.style.backgroundColor = "#4CAF50"; // Kembali ke warna hijau
        button.textContent = "Beli";
    }, 1000);

    // Tampilkan pesan "Barang sudah ditambahkan ke keranjang"
    showTempMessage("Barang sudah ditambahkan ke keranjang!");
}

// Fungsi untuk mengosongkan keranjang
function clearCart() {
    const cartItemsTable = document.getElementById("cart-items-table");
    const totalElement = document.getElementById("total");
    cartItemsTable.innerHTML = ""; // Hapus semua item
    totalElement.textContent = "Rp 0"; // Reset total
}

// Fungsi untuk toggle hamburger menu
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// Tombol Back to Top
const backToTopButton = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
});

backToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// Animasi Smooth Scrolling untuk semua link
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault(); // Mencegah perilaku default
        const targetId = this.getAttribute("href"); // Ambil ID target
        const targetElement = document.querySelector(targetId); // Dapatkan elemen target

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: "smooth", // Animasi smooth scrolling
                block: "start" // Geser ke bagian atas elemen target
            });
        }
    });
});

// Fungsi Checkout
function checkout() {
    const name = document.getElementById("checkout-name").value;
    const address = document.getElementById("checkout-address").value;
    const phone = document.getElementById("checkout-phone").value;
    const paymentMethod = document.getElementById("checkout-payment").value;

    if (!name || !address || !phone || !paymentMethod) {
        showTempMessage("Harap lengkapi semua field!", 2000);
        return;
    }

    const cartItemsTable = document.getElementById("cart-items-table").children;
    if (cartItemsTable.length === 0) {
        showTempMessage("Keranjang belanja Anda kosong!", 2000);
        return;
    }

    // Tampilkan pesan "Pesanan sedang diproses"
    const processingMessage = document.createElement("div");
    processingMessage.className = "processing-message";
    processingMessage.textContent = "Pesanan Anda sedang diproses...";
    document.getElementById("checkout-form").insertAdjacentElement("afterend", processingMessage);

    // Simulasikan proses pembayaran selama 3 detik
    setTimeout(() => {
        // Tampilkan pesan terima kasih dan detail pesanan
        let orderDetails = `Terima kasih, ${name}!\n\nPesanan Anda:\n`;
        for (let item of cartItemsTable) {
            orderDetails += `${item.textContent}\n`;
        }
        orderDetails += `\nTotal: ${document.getElementById("total").textContent}\n`;
        orderDetails += `Alamat: ${address}\n`;
        orderDetails += `Metode Pembayaran: ${paymentMethod}`;

        alert(orderDetails);

        // Reset form dan keranjang
        document.getElementById("checkout-form").reset();
        clearCart();

        // Hapus pesan "Pesanan sedang diproses"
        processingMessage.remove();
    }, 3000); // Simulasi proses pembayaran selama 3 detik
}

// Fungsi untuk filter dan pencarian menu
function filterAndSearchMenu() {
    const searchInput = document.getElementById("search").value.toUpperCase();
    const categoryFilter = document.getElementById("category").value;
    const products = document.querySelectorAll(".product");

    products.forEach(product => {
        const productName = product.querySelector("h3").textContent.toUpperCase();
        const productCategory = product.getAttribute("data-category");

        // Filter berdasarkan kategori dan pencarian
        const matchesCategory = categoryFilter === "all" || productCategory === categoryFilter;
        const matchesSearch = productName.includes(searchInput);

        if (matchesCategory && matchesSearch) {
            product.style.display = "block"; // Tampilkan produk
        } else {
            product.style.display = "none"; // Sembunyikan produk
        }
    });
}

// Event Listener untuk input pencarian dan filter kategori
document.getElementById("search").addEventListener("input", filterAndSearchMenu);
document.getElementById("category").addEventListener("change", filterAndSearchMenu);

// Fungsi untuk menampilkan pesan sementara
function showTempMessage(message, duration = 2000) {
    const messageElement = document.createElement("div");
    messageElement.className = "temp-message";
    messageElement.textContent = message;
    document.body.appendChild(messageElement);

    // Animasi fade-in
    setTimeout(() => {
        messageElement.style.opacity = 1;
    }, 10);

    // Hapus pesan setelah durasi tertentu
    setTimeout(() => {
        messageElement.style.opacity = 0;
        setTimeout(() => {
            document.body.removeChild(messageElement);
        }, 500); // Waktu untuk animasi fade-out
    }, duration);
}

// Fungsi untuk memicu animasi fade-in
function checkFadeIn() {
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;

        // Cek apakah elemen masuk ke dalam viewport
        if (elementTop < windowHeight && elementBottom > 0) {
            element.classList.add('visible');
        } else {
            element.classList.remove('visible'); // Hapus class visible jika elemen keluar dari viewport
        }
    });
}

// Jalankan fungsi saat halaman dimuat dan di-scroll
window.addEventListener('scroll', checkFadeIn);
window.addEventListener('load', checkFadeIn);

// Fungsi untuk mengupdate kuantitas
function updateQuantity(button, change) {
    const quantityElement = button.parentElement.querySelector(".quantity");
    let quantity = parseInt(quantityElement.textContent);

    // Update kuantitas
    quantity += change;

    // Pastikan kuantitas tidak kurang dari 1
    if (quantity < 1) quantity = 1;

    // Update tampilan kuantitas
    quantityElement.textContent = quantity;

    // Ambil harga per item
    const priceElement = button.closest(".product").querySelector(".price");
    const price = parseInt(priceElement.getAttribute("data-price"));

    // Hitung harga total berdasarkan kuantitas
    const totalPrice = price * quantity;

    // Update tampilan harga total
    priceElement.textContent = `Rp ${totalPrice.toLocaleString()}`;

    // Update total harga di keranjang
    updateCartTotal();
}

// Fungsi untuk mengupdate total harga di keranjang
function updateCartTotal() {
    const cartItemsTable = document.getElementById("cart-items-table");
    const totalElement = document.getElementById("total");
    let total = 0;

    // Loop melalui setiap item di keranjang
    cartItemsTable.querySelectorAll("tr").forEach(row => {
        const priceText = row.querySelector("td:nth-child(3)").textContent;
        const price = parseInt(priceText.replace(/\D/g, ""));
        total += price;
    });

    // Update total harga
    totalElement.textContent = `Rp ${total.toLocaleString()}`;
}

// Event listener untuk tombol + dan -
document.querySelectorAll(".quantity-btn").forEach(button => {
    button.addEventListener("click", () => {
        const change = button.classList.contains("plus") ? 1 : -1;
        updateQuantity(button, change);
    });
});
// Fungsi untuk menampilkan pesan sementara
function showTempMessage(message, duration = 2000) {
    const messageElement = document.createElement("div");
    messageElement.className = "temp-message";
    messageElement.textContent = message;
    document.body.appendChild(messageElement);

    // Animasi fade-in
    setTimeout(() => {
        messageElement.style.opacity = 1;
    }, 10);

    // Hapus pesan setelah durasi tertentu
    setTimeout(() => {
        messageElement.style.opacity = 0;
        setTimeout(() => {
            document.body.removeChild(messageElement);
        }, 500); // Waktu untuk animasi fade-out
    }, duration);
}

// Total harga awal
let totalPrice = 150000;

// Daftar diskon acak
const discounts = [5, 10, 15];

// Fungsi untuk klaim voucher
function claimVoucher() {
    // Ambil kode voucher dari input
    const code = document.getElementById("voucher-code").value.trim();

    // Validasi kode (gunakan format "VOUCHER2023")
    if (code === "VOUCHER2023") {
        // Pilih diskon secara acak
        const randomIndex = Math.floor(Math.random() * discounts.length);
        const discountPercentage = discounts[randomIndex];

        // Hitung diskon dan harga akhir
        const discountAmount = (totalPrice * discountPercentage) / 100;
        const finalPrice = totalPrice - discountAmount;

        // Perbarui nilai di halaman
        document.getElementById("discount").textContent = `Rp ${discountAmount.toLocaleString()}`;
        document.getElementById("final-price").textContent = `Rp ${finalPrice.toLocaleString()}`;

        // Tampilkan notifikasi
        alert(`Selamat! Anda mendapatkan diskon ${discountPercentage}%!`);
    } else {
        alert("Kode voucher tidak valid. Silakan coba lagi.");
    }

    // Kosongkan input setelah klaim
    document.getElementById("voucher-code").value = "";
            }
