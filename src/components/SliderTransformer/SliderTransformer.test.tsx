import React from "react";
import { render } from "@testing-library/react";

import SliderTransformer from "./SliderTransformer";

describe("SliderTransformer", () => {
  test("renders the SliderTransformer component", () => {
    render(
      <SliderTransformer
        slides={[{ title: "Hello", content: <div>Hello 2</div> }]}
      />
    );
  });
});
