import { useEffect, useState } from "react";

// The idea is to avoid flashing the loader in case the data is fetched quickly.
// An alternative that I'm eager to try out is to see whether we can use
// navigator.connection.effectiveType to determine whether to show the loader or
// not.

// TODO: document, e.g. that delay is in MS
interface DelayedLoaderProps {
  delay?: number;
  children: React.ReactNode;
}

export function DelayedLoader({ delay = 250, children }: DelayedLoaderProps) {
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
