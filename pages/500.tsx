import React from "react";
import Link from "next/link";

import { METADATA } from "../constants";
import Layout from "@/components/common/layout";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import Scripts from "@/components/common/scripts";

export default function ServerError() {
	return (
		<>
			<Layout title={`500 — Something broke — ${METADATA.title}`}>
				<Header />
				<div className="fixed top-0 left-0 h-screen w-screen bg-gray-900 -z-1"></div>
				<main className="section-container min-h-screen flex flex-col items-center justify-center text-center select-none py-24">
					<h1 className="text-7xl md:text-9xl font-bold text-gradient w-fit mb-8">
						500
					</h1>
					<div className="w-full max-w-xl rounded-xl border border-gray-700/60 bg-[#282a36] text-left font-mono text-sm md:text-base leading-relaxed px-5 py-4 md:px-7 md:py-5 mb-8 overflow-x-auto">
						<p className="text-gray-400">-- Something broke on my side, not yours.</p>
						<p className="text-gray-400">-- Give it a moment and try again.</p>
					</div>
					<Link href="/">
						<a className="link inline-flex items-center gap-3 px-6 py-3 bg-[#219190] hover:bg-[#1F5673] text-white text-base font-medium rounded-full transition-all duration-[10ms] hover:shadow-lg hover:shadow-[#219190]/25 hover:-translate-y-0.5">
							← Back to home
						</a>
					</Link>
				</main>
				<Footer />
				<Scripts />
			</Layout>
		</>
	);
}
