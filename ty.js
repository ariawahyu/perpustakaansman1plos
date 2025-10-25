
function getUrlParameter(name) {
name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
var results = regex.exec(location.search);
return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

document.getElementById('btn-home').addEventListener('click', function() {
  window.location.href = 'index.html'; 
});

document.getElementById('btn-pinjam-lagi').addEventListener('click', function() {
  window.location.href = 'index2.html';

});
