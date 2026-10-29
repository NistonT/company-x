import { Header } from "@/widgets";
import { PropsWithChildren } from "react";

export const HeaderLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};
