const checkStorageCompatible = isCompatible();
const SAVED_EVENT_DATA = "saved-book";
const STORAGE_KEY = "books";


function isCompatible() {
    if (typeof (Storage) === 'undefined') {
        console.log('Maaf browser Anda tidak support fitur Web Storage!!');
        return false;
    } else {
        return true;
    }
}

function saveData() {
    if (isCompatible) {
        const parse = JSON.stringify(books);
        localStorage.setItem(STORAGE_KEY, parse);

        document.dispatchEvent(new Event(SAVED_EVENT_DATA));
    }
}

document.addEventListener(SAVED_EVENT_DATA, function () {
    console.log('data anda berhasil disimpan');
});

const saveSearch = document.getElementById('saveSearch');
const bookSearch = document.getElementById('form-input-search');
saveSearch.addEventListener('click', function () {
    const searchString = bookSearch.value.toLowerCase();

    const filteredBook = books.filter(function (char) {
        return (
            char.title.toLowerCase().includes(searchString)
        );
    });

    bookSearchValue(filteredBook);
});

function bookSearchValue(data) {
    for (const item of data) {
        createSearchBookValue(item);
    }
}


function createSearchBookValue(data) {
    const bookTitle = document.createElement('h3');
    bookTitle.innerText = data.title;
    bookTitle.classList.add('title');
    const bookAuthor = document.createElement('p');
    bookAuthor.innerText = data.author;
    const bookYear = document.createElement('p');
    bookYear.innerText = data.year;
    const bookDetail = document.createElement('b');

    if (!data.isCompleted) {
        bookDetail.innerHTML = '<b style="color: var(--primary);">Belum Baca</b> <br> <p style="font-size: 0.8em;">Deadline: ' + data.date + '</p>';
    } else {
        bookDetail.innerText = 'Sudah Dibaca';
        bookDetail.style.color = 'var(--success)';
    }

    const detail = document.createElement('div');
    detail.classList.add('detail');
    detail.append(bookAuthor, bookYear, bookDetail);

    const container = document.createElement('div');
    container.classList.add('container')
    container.append(bookTitle, detail);

    const filteredBookResults = document.getElementsByClassName('filteredBook')[0];
    filteredBookResults.classList.add('initial');
    const bookContainer = document.getElementById('bookContainer');
    bookContainer.append(container);

    const btnClose = document.getElementsByClassName('x')[0];
    btnClose.addEventListener('click', function () {
        bookSearch.value = '';
        filteredBookResults.classList.remove('initial');
        bookContainer.innerHTML = '';
    });
}

function loadDataFromStorage() {
    const serialized = localStorage.getItem(STORAGE_KEY);
    let bookData = JSON.parse(serialized);

    if (bookData !== null) {
        for (const bookItem of bookData) {
            books.push(bookItem);
        }
    }


    document.dispatchEvent(new Event(RENDER_BOOK));
}

loadDataFromStorage();