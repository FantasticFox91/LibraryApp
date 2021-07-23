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

//Close add book form if clicked outside the from
window.onclick = function (event) {
  if (event.target.className === "formBook") {
    event.target.classList.toggle('hide')
    }
}

//Show the add book form if yoy click Add book button
addBookBtn.onclick = function(){
  addBookForm.classList.toggle("hide")
}

//Hide add book form after close button clicked
closeBtn.onclick = function(){
  addBookForm.classList.toggle("hide")
};

//Clear inputs from user's information
function clearInputs(){
  bookNameInput.value = "";
  authorInput.value = "";
  pages.value = "";
}

// Update local storage 
function transferArrayToLocalStorage(){
  localStorage.setItem("books",JSON.stringify(myLibrary));
  let myLibraryLocalStorage
  myLibraryLocalStorage = JSON.parse(localStorage.getItem("books"));
}

//Clear main container
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}

//Delete clicked book from array
function deleteItemFromArray(event){
  event.path[2].remove();
  let indexItem = event.path[1].dataset.id
  
  updateCounters();
}

//Delete clicked book from local storage
function deleteItemFromLocal(event){
  event.path[2].remove();
  let myLibraryLocalStorage = JSON.parse(localStorage.getItem("books"))
  console.log(1,myLibraryLocalStorage)
  let indexItem = event.path[1].dataset.id
  myLibrary.splice(indexItem,1)
  myLibraryLocalStorage.splice(indexItem,1)
  console.log(2,myLibraryLocalStorage)
  transferArrayToLocalStorage()
  updateCountersLocal();
}

//Update counter in user's infro container from array
function updateCounters (){
  bookCounter.textContent = myLibrary.length;
  bookReadCounter.textContent = myLibrary.filter((el)=> el.read === "read").length;
  bookNotReadCounter.textContent = myLibrary.filter((el)=> el.read === "not read").length;
  pagesRead.textContent = myLibrary.map(el=> el.pages).reduce((a,b)=>Number(a)+Number(b),0)
}

//Update counter in user's infro container from local storage
function updateCountersLocal (){
  let myLibraryLocalStorage = JSON.parse(localStorage.getItem("books"))
  bookCounter.textContent = myLibraryLocalStorage.length;
  bookReadCounter.textContent = myLibraryLocalStorage.filter((el)=> el.read === "read").length;
  bookNotReadCounter.textContent = myLibraryLocalStorage.filter((el)=> el.read === "not read").length;
  pagesRead.textContent = myLibraryLocalStorage.map(el=> el.pages).reduce((a,b)=>Number(a)+Number(b),0)
}



//Update main container according to array
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
        transferArrayToLocalStorage()
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
  
  //Update main container using local storage 
  function updateBookContainersLocal () {
    removeAllChildNodes(bookStorage);
    id = 0;
    let myLibraryLocalStorage = JSON.parse(localStorage.getItem("books"))
    if(myLibraryLocalStorage.length > 0){
     myLibraryLocalStorage.map((el)=>{
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
     )
     deleteBtns = document.querySelectorAll('.deleteBtn');
    deleteBtns.forEach((el)=>el.onclick = deleteItemFromLocal);
    const changeReadStatusBtn = document.querySelectorAll('.readBtn');
    changeReadStatusBtn.forEach((el)=> el.onclick = function(event){
      let indexItem = event.path[2].dataset.id;
      if(myLibraryLocalStorage[indexItem].read === "read"){
        myLibraryLocalStorage[indexItem].read = "not read";
        localStorage.setItem("books",JSON.stringify(myLibraryLocalStorage));
        document.getElementsByClassName('book-container')[indexItem].classList.add('notRead');
        document.querySelectorAll('.book-container p')[indexItem].textContent = `This book is written by ${myLibraryLocalStorage[indexItem].author} with ${myLibraryLocalStorage[indexItem].pages} pages. It is written in ${myLibraryLocalStorage[indexItem].genre} genre and you ${myLibraryLocalStorage[indexItem].read === "read" ? 'read ' : "haven't read "} it`;
        myLibrary = JSON.parse(localStorage.getItem("books"))
        
        }else{
        myLibraryLocalStorage[indexItem].read = "read";
        localStorage.setItem("books",JSON.stringify(myLibraryLocalStorage));
        document.getElementsByClassName('book-container')[indexItem].classList.remove('notRead');
        document.querySelectorAll('.book-container p')[indexItem].textContent = `This book is written by ${myLibraryLocalStorage[indexItem].author} with ${myLibraryLocalStorage[indexItem].pages} pages. It is written in ${myLibraryLocalStorage[indexItem].genre} genre and you ${myLibraryLocalStorage[indexItem].read === "read" ? 'read ' : "haven't read "} it`
        myLibrary = JSON.parse(localStorage.getItem("books"))
       
      }
    })} 
  }
 let i = 0; 


 //Recieve information from add book form
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
  
//Add event listener after form submit
form.addEventListener('submit', getBookinfo)

//Add functionality to menu button(only if screen size less than 810px)
menuBtn.onclick = function(){addBookForm.classList.toggle("hide")};

//Initiante retrieve infromation from local storage on refresh or reopen the page
updateBookContainersLocal();

//Update array from local storage information
myLibrary = JSON.parse(localStorage.getItem("books"));
