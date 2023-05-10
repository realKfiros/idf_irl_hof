import {motion} from "framer-motion";
import {css} from "@emotion/react";

const variants = {
	open: {
		y: 0,
		opacity: 1,
		pointerEvents: 'auto',
		transition: {
			y: {stiffness: 1000, velocity: -100}
		},
	},
	closed: {
		y: 50,
		opacity: 0,
		pointerEvents: 'none',
		transition: {
			y: {stiffness: 1000}
		},
	}
};

const styleMenuLink = css`
	display: flex;
	align-items: center;
	padding: 25px;
	list-style: none;
	margin-bottom: 20px;

	._icon {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		margin: 0 auto;
	}

	._text {
		border-radius: 5px;
		width: 200px;
		height: 20px;
		flex: 1;
	}

	a {
		color: inherit;
		text-decoration: inherit;
		display: flex;
	}
`;
export const MenuLink = ({icon, link, text}) =>
{
	return <motion.li css={styleMenuLink}
					  variants={variants as any}
					  whileHover={{scale: 1.1}}
					  whileTap={{scale: 0.95}}>
		<a href={link} target="_blank">
			<div className="_icon">
				<i className={icon}></i>
			</div>
			<div className="_text">{text}</div>
		</a>
	</motion.li>;
};