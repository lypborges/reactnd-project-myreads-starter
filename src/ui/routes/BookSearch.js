import React, { Component } from "react";
import { Link } from "react-router-dom";
import BookShelf from "../components/BookShelf";
import Loading from "../components/Loading";
import { Layout } from "antd";
import "./BookSearch.css";

const { Content } = Layout;

const EmptyList = () => {
  return <div className="empty-result"> </div>;
};

class BookSearch extends Component {
  handleSearch = e => {
    console.log(e.target.value);
    this.props.handleSearch(e.target.value);
  };
  render(props) {
    const { books, isLoading, searchTerm } = this.props;
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
                  value={searchTerm}
                  onChange={this.handleSearch}
                  placeholder="Search by title or author"
                />
              </div>
            </div>
            <div className="search-books-results">
              {isLoading && <Loading />}
              {books.length === 0 && <EmptyList />}
              {books.length > 0 && (
                <BookShelf
                  books={books}
                  handleShelfChange={this.props.handleShelfChange}
                />
              )}
            </div>
          </div>
        </Content>
      </Layout>
    );
  }
}

export default BookSearch;
