import gsap from 'gsap';
import confetti from 'canvas-confetti';

/**
 * QUDRA Motion Design System Utilities
 * Powered by GSAP & Canvas Confetti
 * Designed for High-Performance (transform & opacity only, 60fps)
 */

// Brand Easing Curves
export const EASINGS = {
  expoOut: 'power4.out',
  backOut: 'back.out(1.4)',
  smooth: 'power2.out',
  elastic: 'elastic.out(1, 0.4)'
};

/**
 * Animate a numeric DOM element counting up from start to end
 */
export function animateCounter(element, startValue, endValue, duration = 1.2, options = {}) {
  if (!element) return;
  const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isReduced) {
    element.textContent = options.formatter ? options.formatter(endValue) : endValue;
    return;
  }

  const obj = { val: startValue };
  gsap.to(obj, {
    val: endValue,
    duration,
    ease: EASINGS.expoOut,
    onUpdate: () => {
      const rounded = Math.round(obj.val);
      element.textContent = options.formatter ? options.formatter(rounded) : rounded;
    }
  });
}

/**
 * Stagger entrance animation for child elements
 */
export function staggerEntrance(parentSelectorOrEl, childSelector, options = {}) {
  const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isReduced) return;

  const parent = typeof parentSelectorOrEl === 'string'
    ? document.querySelector(parentSelectorOrEl)
    : parentSelectorOrEl;
  if (!parent) return;

  const targets = parent.querySelectorAll(childSelector);
  if (!targets || targets.length === 0) return;

  gsap.fromTo(
    targets,
    {
      opacity: 0,
      y: options.y || 16,
      scale: options.scale || 0.98
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: options.duration || 0.55,
      stagger: options.stagger || 0.08,
      ease: EASINGS.expoOut,
      delay: options.delay || 0.05
    }
  );
}

/**
 * Celebratory Brand Confetti Burst
 * Uses Qudra Triad: Turquoise (#00B8B8), Amber Gold (#FFC107), Emerald (#10B981)
 */
export function triggerCelebration(origin = { x: 0.5, y: 0.6 }) {
  const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isReduced) return;

  // First burst
  confetti({
    particleCount: 45,
    spread: 60,
    origin,
    colors: ['#00B8B8', '#FFC107', '#10B981', '#1A1A1A'],
    disableForReducedMotion: true
  });

  // Second delayed star burst
  setTimeout(() => {
    confetti({
      particleCount: 30,
      angle: 60,
      spread: 55,
      origin: { x: origin.x - 0.1, y: origin.y },
      colors: ['#00B8B8', '#FFC107'],
      shapes: ['circle', 'square']
    });
    confetti({
      particleCount: 30,
      angle: 120,
      spread: 55,
      origin: { x: origin.x + 0.1, y: origin.y },
      colors: ['#FFC107', '#10B981'],
      shapes: ['circle', 'square']
    });
  }, 150);
}

/**
 * Tactile Micro-Pulse for buttons or badges on click
 */
export function pulseElement(element) {
  if (!element) return;
  const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isReduced) return;

  gsap.fromTo(
    element,
    { scale: 0.92 },
    { scale: 1, duration: 0.35, ease: EASINGS.backOut }
  );
}
