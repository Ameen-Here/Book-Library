const library = document.querySelector(".library");
const button = document.querySelector(".add-btn");
const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];

const addBtn = document.querySelector(".modal-btn");

const myLibrary = [
  { author: "Tom Holland", title: "Spiderman", year: 2016 },
  { author: "Tom hidleston", title: "Loki", year: 2012 },
  { author: "J K Rowling", title: "Harry potter", year: 2006 },
  { author: "Jack", title: "Rose", year: 1995 },
];

let deleteBtns;

function Book(title, author, year) {
  (this.author = author), (this.title = title), (this.year = year);
}

function Helper() {}

Helper.prototype.addBookToLibrary = function () {
  myLibrary.push(this);
};

Helper.prototype.readStatus = false;

Book.prototype = Object.create(Helper.prototype);

const book1 = new Book("jack sparrow", "Amber Heard", 2022);

const book2 = new Book("sadsa", "asdsa", 222);

book1.addBookToLibrary();

book2.addBookToLibrary();

function updateLibrary() {
  library.textContent = "";
  for (let index = 0; index < myLibrary.length; index++) {
    const book = myLibrary[index];
    const html = `
        <div class="book">
        <h3>Title: ${book.title}</h3>
        <h4>Author: ${book.author}</h3>
        <p>Year: ${book.year}</p>
        <div>
        <label class="toggle">
        <input type="checkbox">
        <span class="slider"></span>
        <span class="labels" data-on="READ" data-off="UNREAD"></span>
     </label>
     </div>
        <button data-index="${index}" class="delete"> Remove the book</button>
     
        </div>
        `;
    library.insertAdjacentHTML("beforeend", html);
  }
  deleteBtns = document.querySelectorAll(".delete");

  deleteBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      myLibrary.splice(index, 1);
      updateLibrary();
    });
  });
}

button.addEventListener("click", () => {
  modal.style.display = "block";
});

span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const newTitle = document.getElementById("title").value;
  const newAuthor = document.getElementById("author").value;
  const newYear = document.getElementById("year").value;

  if (newTitle && newAuthor && newYear) {
    modal.style.display = "none";
    const newBook = new Book(newTitle, newAuthor, newYear);
    newBook.addBookToLibrary();
    updateLibrary();
    document.getElementById("year").value = "";
    document.getElementById("author").value = "";
    document.getElementById("title").value = "";
  }
});

updateLibrary();
