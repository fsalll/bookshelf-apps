document.addEventListener("DOMContentLoaded", function(){
    const submitBook = document.getElementById("inputBook");

    submitBook.addEventListener("submit", function(event){
        event.preventDefault();
        addBook();
    });
    
    const searchBooks = document.getElementById("searchBook");
    
    searchBooks.addEventListener("submit", function(event){
        event.preventDefault();
        searchBook();
    });

    if(isStorageExist()){
        loadDataFromStorage();
    } 
});

document.addEventListener("ondatasaved", () => {
    console.log("Data berhasil disimpan.");
 });
document.addEventListener("ondataloaded", () => {
    refreshDataFrombooks();
 });

function changeText(){
    const checkbox = document.getElementById("inputBookIsComplete");
    const textSubmit = document.getElementById("textSubmit");

    if(checkbox.checked == true){
        textSubmit.innerText = "Sudah selesai dibaca";
    }else{
        textSubmit.innerText = "Belum selesai dibaca";
    }
};


// ===============================================


const STORAGE_KEY = "BOOK_APPS";
 
let books = [];
 
function isStorageExist() {
   if(typeof(Storage) === undefined){
       alert("Browser anda tidak mendukung local storage");
       return false
   }
   return true;
}

function saveData() {
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event("ondatasaved"));
 }
  
 function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    
    let data = JSON.parse(serializedData);
    
    if(data !== null)
        books = data;
  
    document.dispatchEvent(new Event("ondataloaded"));
 }
  
 function updateDataToStorage() {
    if(isStorageExist())
        saveData();
 }
  
 function composebookObject(title, author, year, isCompleted) {
    return {
        id: +new Date(),
        title,
        author,
        year,
        isCompleted
    };
 }
  
 function findbook(bookId) {
    for(let book of books){
        if(book.id === bookId)
            return book;
    }
    return null;
 }
  
 function findbookIndex(bookId) {
    let index = 0
    for (let book of books) {
        if(book.id === bookId)
            return index;
  
        index++;
    }
    return -1;
 }