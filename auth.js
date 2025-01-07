// Tampilkan popup dengan pesan
function showModal(message) {
    const modal = document.getElementById("popupModal");
    const popupMessage = document.getElementById("popupMessage");

    popupMessage.textContent = message; // Masukkan pesan ke popup
    modal.style.display = "flex"; // Tampilkan popup
}

// Tutup popup
function closeModal() {
    const modal = document.getElementById("popupModal");
    modal.style.display = "none"; // Sembunyikan popup
}

function togglePassword() {
    const passwordField = document.getElementById("password");
    const showPassword = document.getElementById("showPassword");
    
    if (showPassword.checked) {
        passwordField.type = "text"; // Ubah tipe input menjadi text
    } else {
        passwordField.type = "password"; // Ubah kembali menjadi password
    }
}

// Fungsi Register
document.getElementById("registerForm")?.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    let players = [];

    try {
        players = JSON.parse(localStorage.getItem("players")) || []; // Jika ada error, players tetap kosong
    } catch (error) {
        console.error("Gagal mengambil data players:", error);
    }

    if (players.some(player => player.username === username)) {
        alert("Username sudah terdaftar!");
    } else {
        players.push({ username, password, score: 0 });
        localStorage.setItem("players", JSON.stringify(players));
        alert("Registrasi berhasil! Silakan login.");
        window.location.href = "login.html";
    }
});

// Fungsi Login
document.getElementById("loginForm")?.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Ambil data Owner
    const ownerData = JSON.parse(localStorage.getItem("ownerData"));

    // Periksa apakah pengguna adalah Owner
    if (username === "owner" && ownerData && ownerData.password === password) {
        window.location.href = "admin.html";  // Jika login sebagai Owner, arahkan ke halaman admin
    } else {
        // Jika bukan Owner, cek data pemain di "players"
        let players = [];

        try {
            players = JSON.parse(localStorage.getItem("players")) || [];
        } catch (error) {
            console.error("Gagal mengambil data players:", error);
        }

        const userData = players.find(player => player.username === username);
        
        if (userData) {
            if (userData && userData.password === password) {
                localStorage.setItem("currentUser", username);  // Simpan siapa yang sedang login
                localStorage.setItem("currentScore", userData.score);  // Ambil skor terakhir pengguna
                window.location.href = "index.html";  // Arahkan ke halaman game
            } else {
                alert("Username atau password salah!");  // Jika username atau password salah
            }
        } else {
            alert("Nama pengguna tidak tersedia!");
        }
    }
});
