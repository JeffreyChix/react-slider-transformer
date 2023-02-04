import React from "react";
import { storiesOf } from "@storybook/react";
import Sliderify from "../components/Sliderify";

const stories = storiesOf("App Test", module);

stories.add("Sliderify", () => {
  return (
    <div style={{ width: "100%" }}>
      <Sliderify clipRight>
        <div style={{ backgroundColor: "yellow", height: "500px" }}></div>
        <div style={{ backgroundColor: "red", height: "500px" }}></div>
        <div style={{ backgroundColor: "blue", height: "500px" }}></div>
        <div style={{ backgroundColor: "green", height: "500px" }}></div>
      </Sliderify>
    </div>
  );
});
