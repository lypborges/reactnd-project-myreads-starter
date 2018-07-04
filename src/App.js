import React, { Component } from "react";
import BookSearch from "./ui/routes/BookSearch";
import BookList from "./ui/routes/BookList";
import * as BooksAPI from "./BooksAPI";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { debounce } from "throttle-debounce";
import "./App.css";

class BooksApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      books: [],
      booksSearched: [],
      isLoading: false
    };

    this._searchDebounced = debounce(500, this._makeSearch);
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books });
    });
  }

  handleShelfChangeList = (shelf, book) => {
    BooksAPI.update(book, shelf).then(changedBook => {
      const filteredBooks = this.state.books.filter(
        item => item.id !== book.id
      );
      const newBooks = [...filteredBooks, Object.assign({}, book, { shelf })];
      this.setState({ books: newBooks });
    });
  };

  handleShelfChangeSearch = (shelf, book) => {
    BooksAPI.update(book, shelf).then(changedBook => {
      const filteredBooks = this.state.booksSearched.filter(
        item => item.id !== book.id
      );
      this.setState({ booksSearched: filteredBooks });
    });
  };

  handleSearch = searchTerm => {
    this.setState({
      searchTerm,
      isLoading: true
    });
    return this._searchDebounced(searchTerm);
  };

  // This method is for mark books already on book (first load) with the rigth shelf
  _setShelf(booksSearched, books) {
    if (booksSearched.length === 0) {
      return [];
    }
    let newBookSearched = [];
    for (const bookSearched of booksSearched) {
      let bookFound;
      for (const book of books) {
        if (book.id === bookSearched.id) {
          bookFound = book;
          continue;
        }
      }
      if (bookFound) {
        newBookSearched.push(bookFound);
      } else {
        newBookSearched.push({ ...bookSearched, shelf: "none" });
      }
    }
    return newBookSearched;
  }

  _makeSearch(term) {
    if (term) {
      BooksAPI.search(term).then(booksSearched => {
        if (booksSearched.error === "empty query") {
          this.setState({ booksSearched: [], isLoading: false });
        } else {
          const response = this._setShelf(booksSearched, this.state.books);
          this.setState({ booksSearched: response, isLoading: false });
        }
      });
    } else {
      this.setState({ booksSearched: [], isLoading: false });
    }
  }

  render() {
    const { books, isLoading, searchTerm, booksSearched } = this.state;
    return (
      <Router>
        <div>
          <Route
            exact
            path="/"
            render={() => (
              <BookList
                books={books}
                isLoading={isLoading}
                handleShelfChange={this.handleShelfChangeList}
              />
            )}
          />
          <Route
            exact
            path="/search"
            render={() => (
              <BookSearch
                books={booksSearched}
                isLoading={isLoading}
                searchTerm={searchTerm}
                handleSearch={this.handleSearch}
                handleShelfChange={this.handleShelfChangeSearch}
              />
            )}
          />
        </div>
      </Router>
    );
  }
}

export default BooksApp;
