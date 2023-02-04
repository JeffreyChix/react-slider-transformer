# React Sliderify

React Sliderify is a versatile and user-friendly slider package for React that makes it easy to create responsive sliders from any content. With a range of customizable options and intuitive configuration, you can turn anything into a slider in just a few simple steps. The package utilizes the latest React technology to ensure a smooth and seamless experience, making it the ideal solution for developers and designers looking to add dynamic, eye-catching sliders to their projects. Whether you're creating a product carousel, image gallery, or a simple content slider, React Slider Transformer provides the tools and functionality you need to get the job done quickly and efficiently.

### Features

- Responsive
- Mobile friendly
- Keyboard navigation
- Auto play with custom interval
- Infinite loop
- Custom slide directions
- Supports images, videos, text content or anything you want. Each direct child represents one slide!
- Supports external controls
- Highly customizable:
  - Custom arrows
  - Custom indicators colors
  - Custom status

#### Important

The presentation has been configured to mimic an endless loop by replicating the slides. Upon reaching the final slide, it seamlessly transitions back to the first slide without any disruption or jump to the beginning just like the owl carousel. You don't even know 😎.

### Installing as a package

Using yarn: `yarn add react-sliderify`

Using npm: `npm install react-sliderify`

### Usage

```javascript
import React from "react";
import Sliderify from "react-sliderify";

const Page = () => {
  return (
    <div className="home-page">
      <Sliderify>
        <div
          style={{ height: "500px", backgroundColor: "red", color: "white" }}
        >
          Slide 1
        </div>
        <div
          style={{ height: "500px", backgroundColor: "green", color: "white" }}
        >
          Slide 2
        </div>
        <div
          style={{ height: "500px", backgroundColor: "blue", color: "white" }}
        >
          Slide 3
        </div>
      </Sliderify>
    </div>
  );
};

// Note: you have the option to enhance the presentation by supplying an array of objects to the 'slides' property. Each object must contain a 'content' property, representing the slide content in the form of a JSX element. The 'title' property is optional and can be used to provide a descriptive heading for the slide.
```

### Props

| Name                      | Value                                                  | Description                                                                                                                                                                                                                       |
|---------------------------|--------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| slides                    | `an array of objects`                                  | An array of objects. Each object must contain a 'content' property, representing the slide content in the form of a JSX element. The 'title' property is optional and can be used to provide a descriptive heading for the slide. |
| autoPlay                  | `boolean`                                              | Change the slide automatically based on `slideDurationInSecs` prop.                                                                                                                                                               |
| slideDurationInSecs       | `number`                                               | Measured in seconds, determines the frequency at which the slides advance automatically when the `autoPlay` option is enabled. The default interval is set to `10` seconds.                                                       |
| slideDirection            | `left or right`                                        | Direction of the slide. Defaults to `left`                                                                                                                                                                                        |
| showNavButtons            | `boolean`                                              | Hide or show the arrow navigation buttons. Defaults to `true`.                                                                                                                                                                    |
| navPrevIcon               | `any`                                                  | A custom element designated as the 'previous icon' which, upon click, navigates to the preceding slide.                                                                                                                           |
| navNextIcon               | `any`                                                  | A custom element designated as the 'next icon' which, upon click, navigates to the next slide.                                                                                                                                    |
| showNavDots               | `boolean`                                              | Hide or show the active slide indicators. Defaults to `true`                                                                                                                                                                      |
| showSpot                  | `boolean`                                              | Hide or show the circular spot which has been included as a stylistic feature by setting the relevant option. Defaults to `true`.                                                                                                 |
| showTitle                 | `boolean`                                              | When slides are supplied through the `slides` property, this option is to show or hide the accompanying title, if present.                                                                                                        |
| color                     | `string`                                               | Set the color of some elements like the circular spot if visible.                                                                                                                                                                 |
| baseColor                 | `string`                                               | Set the base color of the indicators                                                                                                                                                                                              |
| activeColor               | `string`                                               | Set the active color of the indicators. When a slide is active, the indicator lights up.                                                                                                                                          |
| disableInfiniteLoop       | `boolean`                                              | This controls the activation or deactivation of the infinite loop feature. Defaults to `false`.                                                                                                                                   |
| disableTransition         | `boolean`                                              | This controls the activation or deactivation of the transition animation. Defaults to `false`.                                                                                                                                    |
| rounded                   | `boolean`                                              | Add or remove rounded corners (border-radius).                                                                                                                                                                                    |
| transitionDurationInMS    | `number`                                               | Adjust the duration of the transition between slides. Defaults to `1000` ms (1 second).                                                                                                                                           |
| spotPlacement             | `top-left or top-right or bottom-left or bottom-right` | Set the postion of the circular spot slides wrapper. Defaults to `top-left`.                                                                                                                                                      |
| dotsPlacement             | `outside or inside`                                    | Set the position of the dot indicators, inside or outside the slides. Defaults to `outside`.                                                                                                                                      |
| keyboardNavigationOnFocus | `boolean`                                              | Control the slides with arrow keys on the keyboard when in focus. Defaults to `true`.                                                                                                                                             |
| className                 | `string`                                               | Additional class names for styling                                                                                                                                                                                                |
| clip                      | `boolean`                                              | Add or remove clip-path CSS style. Defaults to `false`.                                                                                                                                                                           |
| clipRight                 | `boolean`                                              | Clip the top right of the slides wrapper. Just for additional styling. Defaults to `false`.                                                                                                                                       |


### Upcoming features

- Drag and swipe
- Custom animation
- Vertical axis
- More customization

If you have any ideas or suggestions for improving the package, please don't hesitate to reach out at [jeffreyintech@gmail.com](mailto:jeffreyintech@gmail.com). Your feedback is valued and appreciated.