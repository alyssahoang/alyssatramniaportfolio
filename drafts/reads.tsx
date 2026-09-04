import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";

// Static replacement for the old next.config redirect /reads -> /aboutme/reads.
const TARGET = "/aboutme/reads/";

export default function ReadsRedirect() {
	const router = useRouter();
	useEffect(() => {
		router.replace(TARGET);
	}, [router]);
	return (
		<Head>
			<meta httpEquiv="refresh" content={`0; url=${TARGET}`} />
			<link rel="canonical" href={TARGET} />
			<title>Redirecting…</title>
		</Head>
	);
}
