// This method is for mark books already on book (first load) with the rigth shelf
export const setShelf = (booksSearched, books) => {
  if (booksSearched.length === 0) {
    return [];
  }
  let newBooksSearched = [];
  for (const bookSearched of booksSearched) {
    let bookFound = _findBook(bookSearched, books);
    _addBookSearched(bookFound, bookSearched, newBooksSearched);
  }
  return newBooksSearched;
};

const _findBook = (bookSearched, books) => {
  for (const book of books) {
    if (book.id === bookSearched.id) {
      return book;
    }
  }
};

const _addBookSearched = (bookFound, bookSearched, newBooksSearched) => {
  if (bookFound) {
    newBooksSearched.push(bookFound);
  } else {
    newBooksSearched.push({ ...bookSearched, shelf: "none" });
  }
};
