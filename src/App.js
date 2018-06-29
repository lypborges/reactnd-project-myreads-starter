import React, { Component } from "react";
import BookSearch from "./ui/routes/BookSearch";
import BookList from "./ui/routes/BookList";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";

class BooksApp extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={BookList} />
          <Route exact path="/search" component={BookSearch} />
        </div>
      </Router>
    );
  }
}

export default BooksApp;
