// URL Google Apps Script untuk mengirim data formulir
const scriptURL =
  "https://script.google.com/macros/s/AKfycbxwPwpB1-X7iJOj6_H0h7VH_g-tVOzh8ZxiicIclUVtBN8kUEnWWgtbRjjZw1xEkEwcTQ/exec";

// ---------------------------------------
// Utility Functions
// ---------------------------------------
function showLoadingMessage(form, message, show = true) {
  const loadingMessage = form.querySelector(".loading-message");
  if (loadingMessage) {
    loadingMessage.style.display = show ? "block" : "none";
    loadingMessage.textContent = message;
  }
}

function disableSubmitButton(form, disable = true) {
  const submitButton = form.querySelector('button[type="submit"]');
  if (submitButton) submitButton.disabled = disable;
}

// ---------------------------------------
// Modal Handlers (native <dialog>)
const modal = document.getElementById("rsvpModal");
if (modal) {
  document.getElementById("openModal")?.addEventListener("click", () => {
    modal.showModal();
    document.body.classList.add("modal-open");
  });

  document.getElementById("closeModal")?.addEventListener("click", () => {
    modal.close();
    document.body.classList.remove("modal-open");
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.close();
      document.body.classList.remove("modal-open");
    }
  });
}

//Swipper
const swiper = new Swiper(".mySwiper", {
  loop: true,
  spaceBetween: 20,
  slidesPerView: 1,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

// ---------------------------------------
// Form Submission Handlers
function handleFormSubmission(form, formType, successMessage) {
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const inputs = Array.from(form.querySelectorAll("input, textarea, select"));
    const isValid = inputs.every((input) =>
      input.required ? input.value.trim() !== "" : true
    );

    if (!isValid) {
      alert("Semua field wajib diisi dengan benar!");
      return;
    }

    const formData = new FormData(form);
    formData.append("formType", formType);

    showLoadingMessage(form, "Mengirim data, harap tunggu...");
    disableSubmitButton(form, true);

    try {
      const response = await fetch(scriptURL, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Respon tidak berhasil");

      const data = await response.json();
      console.log("Response:", data);
      alert(successMessage);
      form.reset();
    } catch (error) {
      console.error("Error pengiriman:", error);
      alert("Terjadi kesalahan saat mengirim data. Silakan coba lagi.");
    } finally {
      showLoadingMessage(form, "", false);
      disableSubmitButton(form, false);
    }
  });
}

// ---------------------------------------
// DOM Loaded
document.addEventListener("DOMContentLoaded", () => {
  // Bind Form
  const rsvpForm = document.forms["submit-to-google-sheet"];
  const guestbookForm = document.forms["submit-to-google-sheet-guestbook"];

  if (rsvpForm) {
    handleFormSubmission(
      rsvpForm,
      "kehadiran",
      "Formulir Kehadiran berhasil dikirim!"
    );
  }

  if (guestbookForm) {
    handleFormSubmission(
      guestbookForm,
      "bukuTamu",
      "Pesan Buku Tamu berhasil dikirim!"
    );
  }

  // Hamburger animation
  document
    .querySelector(".navbar-toggler")
    ?.addEventListener("click", function () {
      this.classList.toggle("open");
    });

  // Fullscreen section sizing
  function setFullScreenHeight() {
    const sections = document.querySelectorAll("section");
    const navbarHeight = document.querySelector(".navbar")?.offsetHeight || 0;
    const viewportHeight = window.innerHeight;

    sections.forEach((section) => {
      section.style.minHeight = `${viewportHeight - navbarHeight}px`;
    });
  }
  window.addEventListener("load", setFullScreenHeight);
  window.addEventListener("resize", setFullScreenHeight);
  setFullScreenHeight();

  // Countdown
  const eventDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const countdownEl = document.getElementById("countdown");

  if (countdownEl) {
    const updateCountdown = () => {
      const now = Date.now();
      const timeLeft = eventDate - now;

      if (timeLeft > 0) {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
        const seconds = Math.floor((timeLeft / 1000) % 60);

        ["days", "hours", "minutes", "seconds"].forEach((id, i) => {
          const el = document.getElementById(id);
          if (el) el.textContent = [days, hours, minutes, seconds][i];
        });
      } else {
        clearInterval(countdownInterval);
        countdownEl.innerHTML = "<h3>Acara telah dimulai!</h3>";
      }
    };

    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown();
  }

  // Smooth scroll with offset + auto-collapse navbar (tanpa setTimeout)
  document.querySelectorAll('.nav-link[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => {
      const navbarCollapse = document.querySelector(".navbar-collapse");

      if (navbarCollapse?.classList.contains("show")) {
        const bsCollapse =
          bootstrap.Collapse.getInstance(navbarCollapse) ||
          new bootstrap.Collapse(navbarCollapse);

        bsCollapse.hide();
      }
    });
  });
});
