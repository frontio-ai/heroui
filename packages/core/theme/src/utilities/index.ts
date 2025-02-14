import transition from "./transition";
import custom from "./custom";
import scrollbarHide from "./scrollbar-hide";
import animation from "./animation";

export const utilities = {
  ...custom,
  ...transition,
  ...scrollbarHide,
  ...animation,
};
