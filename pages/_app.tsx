import type { AppProps } from 'next/app';
import {AnimatePresence} from "framer-motion";
import 'bootstrap-icons/font/bootstrap-icons.css';

export default ({ Component, pageProps }: AppProps) => <AnimatePresence mode="wait" initial>
	<Component {...pageProps} />
</AnimatePresence>;
