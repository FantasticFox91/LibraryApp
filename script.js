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
const form = document.querySelector('#addBookForm');


``
let deleteBtns = document.querySelectorAll('.deleteBtn');
let bookCounter = document.querySelector("#booksCounter")
let bookReadCounter = document.querySelector("#readCounter");
let bookNotReadCounter = document.querySelector("#notReadCounter");
let pagesRead = document.querySelector('#pagesRead');
let result = 0;

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
  event.path[2].remove();
  let indexItem = event.path[1].dataset.id
  myLibrary.splice(indexItem,1)
}

function updateCounters (){
  bookCounter.textContent = myLibrary.length;
  bookReadCounter.textContent = myLibrary.filter((el)=> el.read === "read").length;
  bookNotReadCounter.textContent = myLibrary.filter((el)=> el.read === "not read").length;
  pagesRead.textContent = myLibrary.map(el=> el.pages).reduce((a,b)=>Number(a)+Number(b),0)
}

function updateBookContainers () {
     removeAllChildNodes(bookStorage);
     id = 0; 
      myLibrary.map((el)=>{
        let newDiv = document.createElement("div");
        let bookNameOutput = document.createElement("h2");
        let bookAuthor = document.createElement("p");
        let deleteBtn = document.createElement("button");
        let readBtn = document.createElement("button");
        let divBtn = document.createElement("div");

        divBtn.classList.add("book-container-btns");
        readBtn.classList.add("readBtn");
        deleteBtn.classList.add("deleteBtn");
        deleteBtn.setAttribute('data-id', `${id}`)
        if(el.read === "read"){
          newDiv.classList.add('book-container');
        }else{
          newDiv.classList.add('book-container');
          newDiv.classList.add('notRead');
        }
        
        newDiv.setAttribute('data-id', `${id}`)

        bookNameOutput.textContent = el.name;
        readBtn.textContent = "Δ";
        deleteBtn.textContent = "╳";
        bookAuthor.textContent =`This book is written by ${el.author} with ${el.pages} pages. It is written in ${el.genre} genre and you ${el.read === "read" ? 'read ' : "haven't read "} it`;
        

        divBtn.appendChild(readBtn);
        divBtn.appendChild(deleteBtn);
        newDiv.appendChild(bookNameOutput);
        newDiv.appendChild(bookAuthor);
        newDiv.appendChild(divBtn);
        bookStorage.appendChild(newDiv)
        
        id++
        updateCounters();
      }
      )
     
      
    deleteBtns = document.querySelectorAll('.deleteBtn');
    deleteBtns.forEach((el)=>el.onclick = deleteItemFromArray);
    const changeReadStatusBtn = document.querySelectorAll('.readBtn');
    changeReadStatusBtn.forEach((el)=> el.onclick = function(event){
      let indexItem = event.path[2].dataset.id;
      if(myLibrary[indexItem].read === "read"){
        myLibrary[indexItem].read = "not read";
        document.getElementsByClassName('book-container')[indexItem].classList.add('notRead');
        document.querySelectorAll('.book-container p')[indexItem].textContent = `This book is written by ${myLibrary[indexItem].author} with ${myLibrary[indexItem].pages} pages. It is written in ${myLibrary[indexItem].genre} genre and you ${myLibrary[indexItem].read === "read" ? 'read ' : "haven't read "} it`
        }else{
        myLibrary[indexItem].read = "read"
        document.getElementsByClassName('book-container')[indexItem].classList.remove('notRead');
        document.querySelectorAll('.book-container p')[indexItem].textContent = `This book is written by ${myLibrary[indexItem].author} with ${myLibrary[indexItem].pages} pages. It is written in ${myLibrary[indexItem].genre} genre and you ${myLibrary[indexItem].read === "read" ? 'read ' : "haven't read "} it`
      }
      
    })
  }
  
  
  
   


// определить индекс в массиве кликнутого элемента
// вызвать функцию меняющую глобальную переменную(удаляет оттуда массив с кликнутым индексом)
 let i = 0; 

function getBookinfo (e) {
  e.preventDefault();
  if(bookNameInput.value === "" || authorInput.value === "" || pages.value === ""){
    alert("Please fill required fields. Check if you wrote them in English")  
  }else{
  let bName = document.querySelector('#bname').value;
  let aName = document.querySelector('#author').value;
  let pages = document.querySelector('#pages').value;
  let genre = document.querySelector('#genres').value;
  let read = document.querySelector('#readStatusValue').value
  let a = new Book (id,bName,aName, pages, genre, read)
   myLibrary.push(a)
   localStorage.setItem(`book${i}`, JSON.stringify(a))
   i++
  clearInputs()
  addBookForm.classList.toggle("hide");
  updateBookContainers();
  }
}


form.addEventListener('submit', getBookinfo)
menuBtn.onclick = function(){addBookForm.classList.toggle("hide")};
