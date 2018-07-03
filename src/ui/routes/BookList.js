import React, { Component } from "react";
import BookShelf from "../components/BookShelf";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import * as BooksAPI from "../../BooksAPI";
import { Layout, Icon } from "antd";
import "./BookList.css";

const { Header, Content } = Layout;

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      currentlyReading: [],
      wantToRead: [],
      read: [],
      loading: true
    };
    this.handleShelfChange = this.handleShelfChange.bind(this);
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.buildShelfs(books);
    });
  }

  buildShelfs(books) {
    const currentlyReading = this.groupShelf(books, "currentlyReading");
    const wantToRead = this.groupShelf(books, "wantToRead");
    const read = this.groupShelf(books, "read");

    this.setState({
      books,
      currentlyReading,
      wantToRead,
      read,
      loading: false
    });
  }

  groupShelf(books, term) {
    return books.filter(book => {
      return book.shelf === term;
    });
  }

  handleShelfChange(shelf, book) {
    BooksAPI.update(book, shelf).then(changedBook => {
      const filteredBooks = this.state.books.filter(
        item => item.id !== book.id
      );
      const newBooks = [...filteredBooks, Object.assign({}, book, { shelf })];
      this.buildShelfs(newBooks);
    });
  }

  render(props) {
    const { currentlyReading, wantToRead, read, loading } = this.state;
    return (
      <Layout>
        <Header className="main-header">
          <Icon type="book" style={{ fontSize: 50, color: "white" }} />
          <h1 className="main-title">My reads</h1>
        </Header>
        <Content className="main-content">
          {loading && <Loading />}
          {!loading && (
            <div className="list-books">
              <div className="list-books-content">
                <div>
                  <BookShelf
                    books={currentlyReading}
                    title="Currently Reading"
                    handleShelfChange={this.handleShelfChange}
                  />
                  <BookShelf
                    books={wantToRead}
                    title="Want to Read"
                    handleShelfChange={this.handleShelfChange}
                  />
                  <BookShelf
                    books={read}
                    title="Read"
                    handleShelfChange={this.handleShelfChange}
                  />
                </div>
              </div>
              <div className="open-search">
                <Link to="/search">
                  <Icon type="plus-circle" className="add-book-icon" />
                </Link>
              </div>
            </div>
          )}
        </Content>
      </Layout>
    );
  }
}

export default BookList;
