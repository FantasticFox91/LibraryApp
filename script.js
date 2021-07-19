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
let bookCounter = document.querySelector("#booksCounter")
let bookReadCounter = document.querySelector("#readCounter");
let bookNotReadCounter = document.querySelector("#notReadCounter");
let pagesRead = document.querySelector('#pagesRead');

let author = "";
let bookName = "";
let id = 0;
let checker = 0;
function Book(id,name,author,pages,genre,read) {
  this.id = id,
  this.name = name,
  this.author = author,
  this.pages = pages,
  this.pages = pages,
  this.genre = genre,
  this.read = read
}

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
}

function updateCounters (){
  bookCounter.textContent = myLibrary.length;
  bookReadCounter.textContent = myLibrary.filter((el)=> el.read === "read").length;
  bookNotReadCounter.textContent = myLibrary.filter((el)=> el.read === "not read").length;
  pagesRead.textContent = myLibrary.map((el)=> Number(el.pages) + Number(pagesRead.textContent));
}

function updateBookContainers () {
     removeAllChildNodes(bookStorage);
      myLibrary.map((el)=>{
        let newDiv = document.createElement("div");
        let bookNameOutput = document.createElement("h2");
        bookNameOutput.textContent = el.name;
        let bookAuthor = document.createElement("p");
        let deleteBtn = document.createElement("button");
        deleteBtn.classList.add("deleteBtn")
        deleteBtn.textContent = "Delete it"
        bookAuthor.textContent =`This book is written by ${el.author} with ${el.pages} pages. It is written in ${el.genre} genre and you ${el.read === "read" ? 'read ' : "haven't read "} it`;
        newDiv.appendChild(bookNameOutput);
        newDiv.appendChild(bookAuthor);
        deleteBtn.setAttribute('data-id', `${id}`)
        newDiv.appendChild(deleteBtn);
        newDiv.classList.add("book-container");
        newDiv.setAttribute('data-id', `${id}`)
        bookStorage.appendChild(newDiv)
        id++
        updateCounters();
      })
      
      id=0;
    deleteBtns = document.querySelectorAll('.deleteBtn');
    deleteBtns.forEach((el)=>el.onclick = deleteItemFromArray)
  }
    
   


// определить индекс в массиве кликнутого элемента
// вызвать функцию меняющую глобальную переменную(удаляет оттуда массив с кликнутым индексом)
  

getBookinfo = () =>{
  if(bookNameInput.value === "" || authorInput.value === "" || pages.value === ""){
    alert("Please fill required fields. Check if you wrote them in English")  
  }else{
  let bName = document.querySelector('#bname').value;
  let aName = document.querySelector('#author').value;
  let pages = document.querySelector('#pages').value;
  let genre = document.querySelector('#genres').value;
  let read = document.querySelector('#read').value
  let a = new Book (id,bName,aName, pages, genre, read)
   myLibrary.push(a)
  clearInputs()
  addBookForm.classList.toggle("hide");
  updateBookContainers();
  }
};

menuBtn.onclick = function(){addBookForm.classList.toggle("hide")};
