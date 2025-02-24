// Tunggu hingga DOM sepenuhnya dimuat
document.addEventListener("DOMContentLoaded", function () {
  // Ambil parameter nama dari URL
  const urlParams = new URLSearchParams(window.location.search);
  let namaTamu = urlParams.get("nama"); // Ambil nilai parameter 'nama'

  // Jika nama tamu ada, bersihkan formatnya
  if (namaTamu) {
    namaTamu = decodeURIComponent(namaTamu); // Ubah karakter URL encoding menjadi teks biasa
    namaTamu = namaTamu.replace(/[-_]/g, " "); // Ganti '-' atau '_' dengan spasi
  } else {
    namaTamu = "[Nama Tamu Tidak Diketahui]"; // Default jika nama tidak ditemukan
  }

  // Tampilkan nama di elemen dengan id "guestName" jika elemen ada
  const guestNameElement = document.getElementById("guestName");
  if (guestNameElement) {
    guestNameElement.textContent = `${namaTamu}`;
  }

  // Ambil elemen tombol jika ada
  const openInvitationButton = document.getElementById("openInvitation");
  if (openInvitationButton) {
    // Tambahkan event listener ke tombol
    openInvitationButton.addEventListener("click", function () {
      // Arahkan ke halaman undangan online (ganti dengan URL yang benar)
      window.location.href = "undangan.html"; // Ganti dengan URL halaman undangan Anda
    });
  }
});
