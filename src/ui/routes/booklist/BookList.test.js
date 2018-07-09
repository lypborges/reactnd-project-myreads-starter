import BookList from "./BookList";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import { BooksData } from "../../../tests/helpers/BookStore";

describe("Loading component layout", () => {
  test("render", () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <BookList books={BooksData} />
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
