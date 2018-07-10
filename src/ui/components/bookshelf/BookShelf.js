import React, { Component } from "react";
import Book from "../book/Book";
import PropTypes from "prop-types";
import { Divider } from "antd";

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
        {books.length > 0 ? (
          <div className="bookshelf-books" data-testid={`shelf ${title}`}>
            {books.map(book => {
              return (
                <Book
                  key={book.id}
                  book={book}
                  handleShelfChange={this.props.handleShelfChange}
                />
              );
            })}
            <Divider orientation="center" />
          </div>
        ) : (
          <div>
            <h3 className="empty-shelf">Empty shelf ;(</h3>
            <Divider orientation="center" />
          </div>
        )}
      </div>
    );
  }
}

export default BookShelf;
