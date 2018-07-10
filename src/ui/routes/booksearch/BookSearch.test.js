import BookSearch from "./BookSearch";
import React from "react";
import { render, fireEvent } from "react-testing-library";
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

  it("call handle function passed as prop", () => {
    const myMock = jest.fn();

    const { getByTestId } = render(
      <MemoryRouter>
        <BookSearch books={BooksData} handleSearch={myMock} />
      </MemoryRouter>
    );

    const inputSearchElement = getByTestId("input-search");
    inputSearchElement.value = "linux book";
    fireEvent.change(inputSearchElement);

    expect(myMock.mock.calls.length).toBe(1);
  });
});
