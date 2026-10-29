import { PropsWithChildren } from "react";
import { BrowserRouter } from "react-router";

export const RouterProvider = ({ children }: PropsWithChildren) => {
	return <BrowserRouter>{children}</BrowserRouter>;
};
