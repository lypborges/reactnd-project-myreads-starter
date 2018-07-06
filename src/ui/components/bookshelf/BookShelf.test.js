import React from "react";
import renderer from "react-test-renderer";
import BookShelf from "./BookShelf";
import { BooksData } from "../../../tests/helpers/BookStore";

it("renders correctly without books", () => {
  const tree = renderer.create(<BookShelf books={[]} title="" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders correctly with books", () => {
  const tree = renderer
    .create(<BookShelf books={BooksData} title="Reading" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
