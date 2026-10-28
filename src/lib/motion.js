import { useReducedMotion as useOsReducedMotion } from 'framer-motion';

/**
 * Whether to honour the visitor's OS "reduce motion" setting.
 * Off by choice: the animations are part of the portfolio's design. Set to true to calm the page
 * for visitors who turn animations off on their device.
 */
export const RESPECT_REDUCED_MOTION = false;

export function useReducedMotion() {
  const osPrefersReduced = useOsReducedMotion();
  return RESPECT_REDUCED_MOTION && Boolean(osPrefersReduced);
}

export const EASE = [0.2, 0.8, 0.2, 1];

// Seconds the intro loader covers the page; hero animations start just before it lifts.
export const INTRO_DURATION = 1.6;
export const INTRO_DELAY = INTRO_DURATION - 0.2;
