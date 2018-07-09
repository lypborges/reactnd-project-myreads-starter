import BookSearch from "./BookSearch";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import { BooksData } from "../../../tests/helpers/BookStore";

describe("Loading component layout", () => {
  test("render with books", () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <BookSearch books={BooksData} />
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("render without books", () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <BookSearch books={[]} />
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
