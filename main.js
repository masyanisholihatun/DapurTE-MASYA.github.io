// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Simple Scroll Animation (Intersection Observer)
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Select elements to animate
// Add a simple fade-up class to elements we want to animate
// Or initialize style here for now
const fadeElements = document.querySelectorAll('[data-aos="fade-up"]');

fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// Modal Logic
window.openModal = function (modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

window.closeModal = function (modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close modal when clicking outside
window.onclick = function (event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close button event listener
document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', function () {
        this.closest('.modal').classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Tumpeng Menu Limit Logic
const tumpengCheckboxes = document.querySelectorAll('#tumpengRodal input[type="checkbox"]');
const selectionCountDisplay = document.getElementById('selection-count');
const MAX_SELECTION = 7;

function updateSelection() {
    const checkedCount = document.querySelectorAll('#tumpengRodal input[type="checkbox"]:checked').length;

    if (selectionCountDisplay) {
        selectionCountDisplay.textContent = `${checkedCount}/${MAX_SELECTION} item terpilih`;
    }

    tumpengCheckboxes.forEach(box => {
        if (!box.checked) {
            // Disable unchecked boxes if limit reached
            box.disabled = checkedCount >= MAX_SELECTION;
            box.parentElement.style.opacity = (checkedCount >= MAX_SELECTION) ? '0.5' : '1';
        } else {
            // Always enable checked boxes
            box.disabled = false;
            box.parentElement.style.opacity = '1';
        }
    });
}

// Add listeners
if (tumpengCheckboxes.length > 0) {
    tumpengCheckboxes.forEach(box => {
        box.addEventListener('change', updateSelection);
    });
    // Initialize
    updateSelection();
}

// Reservation Logic
let selectedMenuData = [];
let currentOrderType = '';
const PRICES = {
    'tumpeng': 1500000, // Fixed price for package
    'prasmanan': 75000,  // Per pax
    'lunchbox': 35000,   // Per pax (box)
    'healthy': 60000,    // Per day/pax
    'syukuran_kenyambok': 3000000, // 75 pax
    'syukuran_bsuhk': 5000000,     // 125 pax
    'syukuran_gati': 8000000,      // 200 pax
    'syukuran_wareg': 12000000,    // 300 pax
    'syukuran_wareg_betul': 16000000, // 400 pax
    'syukuran_ekonomi': 10000000,  // 100 pax
    'prasmanan_impressive': 20000000, // 200 pax
    'prasmanan_premium': 40000000,    // 400 pax
    'prasmanan_deluxe': 60000000,     // 600 pax
    'prasmanan_exclusive': 80000000,   // 800 pax
    'prasmanan_vip': 100000000        // 1000 pax
};

let syukuranLimit = 4; // Default
let prasmananLimit = 5; // Default

window.openPrasmanan = function (type) {
    // Reset selection first
    document.querySelectorAll('#prasmananModal input[type="checkbox"]').forEach(cb => {
        cb.checked = false;
        cb.disabled = false;
        cb.parentElement.style.opacity = '1';
    });
    ['appetizer', 'main', 'dessert', 'beverages'].forEach(cat => {
        if (document.getElementById(`count_prasmanan_${cat}`))
            document.getElementById(`count_prasmanan_${cat}`).textContent = '0';
    });

    if (type === 'vip') {
        prasmananLimit = 9;
        currentOrderType = 'prasmanan_vip';
        document.getElementById('prasmananTitle').textContent = 'Paket VIP (Wedding)';
        document.getElementById('prasmananSubtitle').textContent = 'Nikmati hidangan spesial 100juta untuk 1000 porsi.';
    } else if (type === 'exclusive') {
        prasmananLimit = 8;
        currentOrderType = 'prasmanan_exclusive';
        document.getElementById('prasmananTitle').textContent = 'Paket Exclusive (Wedding)';
        document.getElementById('prasmananSubtitle').textContent = 'Nikmati hidangan spesial 80juta untuk 800 porsi.';
    } else if (type === 'deluxe') {
        prasmananLimit = 7;
        currentOrderType = 'prasmanan_deluxe';
        document.getElementById('prasmananTitle').textContent = 'Paket Deluxe (Wedding)';
        document.getElementById('prasmananSubtitle').textContent = 'Nikmati hidangan spesial 60juta untuk 600 porsi.';
    } else if (type === 'premium') {
        prasmananLimit = 6;
        currentOrderType = 'prasmanan_premium';
        document.getElementById('prasmananTitle').textContent = 'Paket Premium (Wedding)';
        document.getElementById('prasmananSubtitle').textContent = 'Nikmati hidangan spesial 40juta untuk 400 porsi.';
    } else {
        // Impressive (replaced Ekonomi)
        prasmananLimit = 5;
        currentOrderType = 'prasmanan_impressive';
        document.getElementById('prasmananTitle').textContent = 'Paket Impressive (Wedding)';
        document.getElementById('prasmananSubtitle').textContent = 'Nikmati hidangan spesial 20juta untuk 200 porsi.';
    }

    // Update visual limits
    document.getElementById('prasmananLimitDisplay').textContent = prasmananLimit;
    document.querySelectorAll('.pras-limit-val').forEach(el => el.textContent = prasmananLimit);

    openModal('prasmananModal');
}

window.openSyukuran = function (type) {
    // Reset selection first
    document.querySelectorAll('#syukuranModal input[type="checkbox"]').forEach(cb => {
        cb.checked = false;
        cb.disabled = false;
        cb.parentElement.style.opacity = '1';
    });
    ['appetizer', 'main', 'dessert', 'beverages'].forEach(cat => {
        if (document.getElementById(`count_syukuran_${cat}`))
            document.getElementById(`count_syukuran_${cat}`).textContent = '0';
    });

    if (type === 'ekonomi') {
        syukuranLimit = 5;
        currentOrderType = 'syukuran_ekonomi';
        document.getElementById('syukuranTitle').textContent = 'Paket Ekonomi (Syukuran)';
        document.getElementById('syukuranSubtitle').textContent = 'Nikmati hidangan spesial 10juta untuk 100 porsi.';
    } else if (type === 'kenyambok') {
        syukuranLimit = 4;
        currentOrderType = 'syukuran_kenyambok';
        document.getElementById('syukuranTitle').textContent = 'Paket Kenyambok (Syukuran & Arisan)';
        document.getElementById('syukuranSubtitle').textContent = 'Nikmati hidangan spesial 3juta untuk 75 porsi.';
    } else if (type === 'bsuhk') {
        syukuranLimit = 5;
        currentOrderType = 'syukuran_bsuhk';
        document.getElementById('syukuranTitle').textContent = 'Paket BSUHK (Syukuran & Arisan)';
        document.getElementById('syukuranSubtitle').textContent = 'Nikmati hidangan spesial 5juta untuk 125 porsi.';
    } else if (type === 'gati') {
        syukuranLimit = 6;
        currentOrderType = 'syukuran_gati';
        document.getElementById('syukuranTitle').textContent = 'Paket BSUHK GATI (Syukuran & Arisan)';
        document.getElementById('syukuranSubtitle').textContent = 'Nikmati hidangan spesial 8juta untuk 200 porsi.';
    } else if (type === 'wareg') {
        syukuranLimit = 7;
        currentOrderType = 'syukuran_wareg';
        document.getElementById('syukuranTitle').textContent = 'Paket WAREG (Syukuran & Arisan)';
        document.getElementById('syukuranSubtitle').textContent = 'Nikmati hidangan spesial 12juta untuk 300 porsi.';
    } else if (type === 'wareg_betul') {
        syukuranLimit = 8;
        currentOrderType = 'syukuran_wareg_betul';
        document.getElementById('syukuranTitle').textContent = 'Paket WAREG BETUL (Syukuran & Arisan)';
        document.getElementById('syukuranSubtitle').textContent = 'Nikmati hidangan spesial 16juta untuk 400 porsi.';
    }

    // Update visual limits
    document.getElementById('syukuranLimitDisplay').textContent = syukuranLimit;
    document.querySelectorAll('#syukuranModal .limit-val').forEach(el => el.textContent = syukuranLimit);

    openModal('syukuranModal');
}

window.proceedToReservation = function (type) {
    // If type is generic 'syukuran' or 'prasmanan' passed from modal button, use the specific currentOrderType set in openSyukuran/openPrasmanan
    if (type === 'syukuran' || type === 'prasmanan') type = currentOrderType;
    else currentOrderType = type; // For others

    selectedMenuData = [];

    if (type === 'tumpeng') {
        const checkedBoxes = document.querySelectorAll('#tumpengRodal input[type="checkbox"]:checked');
        if (checkedBoxes.length !== 7) {
            alert('Mohon pilih tepat 7 item menu sebelum melanjutkan.');
            return;
        }
        selectedMenuData = Array.from(checkedBoxes).map(box => box.value);
        closeModal('tumpengRodal');

        // Setup Form
        document.getElementById('resPax').value = 1;
        document.getElementById('resPax').readOnly = true;
        document.getElementById('paxInputGroup').style.display = 'block';

    } else if (type === 'syukuran_kenyambok' || type === 'syukuran_bsuhk' || type === 'syukuran_gati' || type === 'syukuran_wareg' || type === 'syukuran_wareg_betul' || type === 'syukuran_ekonomi') {
        const catApp = document.querySelectorAll('input[name="syukuran_appetizer"]:checked');
        const catMain = document.querySelectorAll('input[name="syukuran_main"]:checked');
        const catDessert = document.querySelectorAll('input[name="syukuran_dessert"]:checked');
        const catBev = document.querySelectorAll('input[name="syukuran_beverages"]:checked');

        if (catApp.length !== syukuranLimit || catMain.length !== syukuranLimit || catDessert.length !== syukuranLimit || catBev.length !== syukuranLimit) {
            alert(`Mohon pilih tepat ${syukuranLimit} menu untuk setiap kategori (Appetizer, Main Course, Dessert, & Beverages).`);
            return;
        }

        Array.from(catApp).forEach(b => selectedMenuData.push(`${b.value} (Appetizer)`));
        Array.from(catMain).forEach(b => selectedMenuData.push(`${b.value} (Main)`));
        Array.from(catDessert).forEach(b => selectedMenuData.push(`${b.value} (Dessert)`));
        Array.from(catBev).forEach(b => selectedMenuData.push(`${b.value} (Bev)`));

        closeModal('syukuranModal');

        // Setup Form
        document.getElementById('resPax').value = 1; // 1 Paket
        // Hide Pax Input for Syukuran as it's fixed package
        document.getElementById('paxInputGroup').style.display = 'none';
        // Add a visual indicator instead if needed, or just rely on receipt
    } else if (type === 'prasmanan' || type === 'prasmanan_impressive' || type === 'prasmanan_premium' || type === 'prasmanan_deluxe' || type === 'prasmanan_exclusive' || type === 'prasmanan_vip') {
        const orderType = (type === 'prasmanan') ? currentOrderType : type;
        // Shared logic for any prasmanan entry
        const catApp = document.querySelectorAll('input[name="prasmanan_appetizer"]:checked');
        const catMain = document.querySelectorAll('input[name="prasmanan_main"]:checked');
        const catDessert = document.querySelectorAll('input[name="prasmanan_dessert"]:checked');
        const catBev = document.querySelectorAll('input[name="prasmanan_beverages"]:checked');

        if (catApp.length !== prasmananLimit || catMain.length !== prasmananLimit || catDessert.length !== prasmananLimit || catBev.length !== prasmananLimit) {
            alert(`Mohon pilih tepat ${prasmananLimit} menu untuk setiap kategori (Appetizer, Main Course, Dessert, & Beverages).`);
            return;
        }

        Array.from(catApp).forEach(b => selectedMenuData.push(`${b.value} (Appetizer)`));
        Array.from(catMain).forEach(b => selectedMenuData.push(`${b.value} (Main)`));
        Array.from(catDessert).forEach(b => selectedMenuData.push(`${b.value} (Dessert)`));
        Array.from(catBev).forEach(b => selectedMenuData.push(`${b.value} (Bev)`));

        closeModal('prasmananModal');

        document.getElementById('resPax').value = 1; // 1 Paket
        document.getElementById('paxInputGroup').style.display = 'none';

    } else if (type === 'lunchbox') {
        const qtyInputs = document.querySelectorAll('#lunchBoxModal .qty-input');
        let totalQty = 0;

        qtyInputs.forEach(input => {
            const qty = parseInt(input.value) || 0;
            if (qty > 0) {
                selectedMenuData.push(`${input.dataset.name} (${qty} box)`);
                totalQty += qty;
            }
        });

        if (totalQty === 0) {
            alert('Mohon masukkan jumlah box untuk minimal satu menu.');
            return;
        }

        closeModal('lunchBoxModal');

        // Setup Form
        const paxInput = document.getElementById('resPax');
        paxInput.value = totalQty;
        paxInput.readOnly = true;
        document.getElementById('paxInputGroup').style.display = 'block';

    } else if (type === 'healthy') {
        const checkedDays = document.querySelectorAll('input[name="healthyDays"]:checked');

        if (checkedDays.length === 0) {
            alert('Mohon pilih minimal satu hari pengantaran.');
            return;
        }

        selectedMenuData = [];
        const days = Array.from(checkedDays).map(box => box.value).join(', ');
        selectedMenuData.push(`Hari: ${days}`);

        closeModal('healthyModal');

        const paxInput = document.getElementById('resPax');
        paxInput.value = checkedDays.length;
        paxInput.readOnly = false;
        document.getElementById('paxInputGroup').style.display = 'block';
    }

    // Populate structured list
    const menuListContainer = document.getElementById('selected-menu-list');
    if (menuListContainer) {
        menuListContainer.innerHTML = `<ul style="margin: 0; padding-left: 15px; text-align: left;">
            ${selectedMenuData.map(item => `<li>${item}</li>`).join('')}
        </ul>`;
    }

    openModal('reservationModal');
    updateTotalPrice();
}

window.updateTotalPrice = function () {
    const pax = parseInt(document.getElementById('resPax').value) || 0;
    let total = 0;

    // Use currentOrderType to find price in PRICES object
    if (PRICES[currentOrderType]) {
        total = PRICES[currentOrderType] * pax;
    } else if (currentOrderType === 'prasmanan') {
        // Fallback for generic prasmanan
        total = 10000000 * pax;
    } else {
        total = 0;
    }

    // Format Currency
    document.querySelector('.price-input').value = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(total);
}

window.handleReservation = function (event) {
    event.preventDefault();

    const name = document.getElementById('resName').value;
    const pax = document.getElementById('resPax').value;
    const address = document.getElementById('resAddress').value;
    const date = document.getElementById('resDate').value;
    const total = document.querySelector('.price-input').value;

    if (!name || !address || !date) {
        alert('Mohon lengkapi semua data reservasi.');
        return;
    }

    // WhatsApp Message Integration
    const waNumber = "6281936318696";
    let menuText = selectedMenuData.join('\n- ');
    const waMessage = `Halo DapurTE Catering,%0A%0ASaya ingin melakukan reservasi:%0A*Nama:* ${name}%0A*Tanggal:* ${date}%0A*Alamat:* ${address}%0A*Paket:* ${currentOrderType.replace(/_/g, ' ').toUpperCase()}%0A*Total:* ${total}%0A%0A*Menu Pilihan:*%0A- ${menuText}%0A%0AMohon konfirmasi pemesanan saya. Terima kasih!`;

    const waUrl = `https://wa.me/${waNumber}?text=${waMessage}`;

    // Open WhatsApp in new tab
    window.open(waUrl, '_blank');

    // Update Receipt Data
    document.getElementById('recName').textContent = name;
    document.getElementById('recAddress').textContent = address;

    // Receipt naming logic (based on type)
    let menuName = 'Custom Order';
    let listHeader = 'Daftar Menu';

    if (currentOrderType === 'tumpeng') {
        menuName = 'Nasi Tumpeng Royal';
        listHeader = 'Pilihan Lauk';
    } else if (currentOrderType === 'prasmanan_impressive') {
        menuName = 'Paket Impressive (200 Pax)';
        listHeader = 'Menu Pilihan (20 Item)';
    } else if (currentOrderType === 'prasmanan_premium') {
        menuName = 'Paket Premium (400 Pax)';
        listHeader = 'Menu Pilihan (24 Item)';
    } else if (currentOrderType === 'prasmanan_deluxe') {
        menuName = 'Paket Deluxe (600 Pax)';
        listHeader = 'Menu Pilihan (28 Item)';
    } else if (currentOrderType === 'prasmanan_exclusive') {
        menuName = 'Paket Exclusive (800 Pax)';
        listHeader = 'Menu Pilihan (32 Item)';
    } else if (currentOrderType === 'prasmanan_vip') {
        menuName = 'Paket VIP (1000 Pax)';
        listHeader = 'Menu Pilihan (36 Item)';
    } else if (currentOrderType === 'syukuran_ekonomi') {
        menuName = 'Paket Ekonomi (100 Pax)';
        listHeader = 'Menu Pilihan (15 Item)';
    } else if (currentOrderType === 'syukuran_kenyambok') {
        menuName = 'Paket Kenyambok (75 Pax)';
        listHeader = 'Menu Pilihan (12 Item)';
    } else if (currentOrderType === 'syukuran_bsuhk') {
        menuName = 'Paket BSUHK (125 Pax)';
        listHeader = 'Menu Pilihan (15 Item)';
    } else if (currentOrderType === 'syukuran_gati') {
        menuName = 'Paket BSUHK GATI (200 Pax)';
        listHeader = 'Menu Pilihan (18 Item)';
    } else if (currentOrderType === 'syukuran_wareg') {
        menuName = 'Paket WAREG (300 Pax)';
        listHeader = 'Menu Pilihan (21 Item)';
    } else if (currentOrderType === 'syukuran_wareg_betul') {
        menuName = 'Paket WAREG BETUL (400 Pax)';
        listHeader = 'Menu Pilihan (24 Item)';
    } else if (currentOrderType === 'healthy') {
        menuName = 'Healthy Catering Subscription';
        listHeader = 'Jadwal & Detail Paket';
    }

    document.getElementById('recMenuType').textContent = menuName;
    document.getElementById('recListHeader').textContent = listHeader;

    // Date Format (Day, Date, Month, Year)
    const dateObj = new Date(date);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('recDate').textContent = dateObj.toLocaleDateString('id-ID', options);

    const now = new Date();
    document.getElementById('recTime').textContent = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

    const recItemsList = document.getElementById('recItems');
    recItemsList.innerHTML = '';
    const summaryLi = document.createElement('li');
    summaryLi.innerHTML = `<strong>Paket:</strong> ${menuName} <br> <strong>Jumlah:</strong> ${pax} Pax/Paket`;
    summaryLi.style.marginBottom = '10px';
    recItemsList.appendChild(summaryLi);

    selectedMenuData.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        recItemsList.appendChild(li);
    });

    if (document.getElementById('recFinalTotal')) {
        document.getElementById('recFinalTotal').textContent = total;
    }

    closeModal('reservationModal');
    openModal('receiptModal');
    startPaymentTimer();

    // Reset Modal State
    document.getElementById('paymentSection').style.display = 'block';
    document.getElementById('successMessage').style.display = 'none';
    document.getElementById('btnPrint').style.display = 'none';
    document.getElementById('paymentStatus').innerHTML = '<span class="badge-pending" style="background: #ffc107; color: #000; padding: 5px 15px; border-radius: 20px; font-size: 0.9rem; font-weight: bold;">MENUNGGU PEMBAYARAN</span>';

    // Enable Confirm Button initially
    const btnConfirm = document.querySelector('button[onclick="confirmPayment()"]');
    if (btnConfirm) {
        btnConfirm.disabled = false;
        btnConfirm.textContent = 'Konfirmasi Pembayaran';
    }
}

let paymentInterval;
function startPaymentTimer() {
    let timeLeft = 300; // 5 minutes in seconds
    const timerDisplay = document.getElementById('paymentTimer');
    const btnConfirm = document.querySelector('button[onclick="confirmPayment()"]');

    // Clear existing timer if any
    if (paymentInterval) clearInterval(paymentInterval);

    function updateDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    updateDisplay();

    paymentInterval = setInterval(() => {
        timeLeft--;
        updateDisplay();

        if (timeLeft <= 0) {
            clearInterval(paymentInterval);
            timerDisplay.textContent = "00:00";
            timerDisplay.style.color = "darkred";
            document.getElementById('paymentStatus').innerHTML = '<span class="badge-expired" style="background: #dc3545; color: white; padding: 5px 15px; border-radius: 20px; font-size: 0.9rem; font-weight: bold;">PEMBAYARAN KEDALUWARSA</span>';

            if (btnConfirm) {
                btnConfirm.disabled = true;
                btnConfirm.textContent = 'Waktu Pembayaran Habis';
            }
            alert("Waktu pembayaran telah habis! Silakan lakukan pemesanan ulang.");
        }
    }, 1000);
}

window.previewProof = function (input) {
    const preview = document.getElementById('proofPreview');
    const previewImg = preview.querySelector('img');
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            previewImg.src = e.target.result;
            preview.style.display = 'block';
        };
        reader.readAsDataURL(input.files[0]);
    }
}

