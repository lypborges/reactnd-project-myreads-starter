import React from "react";
import PropTypes from "prop-types";

const Author = props => {
  let element = <span />;
  const authors = props.authors;
  if (authors && authors.length > 0) {
    element = props.authors.map(author => {
      return <span key={author}>{author}</span>;
    });
  }
  return element;
};

Author.propTypes = {
  authors: PropTypes.array
};

export default Author;
