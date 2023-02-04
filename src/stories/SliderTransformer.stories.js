import React from "react";
import { storiesOf } from "@storybook/react";
import SliderTransformer from "../components/SliderTransformer";

const stories = storiesOf("App Test", module);

stories.add("Slider Transformer", () => {
  return (
    <div style={{ width: "100%" }}>
      <SliderTransformer clipRight>
        <div style={{ backgroundColor: "yellow", height: "500px" }}></div>
        <div style={{ backgroundColor: "red", height: "500px" }}></div>
        <div style={{ backgroundColor: "blue", height: "500px" }}></div>
        <div style={{ backgroundColor: "green", height: "500px" }}></div>
      </SliderTransformer>
    </div>
  );
});
