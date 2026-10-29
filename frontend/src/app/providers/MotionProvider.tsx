import { LazyMotion, domAnimation } from "motion/react";
import { PropsWithChildren } from "react";

export const MotionProvider = ({ children }: PropsWithChildren) => {
	return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
};
