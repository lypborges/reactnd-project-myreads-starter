import BookSearch from "./BookSearch";
import React from "react";
import { mount } from "enzyme";
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

    const wrapper = mount(
      <MemoryRouter>
        <BookSearch books={BooksData} handleSearch={myMock} />
      </MemoryRouter>
    );

    wrapper
      .find('[data-test="input-search"]')
      .simulate("change", { target: { value: "linux book" } });

    expect(myMock.mock.calls.length).toBe(1);
  });
});
