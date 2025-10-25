const scriptURL = 'https://script.google.com/macros/s/AKfycbyWktsOKCUXuV8VctcmEpOShKpH3Y-UOZ0g9U_GpccLL_E2otivLegIy0qba64ZaKpL2w/exec';
const form = document.getElementById('peminjamanBuku');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  navigator.sendBeacon(scriptURL, new URLSearchParams(formData));

  window.location.href = 'ty.html';
});