// Ana sayfa için JavaScript işlevselliği
document.addEventListener("DOMContentLoaded", function () {
  // Örnek: Abonelik formu gönderimi
  const subscribeForm = document.querySelector(".newsletter form");
  if (subscribeForm) {
    subscribeForm.addEventListener("submit", function (e) {
      e.preventDefault();
      // AJAX ile form gönderimi yapılabilir
      alert("Bültene abone oldunuz!");
    });
  }
});
