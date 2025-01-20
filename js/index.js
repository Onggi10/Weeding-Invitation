// Ambil parameter nama dari URL
const urlParams = new URLSearchParams(window.location.search);
const namaTamu = urlParams.get("name"); // Ambil nilai parameter 'name'

// Tampilkan nama di elemen dengan id "guestName"
if (namaTamu) {
  document.getElementById("guestName").textContent = namaTamu; // Gunakan namaTamu
} else {
  document.getElementById("guestName").textContent =
    "[Nama Tamu Tidak Diketahui]";
}

// Ambil elemen tombol
const openInvitationButton = document.getElementById("openInvitation");

// Tambahkan event listener ke tombol
openInvitationButton.addEventListener("click", () => {
  // Arahkan ke halaman undangan online
  window.location.href = "undangan.html"; // Ganti dengan URL halaman undangan Anda
});
