
import { useEffect, useRef, useState } from "react";

interface ScrollAnimationOptions {
  threshold?: number; // Value between 0 and 1 indicating percentage of element visible
  rootMargin?: string; // CSS margin string
  animateOnce?: boolean; // If true, animation only happens once
}

export function useScrollAnimation(options: ScrollAnimationOptions = {}) {
  const {
    threshold = 0.1,
    rootMargin = "0px",
    animateOnce = true
  } = options;
  
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (animateOnce) {
            observer.unobserve(element);
          }
        } else if (!animateOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    
    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, animateOnce]);

  return { ref, isVisible };
}
