import React from "react";
import { render, fireEvent, prettyDOM } from "react-testing-library";
import renderer from "react-test-renderer";
import App from "./App";
import * as BooksAPI from "./utils/BooksAPI";
import { BooksData, BookData } from "./tests/helpers/BookStore";

beforeAll(() => {
  BooksAPI.getAll = jest.fn(() => {
    return Promise.resolve(BooksData);
  });

  BooksAPI.update = jest.fn((book, shelf) => {
    return Promise.resolve(BookData);
  });
});

describe("App", () => {
  it("render without books", () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("has books after render", async () => {
    const { getByAltText } = await render(<App />);
    expect(getByAltText(/The Linux Command Line/i)).toBeInTheDOM();
  });

  it("change a book from shelf in the bookList", async () => {
    const { getByTestId, getByText, container } = await render(<App />);
    const buttonWantToRead = getByTestId("button-want-to-read");
    await fireEvent.click(buttonWantToRead);
    const shelf = getByTestId("shelf Want to Read");
    expect(shelf).toBeInTheDOM();
  });
});
