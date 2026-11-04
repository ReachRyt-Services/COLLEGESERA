import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop ensures that navigating between pages (e.g. from footer links,
 * popular searches, breadcrumbs, or search suggestions) instantly scrolls
 * the viewport back to the top of the page.
 */
const ScrollToTop = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    // Immediate scroll to top on route change
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant" as ScrollBehavior,
    });
  }, [pathname, search]);

  return null;
};

export default ScrollToTop;
