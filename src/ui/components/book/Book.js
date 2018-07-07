import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card, Radio } from "antd";
import Author from "../author/Author";

const { Meta } = Card;

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
    if (!this.props.book) return null;

    const bookStyle = {
      width: 248,
      height: 193
    };
    const { book } = this.props;
    const { imageLinks, authors, shelf, title } = book;
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
          <Meta title={title} description={<Author authors={authors} />} />
        </Card>
        <div>
          <Radio.Group
            value={shelf}
            size={"small"}
            onChange={this.handleChange}
          >
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
