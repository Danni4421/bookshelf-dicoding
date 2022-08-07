const buttonAdd = document.getElementsByClassName('button-add')[0];
const theBook = document.getElementsByClassName('addBook')[0];
const form = document.getElementById('book-input');
const formContainer = document.getElementsByClassName('book-input')[0];
const input = document.querySelectorAll('.input input');

function inputValueDeleted() {
    if (input != null) {
        for (i = 0; i < input.length; i++) {
            input[i].value = '';
        }
    }
}

buttonAdd.addEventListener('click', function () {
    buttonAdd.classList.toggle('on');
    theBook.style.height = '900px';
    form.classList.toggle('appear');

    if (buttonAdd.classList.contains('on')) {
        buttonAdd.innerHTML = '<h3>Ngga Jadi</h3>';
    } else {
        buttonAdd.innerHTML = '<h3>Tambah Buku</h3>';
        inputValueDeleted();
        theBook.style.height = '450px';
    }
});

const inputName = document.getElementById('input-name');
const greetingTXT = document.getElementsByClassName('greeting-txt')[0];
inputName.addEventListener('submit', function (e) {
    greetingTXT.innerHTML = e.target.value;
});