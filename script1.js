const scriptURL = 'https://script.google.com/macros/s/AKfycbz-i5rkEL9yMsGvcvQ7Y1_y4Vc0HtaVegT5vP5HGAPUV8u3HXoykF4k6RohD318hQDziQ/exec';
const form = document.getElementById('literasi');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  navigator.sendBeacon(scriptURL, new URLSearchParams(formData));

  window.location.href = 'jumat.html';
});
