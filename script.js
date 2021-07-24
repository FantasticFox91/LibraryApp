// Assign variables
let myLibrary = [];

const bookStorage = document.getElementsByClassName("container")[0];
const menuBtn = document.querySelector("#menu");
const bookNameInput = document.querySelector("#bname");
const authorInput = document.querySelector("#author");
const addBookBtn = document.querySelector("#addBook");
const addBookForm = document.querySelector(".formBook");
const closeBtn = document.querySelector('.closeBtn');
const formBtn = document.querySelector('#addBookBtn');
const pages = document.querySelector('#pages');
const form = document.querySelector('#addBookForm');

let deleteBtns = document.querySelectorAll('.deleteBtn');
let bookCounter = document.querySelector("#booksCounter")
let bookReadCounter = document.querySelector("#readCounter");
let bookNotReadCounter = document.querySelector("#notReadCounter");
let pagesRead = document.querySelector('#pagesRead');

let index = 0;
let id = 0;


//Create constructor for future book objects

function Book(id,name,author,pages,genre,read) {
  this.id = id,
  this.name = name,
  this.author = author,
  this.pages = pages,
  this.pages = pages,
  this.genre = genre,
  this.read = read
}

//Functions

//Toggle .hide class for add book form
let hideAddBookForm = () => addBookForm.classList.toggle("hide");

//Clear inputs from user's information
let clearInputs = () =>{
  bookNameInput.value = "";
  authorInput.value = "";
  pages.value = "";
}

// Update local storage 
let updateLocalStorage = () =>localStorage.setItem("books",JSON.stringify(myLibrary));

//Clear main container
let removeAllChildNodes = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

//Delete clicked book from array
let deleteItemFromArray = (event) => {
  event.path[2].remove();
  let indexItem = event.path[1].dataset.id
  updateCountersLocal();
}

//Delete clicked book from local storage
let deleteItemFromLocal = (event) =>{
  event.path[2].remove();
  let indexItem = event.path[1].dataset.id
  myLibrary.splice(indexItem,1)
  updateLocalStorage();
  updateCountersLocal();
}

//Update counter in user's infro container from local storage
let updateCountersLocal = () => {
  let myLibraryLocalStorage = JSON.parse(localStorage.getItem("books"))
  bookCounter.textContent = myLibraryLocalStorage.length;
  bookReadCounter.textContent = myLibraryLocalStorage.filter((el)=> el.read === "read").length;
  bookNotReadCounter.textContent = myLibraryLocalStorage.filter((el)=> el.read === "not read").length;
  pagesRead.textContent = myLibraryLocalStorage.map(el=> el.pages).reduce((a,b)=>Number(a)+Number(b),0)
}

let createBookContainer = (el) =>{
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
  updateCountersLocal();
}

let changeReadStatus = (event) =>{
  let indexItem = event.path[2].dataset.id;
  if(myLibrary[indexItem].read === "read"){
    myLibrary[indexItem].read = "not read";
    localStorage.setItem("books",JSON.stringify(myLibrary));
    document.getElementsByClassName('book-container')[indexItem].classList.add('notRead');
    document.querySelectorAll('.book-container p')[indexItem].textContent = `This book is written by ${myLibrary[indexItem].author} with ${myLibrary[indexItem].pages} pages. It is written in ${myLibrary[indexItem].genre} genre and you ${myLibrary[indexItem].read === "read" ? 'read ' : "haven't read "} it`;
    myLibrary = JSON.parse(localStorage.getItem("books"))
    updateCountersLocal(); 
    }else{
      myLibrary[indexItem].read = "read";
      localStorage.setItem("books",JSON.stringify(myLibrary));
      document.getElementsByClassName('book-container')[indexItem].classList.remove('notRead');
      document.querySelectorAll('.book-container p')[indexItem].textContent = `This book is written by ${myLibrary[indexItem].author} with ${myLibrary[indexItem].pages} pages. It is written in ${myLibrary[indexItem].genre} genre and you ${myLibrary[indexItem].read === "read" ? 'read ' : "haven't read "} it`
      myLibrary = JSON.parse(localStorage.getItem("books"))
      updateCountersLocal(); 
  }
  
} 

//Update main container using local storage 

function updateBookContainersLocal () {
     
    removeAllChildNodes(bookStorage);
    id = 0;
    myLibrary = JSON.parse(localStorage.getItem("books"))
    
    

    if(myLibrary.length > 0){
     myLibrary.map((el)=>createBookContainer(el))
    }

    deleteBtns = document.querySelectorAll('.deleteBtn');
    deleteBtns.forEach((el)=>el.onclick = deleteItemFromLocal);

    const changeReadStatusBtn = document.querySelectorAll('.readBtn');
    changeReadStatusBtn.forEach((el)=> el.onclick = changeReadStatus)
  
  } 

  //Recieve information from add book form
function getBookinfo (e) {
  e.preventDefault();
  let bName = document.querySelector('#bname').value;
  let aName = document.querySelector('#author').value;
  let pages = document.querySelector('#pages').value;
  let genre = document.querySelector('#genres').value;
  let read = document.querySelector('#readStatusValue').value
  let a = new Book (id,bName,aName, pages, genre, read)
  myLibrary.push(a)
  localStorage.setItem(`book${index}`, JSON.stringify(a))
  updateLocalStorage()
  index++
  clearInputs()
  hideAddBookForm()
  updateBookContainersLocal();
}
  


//Event listeners

//Close add book form if clicked outside the from
window.onclick = (event) => (event.target.className === "formBook") ? event.target.classList.toggle('hide') : "";

//Show the add book form if yoy click Add book button
addBookBtn.onclick = () => hideAddBookForm();

//Hide add book form after close button clicked
closeBtn.onclick = () => hideAddBookForm();

//Add event listener after form submit
form.addEventListener('submit', getBookinfo)

//Add functionality to menu button(only if screen size less than 810px)
menuBtn.onclick = () => hideAddBookForm();

//On load

//Initiante retrieve infromation from local storage on refresh or reopen the page
updateBookContainersLocal();

//Update array from local storage information
myLibrary = JSON.parse(localStorage.getItem("books"));
