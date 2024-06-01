import { PropsWithChildren } from "react";
import { NextUIProvider as Provider } from "@nextui-org/react";

export const NextUIProvider = ({ children }: PropsWithChildren) => {
  <Provider>{children}</Provider>;
};
