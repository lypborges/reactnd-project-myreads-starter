import React, { Component } from "react";
import BookShelf from "../../components/bookshelf/BookShelf";
import Loading from "../../components/loading/Loading";
import { Link } from "react-router-dom";
import { Layout, Icon } from "antd";
import "./BookList.css";

const { Header, Content } = Layout;

const ShelfContainer = props => {
  return (
    <div className="list-books">
      <div className="list-books-content">
        {props.children}
        <div className="open-search">
          <Link to="/search">
            <Icon type="plus-circle" className="add-book-icon" />
          </Link>
        </div>
      </div>
    </div>
  );
};

const Shelfs = props => {
  return (
    <ShelfContainer>
      <div>
        <BookShelf
          books={props.currentlyReading}
          title="Currently Reading"
          handleShelfChange={props.handleShelfChange}
        />
        <BookShelf
          books={props.wantToRead}
          title="Want to Read"
          handleShelfChange={props.handleShelfChange}
        />
        <BookShelf
          books={props.read}
          title="Read"
          handleShelfChange={props.handleShelfChange}
        />
      </div>
    </ShelfContainer>
  );
};

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
    const { books, isLoading, handleShelfChange } = this.props;
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
            <Shelfs
              currentlyReading={currentlyReading}
              wantToRead={wantToRead}
              read={read}
              handleShelfChange={handleShelfChange}
            />
          )}
        </Content>
      </Layout>
    );
  }
}

export default BookList;
