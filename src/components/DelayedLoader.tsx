import { useEffect, useState } from "react";

// The idea is to avoid flashing the loader in case the data is fetched quickly.
// An alternative that I'm eager to try out is to see whether we can use
// navigator.connection.effectiveType to determine whether to show the loader or
// not.

// Indended to test this component with React testing library but had some trouble with fake timers.

const DEFAULT_DELAY = 250;

// TODO: document, e.g. that delay is in MS
interface DelayedLoaderProps {
  delay?: number;
  children: React.ReactNode;
}

export function DelayedLoader({
  delay = DEFAULT_DELAY,
  children,
}: DelayedLoaderProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(true);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [delay]);

  return <>{show ? children : null}</>;
}
