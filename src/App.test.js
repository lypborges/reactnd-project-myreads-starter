import React from "react";
import { mount } from "enzyme";
import renderer from "react-test-renderer";
import App from "./App";
import * as BooksAPI from "./utils/BooksAPI";
import { BooksData, BookData } from "./tests/helpers/BookStore";

beforeAll(() => {
  BooksAPI.getAll = jest.fn(() => {
    return Promise.resolve(BooksData);
  });
});

describe("App", () => {
  it("render without books", () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("has books after render", async () => {
    const wrapper = await mount(<App />);
    expect(wrapper.state().books).toEqual(BooksData);
    console.log(wrapper.debug());
  });

  it("change a book from shelf in index", async () => {
    const wrapper = await mount(<App />);
    console.log(wrapper.debug());
  });
});
