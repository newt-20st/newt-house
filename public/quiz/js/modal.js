function modalbtn() {
    if (document.getElementById('modal').style.display == "none") {
        document.getElementById('modal').style.display = "block";
        document.getElementById('modalbtn').setAttribute('src', 'img/modal-btn-close.png');
    } else {
        document.getElementById('modal').style.display = "none";
        document.getElementById('modalbtn').setAttribute('src', 'img/modal-btn.png');
    }
}