import React from "react";

export interface SliderifyProps {
  slides?: { title?: string | JSX.Element; content: JSX.Element }[];
  autoPlay?: boolean;
  slideDurationInSecs?: number;
  slideDirection?: "left" | "right";
  showNavButtons?: boolean;
  navPrevIcon?: any;
  navNextIcon?: any;
  showNavDots?: boolean;
  showSpot?: boolean;
  showTitle?: boolean;
  color?: string;
  activeColor?: string;
  disableInfiniteLoop?: boolean;
  disableTransition?: boolean;
  baseColor?: string;
  rounded?: boolean;
  transitionDurationInMS?: number;
  spotPlacement?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  dotsPlacement?: "outside" | "inside";
  keyboardNavigationOnFocus?: boolean;
  className?: string;
  children?: React.ReactNode;
  clip?: boolean;
  clipRight?: boolean;
}

export interface SliderState {
  active: number;
  pause?: boolean;
  direction?: "left" | "right";
  clicked?: boolean;
  dotClicked?: boolean;
  dotIndex?: number;
  interval?: number;
  transitionComplete?: boolean;
}

export const _DEFAULTS: {
  D_SLIDE_DURATION_IN_SECS: number;
  D_AUTO_PLAY: boolean;
  D_SHOW_NAV_CONTROLS: boolean;
  D_SHOW_NAV_DOTS: boolean;
  D_SHOW_SPOT: boolean;
  D_SPOT_PLACEMENT: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  D_COLOR: string;
  D_ACTIVE_COLOR: string;
  D_BASE_COLOR: string;
  D_ROUNDED: boolean;
  D_SLIDE_DIRECTION: "left" | "right";
  D_DOTS_PLACEMENT: "outside" | "inside";
  D_SHOW_TITLE: boolean;
  D_KEYBOARD_NAVIGATION_ON_FOCUS: boolean;
  D_TRANSITION_DURATION_IN_MS: number;
  D_DISABLE_INFINITE_LOOP: boolean;
  D_DISABLE_TRANSITION: boolean;
  D_CLIP: boolean;
  D_CLIP_RIGHT: boolean;
} = {
  D_SLIDE_DURATION_IN_SECS: 10,
  D_AUTO_PLAY: true,
  D_SHOW_NAV_CONTROLS: true,
  D_SHOW_NAV_DOTS: true,
  D_SHOW_SPOT: true,
  D_SPOT_PLACEMENT: "top-left",
  D_COLOR: "white",
  D_ACTIVE_COLOR: "#3ABAB4",
  D_BASE_COLOR: "#D3D3D3",
  D_ROUNDED: false,
  D_SLIDE_DIRECTION: "left",
  D_DOTS_PLACEMENT: "outside",
  D_SHOW_TITLE: false,
  D_KEYBOARD_NAVIGATION_ON_FOCUS: true,
  D_TRANSITION_DURATION_IN_MS: 1000,
  D_DISABLE_INFINITE_LOOP: false,
  D_DISABLE_TRANSITION: false,
  D_CLIP: false,
  D_CLIP_RIGHT: false,
};

export const defaultSliderState: SliderState = {
  active: 1,
  pause: false,
  direction: _DEFAULTS.D_SLIDE_DIRECTION,
  clicked: false,
  dotClicked: false,
  dotIndex: 1,
  interval: _DEFAULTS.D_SLIDE_DURATION_IN_SECS,
  transitionComplete: true,
};

export enum SliderActionTypes {
  NEW_SLIDE = "NEW_SLIDE",
  CLICKED = "CLICKED",
}

export interface SliderAction {
  type: SliderActionTypes;
  payload?: SliderState;
}

export const SPOT_PLACEMENTS = {
  "top-left": {
    left: "1.25rem",
    top: "1.25rem",
  },
  "top-right": {
    right: "1.25rem",
    top: "1.25rem",
  },
  "bottom-left": {
    left: "1.25rem",
    bottom: "1.25rem",
  },
  "bottom-right": {
    right: "1.25rem",
    bottom: "1.25rem",
  },
};
