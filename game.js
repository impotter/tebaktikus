let score = 0;

// Menampilkan nama pengguna saat halaman dimuat
window.onload = function() {
    const currentUser = localStorage.getItem("currentUser");
    console.log("Current User: ", currentUser); // Cek apakah nama ada di localStorage
    if (currentUser) {
        document.getElementById("username-display").textContent = `Hi, ${currentUser}!`;
    } else {
        document.getElementById("username-display").textContent = "Hi, Guest!";
    }
};

// Fungsi untuk mengubah nama pengguna
function changeName() {
    const newName = document.getElementById("rename-input").value.trim();
    if (newName === "") {
        alert("Nama tidak boleh kosong!");
        return;
    }

    const currentUser = localStorage.getItem("currentUser"); // Nama pengguna yang sedang login

    if (currentUser) {
        // Ambil data pemain dari localStorage
        let players = JSON.parse(localStorage.getItem("players")) || [];

        // Cari pemain dengan nama lama
        const userIndex = players.findIndex(player => player.username === currentUser);
        if (userIndex !== -1) {
            // Update nama pemain di data pemain
            const user = players[userIndex];
            user.username = newName;  // Ganti nama pengguna
            user.score = user.score; // Pastikan data skor tetap utuh

            // Simpan kembali data pemain yang sudah diubah ke localStorage
            players[userIndex] = user;  // Ganti data pemain yang sudah diupdate
            localStorage.setItem("players", JSON.stringify(players));

            // Update nama pengguna yang sedang login di localStorage
            localStorage.setItem("currentUser", newName);

            // Perbarui tampilan nama di halaman
            document.getElementById("username-display").textContent = `Hi, ${newName}!`;
        }

        // Tutup modal
        closeModal();
    } else {
        alert("Anda belum login!");
    }
}

function showModal() {
    const modal = document.getElementById("changeNameModal");
    if (modal) {
        modal.classList.add("show"); // Menambahkan kelas show untuk menampilkan modal
        console.log("Modal displayed"); // Cek apakah modal muncul
    }
}

// Fungsi untuk menutup modal
function closeModal() {
    const modal = document.getElementById("changeNameModal");
    if (modal) {
        modal.classList.remove("show"); // Menghapus kelas show untuk menyembunyikan modal
        console.log("Modal closed");
    }
}// Periksa status login
function checkLogin() {
    const username = localStorage.getItem("currentUser");
    if (!username) {
        alert("Anda harus login terlebih dahulu!");
        window.location.href = "login.html";
    }
}

// Logout
function logout() {
    const currentUser = localStorage.getItem("currentUser");
    const currentScore = parseInt(localStorage.getItem("currentScore"), 10);

    if (currentUser && currentScore !== NaN) { // Pastikan currentScore adalah angka yang valid
        // Ambil data pemain dari localStorage
        let players = JSON.parse(localStorage.getItem("players")) || [];

        // Cari indeks pemain yang sesuai dengan currentUser
        const userIndex = players.findIndex(player => player.username === currentUser);

        if (userIndex !== -1) {
            // Update skor pemain di daftar players jika ditemukan
            players[userIndex].score = currentScore;
        } else {
            // Jika pemain tidak ditemukan, tambahkan pemain baru
            players.push({
                username: currentUser,
                score: currentScore
            });
        }

        // Simpan array players yang sudah diupdate
        localStorage.setItem("players", JSON.stringify(players));
        console.log("Player's score updated or added:", players);
    } else {
        console.log("No user or score found to update.");
    }

    // Hapus data login dan skor dari localStorage
    localStorage.removeItem("currentUser");
    localStorage.removeItem("currentScore");

    // Redirect ke halaman login
    window.location.href = "login.html";
}

// Panggil fungsi ini saat halaman game dibuka
checkLogin();

function randomPosition() {
    return Math.floor(Math.random() * 5) + 1; // Angka acak antara 1 dan 5
}

function guess(playerGuess) {
    const mousePosition = randomPosition();
    const messageElement = document.getElementById("message");
    const scoreElement = document.getElementById("score");

    if (playerGuess === mousePosition) {
        score += 3;
        messageElement.textContent = `Benar! Tikus ada di posisi ${mousePosition}. Kamu dapat 3 poin!`;
        messageElement.style.color = "green";
        document.querySelectorAll('.btn').forEach((btn, index) => {
            if (index + 1 === mousePosition) {
                btn.style.backgroundImage = "url('images/mouse.png')"; // Gambar tikus
            } else {
                btn.style.backgroundImage = "url('images/holes.png')"; // Gambar lubang
            }
        });
    } else {
        score -= 1;
        messageElement.textContent = `Salah! Tikus ada di posisi ${mousePosition}. Kamu kehilangan 1 poin.`;
        messageElement.style.color = "red";
    }

    scoreElement.textContent = `Skor: ${score}`;

    // Simpan skor pemain di array players di localStorage
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
        let players = JSON.parse(localStorage.getItem("players")) || [];
        const userIndex = players.findIndex(player => player.username === currentUser);

        if (userIndex !== -1) {
            players[userIndex].score = score; // Update skor pemain dalam array players
            localStorage.setItem("players", JSON.stringify(players)); // Simpan array players yang telah diperbarui
        }
    }

    // Simpan skor sementara ke localStorage untuk sesi ini
    localStorage.setItem("currentScore", score);
}

// Ambil skor terakhir yang disimpan di localStorage jika ada
const savedScore = localStorage.getItem("currentScore");
if (savedScore) {
    score = parseInt(savedScore, 10);
    document.getElementById("score").textContent = `Score: ${score}`;
}