window.confirmPayment = function () {
    // Basic validation
    const fileInput = document.getElementById('paymentProof');
    if (fileInput.files.length === 0) {
        alert('Mohon upload bukti pembayaran terlebih dahulu.');
        return;
    }

    // Stop timer
    clearInterval(paymentInterval);

    // Update UI to Paid State
    document.getElementById('paymentSection').style.display = 'none';
    document.getElementById('successMessage').style.display = 'block';
    // Keep preview visible but maybe smaller? Or just leave it.

    // Show Print Button
    const btnPrint = document.getElementById('btnPrint');
    btnPrint.style.display = 'block';
    btnPrint.innerHTML = '<i class="fa-solid fa-print"></i> Cetak Resi Lunas';

    // Update Badge
    document.getElementById('paymentStatus').innerHTML = '<span class="badge-success" style="background: #28a745; color: white; padding: 5px 15px; border-radius: 20px; font-size: 0.9rem; font-weight: bold;">LUNAS</span>';

    // Update Close Button to Finish Button
    const btnClose = document.getElementById('btnCloseReceipt');
    btnClose.textContent = "Selesai & Kembali ke Dashboard";
    btnClose.classList.remove('btn-outline');
    btnClose.classList.add('btn-primary');
    btnClose.onclick = finishOrder;
}

