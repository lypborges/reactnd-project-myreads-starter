import React, { Component } from "react";
import BookSearch from "./ui/routes/booksearch/BookSearch";
import BookList from "./ui/routes/booklist/BookList";
import * as BooksAPI from "./utils/BooksAPI";
import * as BooksHelper from "./utils/BooksHelper";
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
    this.setState({ isLoading: true });
    BooksAPI.getAll().then(books => {
      this.setState({ books, isLoading: false });
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
      const booksSearched = this.state.booksSearched.map(item => {
        if (item.id === book.id) {
          return { ...item, shelf };
        } else {
          return item;
        }
      });
      const books = [...this.state.books, { ...book, shelf }];
      this.setState({ booksSearched, books });
    });
  };

  handleSearch = searchTerm => {
    this.setState({
      searchTerm,
      isLoading: true
    });
    return this._searchDebounced(searchTerm);
  };

  _makeSearch(term) {
    if (term) {
      BooksAPI.search(term).then(booksSearched => {
        if (booksSearched.error === "empty query") {
          this.setState({ booksSearched: [], isLoading: false });
        } else {
          const response = BooksHelper.setShelf(
            booksSearched,
            this.state.books
          );
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
