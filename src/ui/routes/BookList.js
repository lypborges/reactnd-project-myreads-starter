import React, { Component } from "react";
import BookShelf from "../components/BookShelf";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import { Layout, Icon } from "antd";
import "./BookList.css";

const { Header, Content } = Layout;

class BookList extends Component {
  _groupShelf(books, term) {
    return books.filter(book => {
      return book.shelf === term;
    });
  }

  _buildShelfs = books => {
    const currentlyReading = this._groupShelf(books, "currentlyReading");
    const wantToRead = this._groupShelf(books, "wantToRead");
    const read = this._groupShelf(books, "read");

    this.setState({
      books,
      currentlyReading,
      wantToRead,
      read,
      isLoading: false
    });
  };

  render(props) {
    const { books, isLoading } = this.props;

    const currentlyReading = this._groupShelf(books, "currentlyReading");
    const wantToRead = this._groupShelf(books, "wantToRead");
    const read = this._groupShelf(books, "read");

    return (
      <Layout>
        <Header className="main-header">
          <Icon type="book" style={{ fontSize: 50, color: "white" }} />
          <h1 className="main-title">My reads</h1>
        </Header>
        <Content className="main-content">
          {isLoading && <Loading />}
          {!isLoading && (
            <div className="list-books">
              <div className="list-books-content">
                <div>
                  <BookShelf
                    books={currentlyReading}
                    title="Currently Reading"
                    handleShelfChange={this.props.handleShelfChange}
                  />
                  <BookShelf
                    books={wantToRead}
                    title="Want to Read"
                    handleShelfChange={this.props.handleShelfChange}
                  />
                  <BookShelf
                    books={read}
                    title="Read"
                    handleShelfChange={this.props.handleShelfChange}
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
