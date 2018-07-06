import React from "react";
import renderer from "react-test-renderer";
import Author from "./Author";

describe("Author layout", () => {
  test("render with authors", () => {
    const authors = ["William E. Shotts, Jr.", "Felipe Borges Ferreira"];
    const tree = renderer.create(<Author authors={authors} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("render without authors", () => {
    const tree = renderer.create(<Author />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
