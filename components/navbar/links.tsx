import {motion} from "framer-motion";
import {MenuLink} from "@/components/navbar/menu_link";
import {css} from "@emotion/react";

const variants = {
	open: {
		transition: {staggerChildren: 0.07, delayChildren: 0.2}
	},
	closed: {
		transition: {staggerChildren: 0.05, staggerDirection: -1}
	}
};

const easterEggHide = {
	open: {
		opacity: 1,
		pointerEvents: 'auto',
	},
	closed: {
		opacity: 0,
		pointerEvents: 'none',
	},
};

const styleLinks = css`
	> * {
		position: absolute;
		width: 230px;
	}
	
	._links {
		top: 100px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	
	._footer {
		bottom: 25px;
		font-size: 0.8rem;
		margin: auto 0;
		text-align: center;
	}
`;
export const Links = () => <div css={styleLinks}>
	<motion.ul className="_links" variants={variants}>
		{itemIds.map((props, i) => <MenuLink {...props} key={i} />)}
	</motion.ul>
	<motion.div className="_footer" variants={easterEggHide as any} onClick={() => alert(Math.random() > 0.5 ? 'חוק 6' : 'מטוס')}>Made with ♥ by realKfiros</motion.div>
</div>;

const itemIds = [
	{icon: 'bi bi-file-text', text: 'המסמך המלא', link: process.env.DOCUMENT_URL},
	{icon: 'bi bi-whatsapp', text: 'הצטרפו לקבוצה שלנו', link: process.env.WHATSAPP_GROUP},
	{icon: 'bi bi-github', text: 'Fork me on GitHub', link: process.env.GITHUB_REPO}
];