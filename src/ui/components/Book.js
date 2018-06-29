import React, { Component } from "react";
import BookShelfChanger from "./BookShelfChanger";
import PropTypes from "prop-types";

class Book extends Component {
  static propTypes = {
    book: PropTypes.shape({
      title: PropTypes.string.isRequired,
      authors: PropTypes.array.isRequired,
      imageLinks: PropTypes.object.isRequired
    })
  };

  render(props) {
    const { book } = this.props;
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${book.imageLinks.thumbnail})`
            }}
          />
          <BookShelfChanger />
        </div>
        <div className="book-title">{book.title}</div>
        {book.authors.map(author => {
          return (
            <div className="book-authors" key={author}>
              {author}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Book;
