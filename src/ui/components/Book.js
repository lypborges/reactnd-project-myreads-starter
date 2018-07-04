import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card, Radio } from "antd";

const { Meta } = Card;

const Authors = props => {
  let element = <span />;
  const authors = props.authors;
  if (authors && authors.length > 0) {
    element = props.authors.map(author => {
      return <span key={author}>{author}</span>;
    });
  }
  return element;
};

class Book extends Component {
  static propTypes = {
    book: PropTypes.shape({
      title: PropTypes.string,
      authors: PropTypes.array,
      shelf: PropTypes.string,
      imageLinks: PropTypes.object
    })
  };

  handleChange = e => {
    this.props.handleShelfChange(e.target.value, this.props.book);
  };

  render(props) {
    const bookStyle = {
      width: 248,
      height: 193
    };
    const { book } = this.props;
    const { imageLinks, authors, shelf, title } = book;
    if (!book) return;
    return (
      <div className="bookshelf-container">
        <Card
          className="bookshelf-book"
          style={{ width: 250 }}
          cover={
            imageLinks ? (
              <img alt={title} style={bookStyle} src={imageLinks.thumbnail} />
            ) : (
              <img
                alt={title}
                style={bookStyle}
                src="http://via.placeholder.com/248x193"
              />
            )
          }
        >
          <Meta title={title} description={<Authors authors={authors} />} />
        </Card>
        <div>
          <Radio.Group value={shelf} onChange={this.handleChange}>
            <Radio.Button value="currentlyReading">Reading</Radio.Button>
            <Radio.Button value="wantToRead">Want to Read</Radio.Button>
            <Radio.Button value="read">Read</Radio.Button>
            <Radio.Button value="none">None</Radio.Button>
          </Radio.Group>
        </div>
      </div>
    );
  }
}

export default Book;