window.finishOrder = function () {
    closeModal('receiptModal');

    // Reset Globals
    selectedMenuData = [];
    currentOrderType = '';

    // Reset Reservation Form
    document.getElementById('reservationForm').reset();
    document.querySelector('.price-input').value = '';

    // Reset Selection Modals
    // 1. Tumpeng
    document.querySelectorAll('#tumpengRodal input[type="checkbox"]').forEach(cb => cb.checked = false);

    // 2. Prasmanan (Reset checkboxes and counters)
    document.querySelectorAll('#prasmananModal input[type="checkbox"]').forEach(cb => {
        cb.checked = false;
        cb.disabled = false;
        cb.parentElement.style.opacity = '1';
    });
    ['appetizer', 'main', 'dessert', 'beverages'].forEach(cat => {
        if (document.getElementById(`count_prasmanan_${cat}`))
            document.getElementById(`count_prasmanan_${cat}`).textContent = '0';
    });

    // 3. Lunch Box (Reset quantity inputs)
    document.querySelectorAll('#lunchBoxModal .qty-input').forEach(input => input.value = 0);

    // 4. Healthy Catering (Reset days and dates)
    document.querySelectorAll('#healthyModal input[type="checkbox"]').forEach(cb => cb.checked = false);
    const healthyStart = document.getElementById('healthyStartDate');
    const healthyEnd = document.getElementById('healthyEndDate');
    if (healthyStart) healthyStart.value = '';
    if (healthyEnd) healthyEnd.value = '';
    if (document.getElementById('healthyTotalDays')) document.getElementById('healthyTotalDays').textContent = '0';
    if (document.getElementById('healthyEstPrice')) document.getElementById('healthyEstPrice').textContent = 'Rp 0';

    // Reset Mobile Menu if open
    mobileMenu.classList.remove('active');
    navMenu.classList.remove('active');

    // 5. Syukuran
    document.querySelectorAll('#syukuranModal input[type="checkbox"]').forEach(cb => {
        cb.checked = false;
        cb.disabled = false;
        cb.parentElement.style.opacity = '1';
    });
    ['appetizer', 'main', 'dessert', 'beverages'].forEach(cat => {
        if (document.getElementById(`count_syukuran_${cat}`))
            document.getElementById(`count_syukuran_${cat}`).textContent = '0';
    });

    // Reset Receipt Modal Internals (Button state)
    const btnClose = document.getElementById('btnCloseReceipt');
    btnClose.textContent = "Batal / Tutup";
    btnClose.classList.add('btn-outline');
    btnClose.classList.remove('btn-primary');
    btnClose.onclick = function () { closeModal('receiptModal'); };

    // Reset Receipt specific fields
    const preview = document.getElementById('proofPreview');
    if (preview) preview.style.display = 'none';
    document.getElementById('paymentSection').style.display = 'block';
    document.getElementById('successMessage').style.display = 'none';
    document.getElementById('paymentStatus').innerHTML = '<span class="badge-pending" style="background: #ffc107; color: #000; padding: 5px 15px; border-radius: 20px; font-size: 0.9rem; font-weight: bold;">MENUNGGU PEMBAYARAN</span>';

    // Scroll to top of the dashboard
    window.scrollTo({ top: 0, behavior: 'auto' });

    // Reset Finish Button state for next use
    setTimeout(() => {
        const btnClose = document.getElementById('btnCloseReceipt');
        btnClose.textContent = "Tutup";
        btnClose.classList.add('btn-outline');
        btnClose.classList.remove('btn-primary');
        btnClose.onclick = function () { closeModal('receiptModal'); };

        // Reset Payment Section Visibility for next order
        document.getElementById('paymentSection').style.display = 'block';
        document.getElementById('successMessage').style.display = 'none';
        document.getElementById('btnPrint').style.display = 'none';

        // Reset file input
        document.getElementById('paymentProof').value = '';

    }, 500);
}

