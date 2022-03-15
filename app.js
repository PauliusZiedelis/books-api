//https://in3.dev/knygos/
//https://in3.dev/knygos/types/

fetch("https://in3.dev/knygos/")
  .then((books) => books.json())
  .then((books) => {
    let booksTypesList = localStorage.getItem("books types");
    if (booksTypesList != null) {
      booksTypesList = JSON.parse(booksTypesList);
      const booksList = booksListWithType(books, booksTypesList);
      createHtmlElements(booksList, true);
      console.log(booksList);
    } else {
      createHtmlElements(books, false);
      fetch("https://in3.dev/knygos/types/")
        .then((books) => books.json())
        .then((books) => {
          localStorage.setItem("books types", JSON.stringify(books));
          addBookCategoryLater(books);
        });
    }
  });
function createHtmlElements(booksList, hasCategory) {
  const booksDiv = document.querySelector("#books");
  booksList.forEach((book) => {
    const newBook = document.createElement("div");
    newBook.setAttribute("id", book.id);
    newBook.setAttribute("class", "book");
    const bookImg = createBookCover(book.img, book.title);
    newBook.appendChild(bookImg);
    const bookTitle = createBookTitle(book.title);
    newBook.appendChild(bookTitle);
    const bookCategory = createBookCategory(book.type, hasCategory);
    newBook.appendChild(bookCategory);
    const bookAuthor = createBookAuthor(book.author);
    newBook.appendChild(bookAuthor);
    const bookPrice = createBookPrice(book.price);
    newBook.appendChild(bookPrice);

    booksDiv.appendChild(newBook);
  });
}

function booksListWithType(booksList, booksTypesList) {
  for (let i = 0; i < booksList.length; i++) {
    const bookTypeId = booksList[i].type;
    booksList[i].type = bookType(bookTypeId, booksTypesList);
  }
  return booksList;
}

function bookType(bookTypeId, booksTypesList) {
  for (let i = 0; i < booksTypesList.length; i++) {
    if (booksTypesList[i].id == bookTypeId) {
      return booksTypesList[i].title;
    }
  }
  return "Nenurodytas";
}

function createBookCover(src, alt) {
  const bookImg = document.createElement("img");
  bookImg.setAttribute("src", src);
  bookImg.setAttribute("width", "286");
  bookImg.setAttribute("height", "419");
  bookImg.setAttribute("alt", alt);
  return bookImg;
}

function createBookTitle(title) {
  const bookTitle = document.createElement("h2");
  bookTitle.innerText = title;
  return bookTitle;
}

function createBookCategory(category, hasCategory) {
  const bookCategory = document.createElement("p");
  bookCategory.innerText = hasCategory
    ? `Knygos žanras: ${category}`
    : `Knygos žanras: Kraunasi...`;
  return bookCategory;
}

function createBookAuthor(author) {
  const bookAuthor = document.createElement("p");
  bookAuthor.innerText = "Knygą parašė: " + author;
  return bookAuthor;
}

function createBookPrice(price) {
  const bookPrice = document.createElement("p");
  bookPrice.innerText = `Kaina: ${price} \u20AC`;
  return bookPrice;
}

function addBookCategoryLater(booksTypesList) {
  const booksList = document.querySelectorAll(".book");
  booksList.forEach((bookDOM) => {
    bookDOM.childNodes[2].innerText = bookType(bookDOM.id, booksTypesList);
  });
}
