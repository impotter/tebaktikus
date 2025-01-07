// Tampilkan daftar pemain di tabel
function loadPlayers() {
    const players = JSON.parse(localStorage.getItem("players")) || [];
    const playerTable = document.getElementById("playerTable");

    playerTable.innerHTML = ""; // Bersihkan tabel

    players.forEach((player, index) => {
        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = player.username;

        const scoreCell = document.createElement("td");
        scoreCell.textContent = player.score;

        const actionCell = document.createElement("td");
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Hapus";
        deleteButton.className = "delete-btn";
        deleteButton.onclick = () => deletePlayer(index);

        actionCell.appendChild(deleteButton);
        row.appendChild(nameCell);
        row.appendChild(scoreCell);
        row.appendChild(actionCell);

        playerTable.appendChild(row);
    });
}

// Hapus pemain berdasarkan index
function deletePlayer(index) {
    const players = JSON.parse(localStorage.getItem("players")) || [];

    // Konfirmasi sebelum menghapus
    const confirmation = confirm(`Apakah Anda yakin ingin menghapus pemain "${players[index].username}"?`);
    if (confirmation) {
        // Hapus pemain dari array
        players.splice(index, 1);

        // Simpan kembali ke localStorage
        localStorage.setItem("players", JSON.stringify(players));

        // Hapus juga data spesifik pemain di localStorage
        const username = players[index]?.username;
        if (username) {
            localStorage.removeItem(username);
        }

        alert("Pemain berhasil dihapus.");
        loadPlayers(); // Perbarui tabel
    }
}

// Logout dari halaman admin
function logout() {
    window.location.href = "login.html";
}

// Muat daftar pemain saat halaman admin dibuka
loadPlayers();
