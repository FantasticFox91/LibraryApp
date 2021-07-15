// Assign variables
let myLibrary = [];

const bookStorage = document.getElementsByClassName("container")[0];
const menuBtn = document.querySelector("#menu");
const bookNameInput = document.querySelector("#bname");
const authorInput = document.querySelector("#author");
const addBookBtn = document.querySelector("#addBook");
const startContainer = document.querySelector(".book-container-start");
const addBookTo = document.querySelector("#addBookToContainer");
const addBookForm = document.querySelector(".formBook");
const closeBtn = document.querySelector('.closeBtn');
const formBtn = document.querySelector('#addBookBtn');
const pages = document.querySelector('#pages');
let author = "";
let bookName = "";


function Book(name,author,pages) {
  // the constructor...
  this.name = name,
  this.author = author,
  this.pages = pages
}

function addBookToLibrary() {
  // do stuff here
}

window.onclick = function (event) {
  if (event.target.className === "formBook") {
    event.target.classList.toggle('hide')
    }
}



// addBookTo.onclick = function(){
//   startContainer.classList.add("hide")
//   let newDiv = document.createElement("div");
//   let bookNameOutput = document.createElement("p");
//   bookNameOutput.textContent = bookName;
//   let bookAuthor = document.createElement("p");
//   bookAuthor.textContent = author;
//   newDiv.appendChild(bookNameOutput);
//   newDiv.appendChild(bookAuthor);
//   newDiv.classList.add("book-container");
//   bookStorage.appendChild(newDiv)
// }

addBookBtn.onclick = function(){
  addBookForm.classList.toggle("hide")
}

closeBtn.onclick = function(){
  addBookForm.classList.toggle("hide")
};

function clearInputs(){
  bookNameInput.value = "";
  authorInput.value = "";
  pages.value = "";
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}

function createBookContainer(){
  let newDiv = document.createElement("div");
  let bookNameOutput = document.createElement("p");
  bookNameOutput.textContent = myLibrary[myLibrary.length - 1].bookName;
  let bookAuthor = document.createElement("p");
  bookAuthor.textContent = myLibrary[myLibrary.length - 1].author;
  newDiv.appendChild(bookNameOutput);
  newDiv.appendChild(bookAuthor);
  newDiv.classList.add("book-container");
  bookStorage.appendChild(newDiv)
}



function updateBookContainers () {
     removeAllChildNodes(bookStorage);
    myLibrary.map((el)=>{
      let newDiv = document.createElement("div");
      let bookNameOutput = document.createElement("p");
      bookNameOutput.textContent = el.bookName;
      let bookAuthor = document.createElement("p");
      bookAuthor.textContent = el.author;
      newDiv.appendChild(bookNameOutput);
      newDiv.appendChild(bookAuthor);
      newDiv.classList.add("book-container");
      bookStorage.appendChild(newDiv)
    })
};

getBookinfo = () =>{
  let bName = document.querySelector('#bname').value;
  let aName = document.querySelector('#author').value;
  let pages = document.querySelector('#pages').value;
  let genre = document.querySelector('#genres').value;
  let readYesNo = document.querySelector('#read').value
  let a = {
    bookName : bName,
    author: aName,
    pages: pages,
    genre : genre,
    read: readYesNo
  }
  myLibrary.push(a)
  clearInputs()
  addBookForm.classList.toggle("hide");
  updateBookContainers();
};

menuBtn.onclick = function(){addBookForm.classList.toggle("hide");}

// formBtn.onclick = function () {
//   getBookinfo();
// } 