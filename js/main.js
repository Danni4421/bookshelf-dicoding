window.addEventListener('DOMContentLoaded', function () {
    const submitForm = document.getElementById('book-input');
    submitForm.addEventListener('submit', function (e) {
        e.preventDefault();
        addBook();
    });
});

function addBook() {
    const titleValue = document.getElementById('input-title').value;
    const authorValue = document.getElementById('input-author').value;
    const yearValue = document.getElementById('input-year').value;
    const dateValue = document.getElementById('input-date').value;
    const checkboxValue = document.getElementById('input-checkbox').checked;

    const checkboxCompleted = didCompleted(checkboxValue);

    function didCompleted(value) {
        if (value) {
            return true;
        } else {
            return false;
        }
    }

    const generateID = generateId();
    const bookObject = generateBookObject(generateID, titleValue, authorValue, yearValue, dateValue, checkboxCompleted);
    books.push(bookObject);

    document.dispatchEvent(new Event(RENDER_BOOK));
    saveData();
}

function generateId() {
    return +new Date();
}

const generateBookObject = (id, title, author, year, date, isCompleted) => {
    return {
        id,
        title,
        author,
        year,
        date,
        isCompleted
    }
}

const books = [];
const RENDER_BOOK = 'render-book';

document.addEventListener(RENDER_BOOK, function () {
    const bookNotCompleted = document.getElementById('book-not-completed');
    bookNotCompleted.innerHTML = '';
    const bookCompleted = document.getElementById('book-completed');
    bookCompleted.innerHTML = '';

    for (const bookItem of books) {
        const bookElement = createBook(bookItem);
        if (!bookItem.isCompleted) {
            bookNotCompleted.append(bookElement);
        } else {
            bookCompleted.append(bookElement);
        }
    }
});

function createBook(bookObject) {
    const bookTitle = document.createElement('h3');
    bookTitle.innerText = bookObject.title;
    bookTitle.classList.add('title');
    const bookAuthor = document.createElement('p');
    bookAuthor.innerText = bookObject.author;
    const bookYear = document.createElement('p');
    bookYear.innerText = bookObject.year;
    const bookDate = document.createElement('div');
    bookDate.classList.add('bookDate');
    const detailContainer = document.createElement('div');
    detailContainer.classList.add('detail');
    detailContainer.append(bookTitle, bookAuthor, bookYear, bookDate);
    const container = document.createElement('div');
    container.classList.add('container');
    container.append(detailContainer);

    if (bookObject.isCompleted) {
        const bookDateCompleted = document.createElement('b');
        const subBookDate = document.createElement('sub');
        bookDateCompleted.style.color = 'var(--success)';
        bookDateCompleted.innerText = 'Sudah Baca';
        subBookDate.innerHTML = '<b>Pada: </b>' + bookObject.date;
        bookDate.append(bookDateCompleted, subBookDate);

        const undoBtn = document.createElement('button');
        const trashBtn1 = document.createElement('button');

        undoBtn.classList.add('baca-lagi');
        undoBtn.classList.add('btn');
        undoBtn.innerText = 'Baca Lagi';
        trashBtn1.classList.add('hapus-buku');
        trashBtn1.classList.add('btn');
        trashBtn1.innerText = 'Hapus Buku';

        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');
        buttonContainer.append(undoBtn, trashBtn1);
        container.append(buttonContainer);

        undoBtn.addEventListener('click', function () {
            addToNotCompleted(bookObject.id);
        });

        trashBtn1.addEventListener('click', function () {
            deleteBook(bookObject.id);
        });
    } else {
        const bookDateCompleted = document.createElement('b');
        const subBookDate = document.createElement('sub');
        bookDateCompleted.style.color = 'var(--primary)';
        bookDateCompleted.innerText = 'Belum Baca';
        subBookDate.innerHTML = '<b>Segera baca terakhir pada tanggal: </b>' + bookObject.date;
        bookDate.append(bookDateCompleted, subBookDate);

        const doneBtn = document.createElement('button');
        const trashBtn2 = document.createElement('button');

        doneBtn.classList.add('sudah-baca');
        doneBtn.innerText = 'Sudah Baca';
        doneBtn.classList.add('btn');
        trashBtn2.classList.add('hapus-buku');
        trashBtn2.innerText = 'Hapus Buku';
        trashBtn2.classList.add('btn');

        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');
        buttonContainer.append(doneBtn, trashBtn2);
        container.append(buttonContainer);

        doneBtn.addEventListener('click', function () {
            addToCompleted(bookObject.id);
        });

        trashBtn2.addEventListener('click', function () {
            deleteBook(bookObject.id);
        });
    }

    return container;
}

function deleteBook(id) {
    const bookTarget = findBookIndex(id);

    if (bookTarget === -1);
    books.splice(bookTarget, 1);

    document.dispatchEvent(new Event(RENDER_BOOK));
    saveData();
}

function findBookIndex(id) {
    for (const index in books) {
        if (books[index].id === id) {
            return index;
        }
    }

    return -1;
}

function addToCompleted(id) {
    const bookTarget = findId(id);

    if (bookTarget == null) return;

    bookTarget.isCompleted = true;
    document.dispatchEvent(new Event(RENDER_BOOK));
    saveData();
}

function addToNotCompleted(id) {
    const bookTarget = findId(id);

    if (bookTarget == null) return;

    bookTarget.isCompleted = false;
    document.dispatchEvent(new Event(RENDER_BOOK));
    saveData();
}

function findId(id) {
    for (const bookItem of books) {
        if (bookItem.id === id) {
            return bookItem;
        }
    }

    return null;
}