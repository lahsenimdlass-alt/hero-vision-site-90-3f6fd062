import { useEffect } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

const GA_MEASUREMENT_ID = "G-S9EWE09L4T";

const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    if (typeof window.gtag !== "function") return;
    const pagePath = location.pathname + location.search;
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: pagePath,
      page_title: document.title,
      page_location: window.location.href,
    });
    window.gtag("event", "page_view", {
      page_path: pagePath,
      page_title: document.title,
      page_location: window.location.href,
    });
  }, [location.pathname, location.search]);

  return null;
};

export default AnalyticsTracker;
