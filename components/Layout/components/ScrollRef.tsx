"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export const ScrollRef = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "instant" });
  }, [pathname]);

  return <div ref={ref} />;
};
