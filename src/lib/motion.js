// Purpose:Central motion tokens for framer-motion

export const motionTokens = {
  durations: {
    tap: 0.12, // quick button taps
    hover: 0.22, // hover micro-interactions
    card: 0.38, // card entrance/hover animations
    page: 0.6, // page transitions
  },
  easing: {
    standard: [0.2, 0.8, 0.2, 1], // cubic-bezier(.2,.8,.2,1)
    entrance: [0.16, 1, 0.3, 1], // easeOutQuint-ish feel
    exit: [0.7, 0, 0.84, 0], // easeInCubic-ish feel
  },
};
