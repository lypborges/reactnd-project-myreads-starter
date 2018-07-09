import React from "react";
import App from "./App";
import renderer from "react-test-renderer";
import { BooksData } from "./tests/helpers/BookStore";

describe("App", () => {
  test("render without books", () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
