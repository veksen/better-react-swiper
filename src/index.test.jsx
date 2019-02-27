import React from "react";
import { render } from "react-testing-library";
import Swiper from "./index";

it("renders children", () => {
  const items = ["a", "b", "c", "d", "e"];
  const { getAllByTestId } = render(<Swiper items={items} />);

  expect(getAllByTestId("item")).toHaveLength(5);
});
