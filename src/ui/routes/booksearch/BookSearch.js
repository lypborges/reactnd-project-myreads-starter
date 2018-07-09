import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import queryString from "query-string";
import BookShelf from "../../components/bookshelf/BookShelf";
import Loading from "../../components/loading/Loading";
import { Layout } from "antd";
import "./BookSearch.css";

const { Content } = Layout;

const EmptyList = () => {
  return <div className="empty-result"> </div>;
};

class BookSearch extends Component {
  constructor(props) {
    super(props);
    let params = queryString.parse(this.props.location.search);
    if (params.term) {
      this.props.handleSearch(params.term);
    }
  }

  handleSearch = e => {
    const term = e.target.value;
    this.props.handleSearch(term);
    const queryParams = queryString.stringify({ term });
    if (term) {
      const newRelativePathQuery = `${window.location.pathname}?${queryParams}`;
      window.history.pushState(null, "", newRelativePathQuery);
    } else {
      window.history.pushState(null, "", window.location.pathname);
    }
    console.log("inside handleSearch");
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
                  data-test="input-search"
                  type="text"
                  value={searchTerm}
                  onChange={this.handleSearch}
                  placeholder="Search by title or author"
                />
              </div>
            </div>
            <div className="search-books-results">
              {isLoading && <Loading />}
              {books && books.length === 0 && <EmptyList />}
              {books &&
                books.length > 0 && (
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

export default withRouter(BookSearch);