// Prasmanan Menu Limit Logic (Dynamic)
const prasmananCategories = ['prasmanan_appetizer', 'prasmanan_main', 'prasmanan_dessert', 'prasmanan_beverages'];

function updatePrasmananSelection(categoryName) {
    const checkboxes = document.querySelectorAll(`input[name="${categoryName}"]`);
    const checkedCount = document.querySelectorAll(`input[name="${categoryName}"]:checked`).length;

    // Update counter if exists
    const counterId = `count_${categoryName}`;
    if (document.getElementById(counterId)) {
        document.getElementById(counterId).textContent = checkedCount;
    }

    checkboxes.forEach(box => {
        if (!box.checked) {
            box.disabled = checkedCount >= prasmananLimit;
            box.parentElement.style.opacity = (checkedCount >= prasmananLimit) ? '0.5' : '1';
        } else {
            box.disabled = false;
            box.parentElement.style.opacity = '1';
        }
    });
}

// Syukuran Limit Logic
// Removed const SYUKURAN_LIMIT = 4; // Add listeners for Syukuran
['syukuran_appetizer', 'syukuran_main', 'syukuran_dessert', 'syukuran_beverages'].forEach(cat => {
    const checkboxes = document.querySelectorAll(`input[name="${cat}"]`);
    const counter = document.getElementById(`count_${cat}`);

    if (checkboxes.length > 0) {
        checkboxes.forEach(box => {
            box.addEventListener('change', () => {
                const checkedCount = document.querySelectorAll(`input[name="${cat}"]:checked`).length;
                if (counter) counter.textContent = checkedCount;

                checkboxes.forEach(cb => {
                    if (!cb.checked) {
                        cb.disabled = checkedCount >= syukuranLimit;
                        cb.parentElement.style.opacity = (checkedCount >= syukuranLimit) ? '0.5' : '1';
                    }
                });
            });
        });
    }
});

