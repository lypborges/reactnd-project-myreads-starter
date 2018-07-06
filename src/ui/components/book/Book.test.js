import React from "react";
import renderer from "react-test-renderer";
import Book from "./Book";
import { BookData } from "../../../tests/helpers/BookStore";

it("renders correctly with book", () => {
  const tree = renderer.create(<Book book={BookData} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders correctly without book", () => {
  const tree = renderer.create(<Book />).toJSON();
  expect(tree).toMatchSnapshot();
});
