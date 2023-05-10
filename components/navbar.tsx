import {motion, useCycle} from "framer-motion";
import {useRef} from "react";
import {useDimensions} from "@/hooks/dimensions";
import {css} from "@emotion/react";
import {MenuToggle} from "@/components/navbar/menu_toggle";
import {Links} from "@/components/navbar/links";

// based on https://www.framer.com/motion/examples/#variants
const sidebar = {
	open: (height = 1000) => ({
		clipPath: `circle(${height * 2 + 200}px at 260px 40px)`,
		transition: {
			type: "spring",
			stiffness: 20,
			restDelta: 2
		}
	}),
	closed: {
		clipPath: "circle(30px at 260px 40px)",
		transition: {
			delay: 0.5,
			type: "spring",
			stiffness: 400,
			damping: 40
		}
	}
};

const styleNavBar = css`
	direction: rtl;
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	width: 300px;
	z-index: 100;

	overflow: hidden;

	._background {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		width: 300px;
		background: #fff;
	}
`;
export const NavBar = () =>
{
	const [isOpen, toggleOpen] = useCycle(false, true);
	const containerRef = useRef(null);
	const { height } = useDimensions(containerRef);

	return <motion.div css={styleNavBar}
					   initial={false}
					   animate={isOpen ? "open" : "closed"}
					   custom={height}
					   ref={containerRef}>
		<motion.div className="_background" variants={sidebar}/>
		<MenuToggle toggle={() => toggleOpen()} />
		<Links />
	</motion.div>
};