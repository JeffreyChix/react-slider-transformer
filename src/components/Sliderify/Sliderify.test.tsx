import React from "react";
import { render } from "@testing-library/react";

import Sliderify from "./Sliderify";

describe("Sliderify", () => {
  test("renders the Sliderify component", () => {
    render(
      <Sliderify
        slides={[{ title: "Hello", content: <div>Hello 2</div> }]}
      />
    );
  });
});
