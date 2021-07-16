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
let deleteBtns = document.querySelectorAll('.deleteBtn');

let author = "";
let bookName = "";
let id = 0;
let checker = 0;
// function Book(name,author,pages) {
//   // the constructor...
//   this.name = name,
//   this.author = author,
//   this.pages = pages
// }

// function addBookToLibrary() {
//   // do stuff here
// }

window.onclick = function (event) {
  if (event.target.className === "formBook") {
    event.target.classList.toggle('hide')
    }
}

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

function deleteItemFromArray(event){
  event.path[1].remove()
  let indexItem = event.path[1].dataset.id
  myLibrary.splice(indexItem,1)
  console.log(indexItem,myLibrary)
  
  // let deleteItemIndex = event.path[1].dataset.id;
  // console.log(deleteItemIndex)
  // myLibrary = myLibrary.filter((item)=> item.id !== deleteItemIndex);
  // event.path[1].remove()
}

function updateBookContainers () {
     removeAllChildNodes(bookStorage);
      myLibrary.map((el)=>{
        let newDiv = document.createElement("div");
        let bookNameOutput = document.createElement("h2");
        bookNameOutput.textContent = el.bookName;
        let bookAuthor = document.createElement("p");
        let deleteBtn = document.createElement("button");
        deleteBtn.classList.add("deleteBtn")
        deleteBtn.textContent = "Delete it"
        bookAuthor.textContent =`This is book written by ${el.author} with ${el.pages} pages. It is written in ${el.genre} genre and you ${el.read === "read" ? 'read ' : "haven't read "} it`;
        newDiv.appendChild(bookNameOutput);
        newDiv.appendChild(bookAuthor);
        deleteBtn.setAttribute('data-id', `${id}`)
        newDiv.appendChild(deleteBtn);
        newDiv.classList.add("book-container");
        newDiv.setAttribute('data-id', `${id}`)
        bookStorage.appendChild(newDiv)
        id++
      })
      id=0;
    deleteBtns = document.querySelectorAll('.deleteBtn');
    deleteBtns.forEach((el)=>el.onclick = deleteItemFromArray)
  }
   


// определить индекс в массиве кликнутого элемента
// вызвать функцию меняющую глобальную переменную(удаляет оттуда массив с кликнутым индексом)
  

getBookinfo = () =>{
  let bName = document.querySelector('#bname').value;
  let aName = document.querySelector('#author').value;
  let pages = document.querySelector('#pages').value;
  let genre = document.querySelector('#genres').value;
  let readYesNo = document.querySelector('#read').value
  let a = {
    id:id,
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

menuBtn.onclick = function(){addBookForm.classList.toggle("hide")};
