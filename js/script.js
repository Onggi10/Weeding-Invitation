// URL Google Apps Script untuk mengirim data formulir
const scriptURL = "https://script.google.com/macros/s/AKfycbxwPwpB1-X7iJOj6_H0h7VH_g-tVOzh8ZxiicIclUVtBN8kUEnWWgtbRjjZw1xEkEwcTQ/exec";

// ---------------------------------------
// Utility Functions
// ---------------------------------------
function showLoadingMessage(form, message, show = true) {
  const loadingMessage = form.querySelector(".loading-message");
  if (loadingMessage) {
    loadingMessage.style.display = show ? "block" : "none";
    loadingMessage.textContent = message;
  } else {
    console.warn("Loading message element tidak ditemukan.");
  }
}

function disableSubmitButton(form, disable = true) {
  const submitButton = form.querySelector('button[type="submit"]');
  if (submitButton) {
    submitButton.disabled = disable;
  } else {
    console.warn("Tombol submit tidak ditemukan.");
  }
}

// ---------------------------------------
// Modal Handlers
// ---------------------------------------
const modal = document.getElementById("rsvpModal");

if (modal) {
  const openModalButton = document.getElementById("openModal");
  const closeModalButton = document.getElementById("closeModal");

  if (openModalButton) {
    openModalButton.addEventListener("click", () => {
      modal.showModal();
      document.body.classList.add("modal-open");
    });
  } else {
    console.warn("Tombol buka modal tidak ditemukan.");
  }

  if (closeModalButton) {
    closeModalButton.addEventListener("click", () => {
      modal.close();
      document.body.classList.remove("modal-open");
    });
  }

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.close();
      document.body.classList.remove("modal-open");
    }
  });
} else {
  console.warn("Modal tidak ditemukan.");
}

// ---------------------------------------
// Form Submission Handlers
// ---------------------------------------
function handleFormSubmission(form, formType, successMessage) {
  if (!form) {
    console.error("Form tidak ditemukan");
    return;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Validasi input
    const inputs = Array.from(form.querySelectorAll("input, textarea"));
    const isValid = inputs.every((input) => (input.required ? input.value.trim() !== "" : true));

    if (!isValid) {
      alert("Semua field wajib diisi dengan benar!");
      return;
    }

    // Tambahkan formType ke FormData
    const formData = new FormData(form);
    formData.append("formType", formType);

    // Tampilkan loading dan nonaktifkan tombol submit
    showLoadingMessage(form, "Mengirim data, harap tunggu...", true);
    disableSubmitButton(form, true);

    fetch(scriptURL, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        console.log("Response status:", response.status);
        return response.json();
      })
      .then((data) => {
        console.log("Response data:", data);
        alert(successMessage);
        form.reset();
      })
      .catch((error) => {
        console.error("Error pengiriman:", error);
        alert("Terjadi kesalahan saat mengirim data. Silakan coba lagi.");
      })
      .finally(() => {
        showLoadingMessage(form, "", false);
        disableSubmitButton(form, false);
      });
  });
}

// ---------------------------------------
// Konfirmasi Kehadiran Form
// ---------------------------------------
const rsvpForm = document.forms["submit-to-google-sheet"];
if (rsvpForm) {
  console.log("Form konfirmasi kehadiran ditemukan.");
  handleFormSubmission(rsvpForm, "kehadiran", "Formulir Kehadiran berhasil dikirim!");
} else {
  console.warn("Form konfirmasi kehadiran tidak ditemukan.");
}

// ---------------------------------------
// Buku Tamu Form
// ---------------------------------------
const guestbookForm = document.forms["submit-to-google-sheet-guestbook"];
if (guestbookForm) {
  console.log("Form buku tamu ditemukan.");
  handleFormSubmission(guestbookForm, "bukuTamu", "Pesan Buku Tamu berhasil dikirim!");
} else {
  console.warn("Form buku tamu tidak ditemukan.");
}

// ---------------------------------------
// Animasi Hamburger Menu
// ---------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  const navbarToggler = document.querySelector(".navbar-toggler");
  if (navbarToggler) {
    navbarToggler.addEventListener("click", function () {
      this.classList.toggle("open");
    });
  } else {
    console.warn("Tombol hamburger menu tidak ditemukan.");
  }
});

// // ---------------------------------------
// // Fullscreen Section Handling
// // ---------------------------------------
function setFullScreenHeight() {
  const sections = document.querySelectorAll("section");
  const navbar = document.querySelector(".navbar");
  const navbarHeight = navbar ? navbar.offsetHeight : 0;
  const viewportHeight = window.innerHeight;

  sections.forEach((section) => {
    section.style.minHeight = `${viewportHeight - navbarHeight}px`;
  });
}

// Tentukan tanggal acara otomatis (1 minggu dari sekarang)
const currentDate = new Date();
const eventDate = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 hari ke depan

function updateCountdown() {
  const now = new Date().getTime();
  const timeLeft = eventDate.getTime() - now;

  if (timeLeft > 0) {
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    // Update DOM
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
  } else {
    // Jika waktu telah berlalu
    clearInterval(countdownInterval); // Hentikan interval
    document.getElementById('countdown').innerHTML = '<h3>Acara telah dimulai!</h3>';
  }
}

// Jalankan setiap detik
const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown(); // Panggil sekali untuk memastikan tampilan langsung muncul

window.addEventListener("load", setFullScreenHeight);
window.addEventListener("resize", setFullScreenHeight);
