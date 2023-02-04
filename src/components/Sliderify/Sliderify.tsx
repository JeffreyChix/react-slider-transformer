import React, {
  useReducer,
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  Children,
} from "react";
import { TfiArrowCircleRight as AngleRightIcon } from "react-icons/tfi";
import { TfiArrowCircleLeft as AngleLeftIcon } from "react-icons/tfi";

import {
  defaultSliderState,
  SliderifyProps,
  _DEFAULTS,
  SPOT_PLACEMENTS,
  SliderState,
  SliderActionTypes,
  SliderAction,
} from "../../store/index";

const Sliderify = ({
  slides,
  autoPlay = _DEFAULTS.D_AUTO_PLAY,
  slideDurationInSecs = _DEFAULTS.D_SLIDE_DURATION_IN_SECS,
  showNavButtons = _DEFAULTS.D_SHOW_NAV_CONTROLS,
  showNavDots = _DEFAULTS.D_SHOW_NAV_DOTS,
  showSpot = _DEFAULTS.D_SHOW_SPOT,
  color = _DEFAULTS.D_COLOR,
  activeColor = _DEFAULTS.D_ACTIVE_COLOR,
  baseColor = _DEFAULTS.D_BASE_COLOR,
  rounded = _DEFAULTS.D_ROUNDED,
  slideDirection = _DEFAULTS.D_SLIDE_DIRECTION,
  showTitle = _DEFAULTS.D_SHOW_TITLE,
  spotPlacement = _DEFAULTS.D_SPOT_PLACEMENT,
  dotsPlacement = _DEFAULTS.D_DOTS_PLACEMENT,
  keyboardNavigationOnFocus = _DEFAULTS.D_KEYBOARD_NAVIGATION_ON_FOCUS,
  transitionDurationInMS = _DEFAULTS.D_TRANSITION_DURATION_IN_MS,
  disableInfiniteLoop = _DEFAULTS.D_DISABLE_INFINITE_LOOP,
  disableTransition = _DEFAULTS.D_DISABLE_TRANSITION,
  className,
  children,
  navPrevIcon = <AngleLeftIcon size={35} style={{ color: "white" }} />,
  navNextIcon = <AngleRightIcon size={35} style={{ color: "white" }} />,
  clip = _DEFAULTS.D_CLIP,
  clipRight = _DEFAULTS.D_CLIP_RIGHT,
}: SliderifyProps) => {
  const slideDurationInMS = slideDurationInSecs * 1000; // convert to milliseconds;
  const transitionDurationInSeconds = transitionDurationInMS / 1000; // convert to seconds

  const preparedSlides = useMemo(
    () =>
      children
        ? Children.toArray(children).map((child) => ({
            title: "",
            content: child,
          }))
        : slides ?? [{ title: "", content: <></> }],
    [children, slides]
  );

  const sliderTranformerWrapper = useRef<HTMLDivElement>(null);
  const sliderTranformerInner = useRef<HTMLDivElement>(null);

  const [wrapperFocused, setWrapperFocus] = useState(false);

  const [state, dispatch] = useReducer(
    (state: SliderState, action: SliderAction): SliderState => {
      switch (action.type) {
        case SliderActionTypes.NEW_SLIDE:
          return {
            ...state,
            ...action.payload,
            direction: slideDirection,
          };
        case SliderActionTypes.CLICKED:
          return { ...state, ...action.payload };
      }
    },
    {
      ...defaultSliderState,
      direction: slideDirection,
      interval: slideDurationInMS,
      active: disableInfiniteLoop ? 0 : defaultSliderState.active,
    }
  );

  const previousActiveSlide = useRef<number>(1);
  const lastSliderItem = (arr: any[], index: number) =>
    arr.length - 1 === index;

  const clonedSlides = useMemo(
    () =>
      !disableInfiniteLoop
        ? [
            preparedSlides[preparedSlides.length - 1],
            ...preparedSlides,
            preparedSlides[0],
          ]
        : preparedSlides,
    [preparedSlides, disableInfiniteLoop]
  );

  const lastSlide = clonedSlides.length - 1;
  const penultimateSlide = clonedSlides.length - 2;
  const threeToLastSlide = clonedSlides.length - 3;

  const {
    active,
    pause,
    direction,
    interval,
    clicked,
    dotClicked,
    transitionComplete,
  } = state;

  const SLIDE = useCallback(
    (customMove?: "left" | "right", slideTo?: number) => {
      const slideOrient = customMove ?? direction;

      if (disableInfiniteLoop) {
        switch (slideOrient) {
          case "left":
            if (lastSliderItem(clonedSlides, active)) {
              dispatch({
                type: SliderActionTypes.NEW_SLIDE,
                payload: {
                  active: 0,
                  pause: false,
                  clicked: false,
                  dotClicked: false,
                },
              });
            } else {
              dispatch({
                type: SliderActionTypes.NEW_SLIDE,
                payload: {
                  active: active + 1,
                  pause: false,
                  clicked: false,
                  dotClicked: false,
                },
              });
            }
            break;
          case "right":
            if (active === 0) {
              dispatch({
                type: SliderActionTypes.NEW_SLIDE,
                payload: {
                  active: lastSlide,
                  pause: false,
                  clicked: false,
                  dotClicked: false,
                },
              });
            } else {
              dispatch({
                type: SliderActionTypes.NEW_SLIDE,
                payload: {
                  active: active - 1,
                  pause: false,
                  clicked: false,
                  dotClicked: false,
                },
              });
            }
            break;
        }
        return;
      }

      if (!clicked && !dotClicked) {
        switch (slideOrient) {
          case "left":
            if (lastSliderItem(clonedSlides, active)) {
              dispatch({
                type: SliderActionTypes.NEW_SLIDE,
                payload: {
                  pause: true,
                  dotClicked: false,
                  interval: 0,
                  active: defaultSliderState.active,
                },
              });
            } else {
              dispatch({
                type: SliderActionTypes.NEW_SLIDE,
                payload: {
                  pause: false,
                  dotClicked: false,
                  interval: slideDurationInMS,
                  active: slideTo ?? active + 1,
                },
              });
            }
            break;
          case "right":
            if (active === 0) {
              dispatch({
                type: SliderActionTypes.NEW_SLIDE,
                payload: {
                  pause: true,
                  dotClicked: false,
                  interval: 0,
                  active: penultimateSlide,
                },
              });
            } else {
              dispatch({
                type: SliderActionTypes.NEW_SLIDE,
                payload: {
                  pause: false,
                  dotClicked: false,
                  interval: slideDurationInMS,
                  active: slideTo ?? active - 1,
                },
              });
            }
            break;
          default:
            return;
        }
      }

      if (clicked && !dotClicked) {
        if (
          previousActiveSlide.current === lastSlide &&
          active === defaultSliderState.active
        ) {
          dispatch({
            type: SliderActionTypes.NEW_SLIDE,
            payload: {
              active: active + 1,
              clicked: false,
              dotClicked: false,
              pause: false,
            },
          });
        } else if (
          active === penultimateSlide &&
          previousActiveSlide.current === 0
        ) {
          dispatch({
            type: SliderActionTypes.NEW_SLIDE,
            payload: {
              active: threeToLastSlide,
              clicked: false,
              dotClicked: false,
              pause: false,
            },
          });
        } else {
          dispatch({
            type: SliderActionTypes.NEW_SLIDE,
            payload: {
              active,
              clicked: false,
              dotClicked: false,
              pause: false,
            },
          });
        }
      }

      previousActiveSlide.current = active; // update the last active slide
    },
    [
      active,
      clicked,
      clonedSlides,
      direction,
      slideDurationInMS,
      dotClicked,
      lastSlide,
      penultimateSlide,
      threeToLastSlide,
      disableInfiniteLoop,
    ]
  );

  const getSliderStyle = () => {
    const items = clonedSlides.length;
    return {
      width: `${items * 100}%`,
      transform: `translateX(-${(active * 100) / items}%)`,
    };
  };

  const getEachItemWidth = () => {
    return `${100 / clonedSlides.length}%`;
  };

  const onDotClickSlide = useCallback(
    (index: number) => {
      if (disableInfiniteLoop) {
        dispatch({
          type: SliderActionTypes.CLICKED,
          payload: { active: index, pause: false },
        });
        return;
      }
      if (active === 1 && index === penultimateSlide) {
        dispatch({
          type: SliderActionTypes.CLICKED,
          payload: {
            direction: "right",
            pause: false,
            dotClicked: true,
            dotIndex: index,
            active: 0,
            transitionComplete: false,
          },
        });
      } else if (active === penultimateSlide && index === 1) {
        dispatch({
          type: SliderActionTypes.CLICKED,
          payload: {
            direction: "left",
            pause: false,
            dotClicked: true,
            dotIndex: index,
            active: lastSlide,
            transitionComplete: false,
          },
        });
      } else {
        dispatch({
          type: SliderActionTypes.CLICKED,
          payload: {
            active: index,
            dotClicked: true,
            dotIndex: index,
            pause: false,
          },
        });
      }
    },
    [active, penultimateSlide, lastSlide, disableInfiniteLoop]
  );

  const rightClick = useCallback(
    () =>
      transitionComplete && disableInfiniteLoop
        ? SLIDE("left")
        : dispatch({
            type: SliderActionTypes.CLICKED,
            payload: {
              active: lastSliderItem(clonedSlides, active)
                ? defaultSliderState.active
                : active + 1,
              direction: "left",
              clicked: true,
              pause: lastSliderItem(clonedSlides, active) ? true : false,
            },
          }),
    [active, clonedSlides, transitionComplete, disableInfiniteLoop, SLIDE]
  );

  const leftClick = useCallback(
    () =>
      transitionComplete && disableInfiniteLoop
        ? SLIDE("right")
        : dispatch({
            type: SliderActionTypes.CLICKED,
            payload: {
              active: active === 0 ? penultimateSlide : active - 1,
              direction: "right",
              clicked: true,
              pause: active === 0 ? true : false,
            },
          }),
    [active, penultimateSlide, transitionComplete, disableInfiniteLoop, SLIDE]
  );

  const getDotActiveColor = (index: number) => {
    if (
      (!disableInfiniteLoop && active === 0 && index === penultimateSlide) ||
      (!disableInfiniteLoop && active === lastSlide && index === 1) ||
      active === index
    ) {
      return activeColor;
    }
    return baseColor;
  };

  useEffect(() => {
    let intervalHandler: any;

    // if auto play is ON
    if (autoPlay && !clicked && !dotClicked) {
      intervalHandler = setInterval(() => {
        SLIDE();
      }, interval);
    }

    // if prev or next button is clicked
    if (clicked && !dotClicked) {
      SLIDE(direction);
    }

    // if dot is clicked
    if (dotClicked) {
      if (active === lastSlide) {
        // run when slide transition is complete: a second after
        setTimeout(
          () =>
            dispatch({
              type: SliderActionTypes.NEW_SLIDE,
              payload: {
                active: 1,
                pause: true,
                transitionComplete: true,
              },
            }),
          transitionDurationInMS
        );
      } else if (active === 0) {
        // run when slide transition is complete: a second after
        setTimeout(
          () =>
            dispatch({
              type: SliderActionTypes.NEW_SLIDE,
              payload: {
                active: penultimateSlide,
                pause: true,
                transitionComplete: true,
              },
            }),
          transitionDurationInMS
        );
      } else
        dispatch({
          type: SliderActionTypes.NEW_SLIDE,
          payload: {
            active,
            dotClicked: false,
            transitionComplete: true,
          },
        });
    }
    return () => clearInterval(intervalHandler);
  }, [
    SLIDE,
    autoPlay,
    interval,
    active,
    clicked,
    direction,
    dotClicked,
    lastSlide,
    penultimateSlide,
    transitionDurationInMS,
  ]);

  // *** Keyboard Arrow Navigation on Focus *** //
  useEffect(() => {
    if (!keyboardNavigationOnFocus) return;
    const handlerKeyboardPress = (e: KeyboardEvent) => {
      if (wrapperFocused) {
        switch (e.key) {
          case "ArrowRight":
          case "ArrowUp":
            rightClick();
            break;
          case "ArrowLeft":
          case "ArrowDown":
            leftClick();
            break;
        }
      }
    };
    window.addEventListener("keydown", handlerKeyboardPress);

    return () => removeEventListener("keydown", handlerKeyboardPress);
  }, [wrapperFocused, rightClick, leftClick, keyboardNavigationOnFocus]);

  return (
    <>
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          height: "inherit",
          outline: "none !important",
          border: "0",
          ...(rounded && { borderRadius: "10px" }),
        }}
        tabIndex={0}
        onFocus={() => setWrapperFocus(true)}
        onBlur={() => setWrapperFocus(false)}
        ref={sliderTranformerWrapper}
        className={`__react_sliderify_v0__wrapper ${className} ${
          clip && "clip"
        } ${clipRight && "clip_right"}`}
      >
        <div
          className="___slider___transformer_v0__inner"
          ref={sliderTranformerInner}
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "row",
            ...getSliderStyle(),
            ...(!disableTransition &&
              !pause && {
                transition: `all ${transitionDurationInSeconds}s ease 0s`,
              }),
          }}
        >
          {clonedSlides.map(({ title, content }, index) => {
            return (
              <div
                key={index}
                style={{
                  width: getEachItemWidth(),
                  position: "relative",
                  ...(active === index && { zIndex: "9999" }),
                }}
              >
                {content}
                {showTitle && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: "1.5rem",
                      left: "1.25rem",
                      color,
                    }}
                  >
                    {title}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {showSpot && (
          <div
            style={{
              position: "absolute",
              width: "1.25rem",
              height: "1.25rem",
              borderRadius: "9999px",
              backgroundColor: `${color}`,
              ...SPOT_PLACEMENTS[spotPlacement],
            }}
          ></div>
        )}
        {showNavButtons && (
          <div
            style={{
              position: "absolute",
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <div
              style={{
                paddingLeft: "1.25rem",
                cursor: "pointer",
                visibility: active === 0 ? "hidden" : "visible",
              }}
              onClick={leftClick}
              className={"navIcon"}
            >
              {navPrevIcon}
            </div>
            <div
              style={{ paddingRight: "1.25rem", cursor: "pointer" }}
              onClick={rightClick}
              className={"navIcon"}
            >
              {navNextIcon}
            </div>
          </div>
        )}
        {showNavDots && dotsPlacement === "inside" && (
          <div
            style={{
              textAlign: "center",
              width: "100%",
              position: "absolute",
              bottom: "1rem",
            }}
          >
            <div>
              {Array.from({ length: preparedSlides.length }).map((_, index) => {
                const newIndex = disableInfiniteLoop ? index : index + 1;
                return (
                  <div
                    key={newIndex}
                    style={{ margin: "5px", display: "inline-block" }}
                    onClick={() =>
                      transitionComplete && onDotClickSlide(newIndex)
                    }
                  >
                    <span
                      style={{
                        display: "inline-block",
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        cursor: "pointer",
                        background: `${getDotActiveColor(newIndex)}`,
                      }}
                    ></span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {showNavDots && dotsPlacement === "outside" && (
        <div
          style={{
            textAlign: "center",
            width: "100%",
          }}
        >
          <div>
            {Array.from({ length: preparedSlides.length }).map((_, index) => {
              const newIndex = disableInfiniteLoop ? index : index + 1;

              return (
                <div
                  key={newIndex}
                  style={{ margin: "5px", display: "inline-block" }}
                  onClick={() =>
                    transitionComplete && onDotClickSlide(newIndex)
                  }
                >
                  <span
                    style={{
                      display: "inline-block",
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      cursor: "pointer",
                      background: `${getDotActiveColor(newIndex)}`,
                    }}
                  ></span>
                </div>
              );
            })}
          </div>
          <style jsx global>{`
            .navIcon {
              transition: all 1s ease 0s;
              &:hover {
                transform: scale(1.2);
              }
            }

            .clip {
              -webkit-clip-path: polygon(
                18px 0%,
                100% 0%,
                calc(100% - 18px) 100%,
                0% 100%
              );
              clip-path: polygon(
                18px 0%,
                100% 0%,
                calc(100% - 18px) 100%,
                0% 100%
              );
            }

            .clip_right {
              -webkit-clip-path: polygon(
                calc(100% - 48px) 0,
                100% 48px,
                100% 100%,
                0 100%,
                0 0
              );
              clip-path: polygon(
                calc(100% - 48px) 0,
                100% 48px,
                100% 100%,
                0 100%,
                0 0
              );
            }
          `}</style>
        </div>
      )}
    </>
  );
};

export default Sliderify;
