import React, { Component } from "react";
import { Link } from "react-router-dom";
import BookShelf from "../components/BookShelf";
import Loading from "../components/Loading";
import * as BooksAPI from "../../BooksAPI";
import { Layout } from "antd";
import task from 'ency';
import "./BookSearch.css";

const { Content } = Layout;

const EmptyList = () => {
  return <div className="empty-result"> </div>;
};

class BookSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      searchTerm: "",
      isLoading: false
    };
    this.handleSearch = this.handleSearch.bind(this)
    this.handleShelfChange = this.handleShelfChange.bind(this)
  }

  handleSearch(e) {
    const searchTerm = e.target.value;
    this.setState({
      searchTerm,
      isLoading: true
    });
    if (searchTerm) {
      console.log(`Inside call makeSearch ${searchTerm}`)
      return this.makeSearch.run(searchTerm, this)
    } else {
      this.setState({
        books: [],
        isLoading: false
      })
    }
  }

  handleShelfChange(shelf, book) {
    BooksAPI.update(book, shelf).then(changedBook => {
      const filteredBooks = this.state.books.filter(
        item => item.id !== book.id
      );
      this.setState({
        books: filteredBooks
      })
    });
  }

  makeSearch = task(function* searchBook(term, context) {
    console.log(`Inside task ${term}`)
    yield BooksAPI.search(term).then(books =>
      {
        console.log(`Inside setState on makeSearch ${term}`)
        const response = books || [];
        context.setState({books: response, isLoading: false})
      }
    );
  }).flow('drop');

  render(props) {
    const { books, isLoading } = this.state;
    return (
      <Layout>
        <Content className="">
          <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/">
                Close
              </Link>
              <div className="search-books-input-wrapper">
                <input
                  type="text"
                  value={this.state.searchTerm}
                  onChange={this.handleSearch}
                  placeholder="Search by title or author"
                />
              </div>
            </div>
            <div className="search-books-results">
              {isLoading && <Loading />}
              {books.length === 0 && <EmptyList />}
              {books.length > 0 && <BookShelf books={books} handleShelfChange={this.handleShelfChange} />}
            </div>
          </div>
        </Content>
      </Layout>
    );
  }
}

export default BookSearch;
