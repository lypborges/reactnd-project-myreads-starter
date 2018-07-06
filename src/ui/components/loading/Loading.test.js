import React from "react";
import Loading from "./Loading";
import renderer from "react-test-renderer";

describe("Loading component layout", () => {
  test("render", () => {
    const tree = renderer.create(<Loading />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
