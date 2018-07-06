import React, { Component } from "react";
import Book from "../book/Book";
import PropTypes from "prop-types";

class BookShelf extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired
  };

  static defaultProps = {
    books: [],
    title: ""
  };

  render(props) {
    const { books, title } = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          {books.map(book => {
            return (
              <Book
                key={book.id}
                book={book}
                handleShelfChange={this.props.handleShelfChange}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default BookShelf;