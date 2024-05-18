// Select elements
let form = document.querySelector("#book-form");
let bookList = document.querySelector("#book-list");

// Add event listeners
form.addEventListener('submit', addBook);
document.addEventListener('DOMContentLoaded', displayBooks);
bookList.addEventListener('click', removeBook);

// Book class
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// Display books list
function displayBookList(book) {
    let list = document.querySelector("#book-list");
    let row = document.createElement('tr');
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href='#' class="delete">X</a></td>
    `;
    list.appendChild(row);
}

// Display all books from local storage
function displayBooks() {
    let books = Store.getBooks();
    books.forEach(book => displayBookList(book));
}

// Show alert
function showAlert(message, className) {
    let div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    let container = document.querySelector('.container');
    let form = document.querySelector("#book-form");
    container.insertBefore(div, form);

    setTimeout(() => {
        document.querySelector(`.alert`).remove();
    }, 2000);
}

// Delete book from list
function deleteFromBook(target) {
    if (target.classList.contains('delete')) {
        // Get ISBN of the book to be deleted
        const isbn = target.parentElement.previousElementSibling.textContent.trim();
        
        // Remove the book from the UI
        target.parentElement.parentElement.remove();
        
        // Remove the book from local storage
        Store.removeBook(isbn);
        
        // Show alert
        showAlert("Book Removed", 'success');
    }
}

// Local storage class
class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBook(book) {
        let books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        let books = Store.getBooks();
        books = books.filter(book => book.isbn !== isbn);
        localStorage.setItem('books', JSON.stringify(books));
    }
}

// Add new book
function addBook(e) {
    e.preventDefault();

    let title = document.querySelector("#title").value;
    let author = document.querySelector("#author").value;
    let isbn = document.querySelector("#isbn").value;

    // Validation
    if (title === '' || author === '' || isbn === '') {
        showAlert("Please fill all the fields!", "error");
    } else {
        let book = new Book(title, author, isbn);
        displayBookList(book);

        // Clear fields
        document.querySelector("#title").value = '';
        document.querySelector("#author").value = '';
        document.querySelector("#isbn").value = '';

        showAlert("Successfully Added The Book!", "success");

        // Add book to local storage
        Store.addBook(book);
    }
}

// Remove book from the list
function removeBook(e) {
    e.preventDefault();
    deleteFromBook(e.target);
}





