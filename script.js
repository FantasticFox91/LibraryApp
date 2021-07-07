// Assign variables
let myLibrary = [];
const addBookBtn = document.getElementById("addBook");
const bookStorage = document.getElementsByClassName("container")[0];

function createNewBookContainer (){
  const bookDiv = document.createElement("div");
  const book = document.createElement("p");
  book.textContent = "This is new book!";
  bookDiv.classList = "book-container";
  bookDiv.appendChild(book);
  bookStorage.appendChild(bookDiv)
}


function addNewBook () {
  const bookDiv = document.createElement("div");
  const para = document.createElement("p")
  bookStorage.appendChild(bookDiv.appendChild(para))
}

addBookBtn.addEventListener("click", createNewBookContainer)



function Book(name,author,pages) {
  // the constructor...
  this.name = name,
  this.author = author,
  this.pages = pages
}

function addBookToLibrary() {
  // do stuff here
}