// Add listeners for Prasmanan
prasmananCategories.forEach(category => {
    const checkboxes = document.querySelectorAll(`input[name="${category}"]`);
    if (checkboxes.length > 0) {
        checkboxes.forEach(box => {
            box.addEventListener('change', () => updatePrasmananSelection(category));
        });
        // Initialize
        updatePrasmananSelection(category);
    }
});
// Consultation Form Logic
window.sendConsultation = function (event) {
    event.preventDefault();

    const name = document.getElementById('conName').value;
    const date = document.getElementById('conDate').value;
    const time = document.getElementById('conTime').value;

    if (!name || !date || !time) {
        alert('Mohon lengkapi semua data konsultasi.');
        return;
    }

    const waNumber = "6281936318696";
    const waMessage = `Halo DapurTE Catering,%0A%0ASaya ingin melakukan *KONSULTASI GRATIS* katering:%0A*Nama:* ${name}%0A*Tanggal Rencana:* ${date}%0A*Jam Rencana:* ${time}%0A%0AMohon info lebih lanjut. Terima kasih!`;

    const waUrl = `https://wa.me/${waNumber}?text=${waMessage}`;

    // Redirect to WhatsApp
    window.open(waUrl, '_blank');
    closeModal('consultModal');
    document.getElementById('consultForm').reset();
}

// Utility: Copy to Clipboard
window.copyToClipboard = function (text) {
    navigator.clipboard.writeText(text).then(() => {
        const toast = document.getElementById('copyToast');
        if (toast) {
            toast.style.display = 'block';
            setTimeout(() => { toast.style.display = 'none'; }, 2000);
        }
    }).catch(err => {
        console.error('Gagal menyalin: ', err);
    });
}

