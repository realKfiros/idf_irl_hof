import Head from 'next/head';
import {motion} from 'framer-motion';
import {css} from "@emotion/react";
import {useRouter} from "next/router";
import {Spinner} from "@/components/spinner";
import {useEffect, useState} from "react";
import classNames from "classnames";
import {NavBar} from "@/components/navbar";

const styleApp = css`
	max-width: 100vw;
	max-height: 100vh;
	font-size: 1.4rem;
	overflow: hidden;

	* {
		font-family: sans-serif;
	}

	> ._content_container {
		display: flex;
		position: fixed;
		transform: translate(-8px, -8px);
		
		overflow-x: hidden;
		
		height: 100%;
		width: 100%;
		
		align-items: center;
		text-align: center;
		background-color: #000;
		color: #fff;

		> ._content_area {
			margin: auto;
			letter-spacing: 0;

			._quote {
				width: 100%;
				text-align: center;
				white-space: break-spaces;

			}
		}

		._refresh {
			margin: 100px auto;
			font-size: 80px;
			height: 80px;
			width: 80px;
			cursor: pointer;
			
			&._loading {
				cursor: default;
				pointer-events: none;
			}
		}
	}
`;
export default ({quote}) =>
{
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	useEffect(() =>
	{
		if (loading)
			router.reload();
	}, [loading]);

	return <>
		<Head>
			<title>היכל התהילה של צה״ל במציאות</title>
			<meta name="description" content="מטוס חוק 6 ✈️✈️✈️"/>
			<meta name="viewport" content="width=device-width, initial-scale=1"/>
			<link rel="icon" href="/favicon.ico"/>
		</Head>
		<div css={styleApp}>
			<NavBar />
			<div className="_content_container">
				<div className="_content_area">
					<motion.div className="_quote" initial={{opacity: 0, scale: 0.5}}
								animate={{opacity: 0.7, scale: 1}}
								transition={{
									duration: 0.05,
									ease: [0, 0.71, 0.2, 1.01],
									scale: {
										type: "spring",
										damping: 5,
										stiffness: 100,
										restDelta: 0.001
									},
								}}>&rlm;{quote}</motion.div>
					<div className={classNames({'_refresh': true, '_loading': loading})}>
						{loading ? <Spinner /> : <motion.div whileHover={{scale: 1.2}}
															 whileTap={{scale: 0.9}}
															 transition={{type: 'spring'}}
															 style={{fontSize: 80}}
															 onClick={() => setLoading(true)}>
							<i className="bi bi-arrow-clockwise"></i>
						</motion.div>}
					</div>
				</div>
			</div>
		</div>
	</>;
}

export async function getServerSideProps()
{
	const baseUrl = process.env.NODE_ENV === 'production' ? 'https://hall-of-fame.kfiros.dev/' : 'http://localhost:3000/';
	const req = await fetch(baseUrl + 'api/random_quote');
	const res = await req.text();

	return {
		props: {
			quote: res
		}
	}
}