import Script from "next/script";

const Scripts: React.FC = () => {
	const handleJumpToFirst = () => {
		window.scrollTo(0, 0);
	};

	return (
		<div className="fixed right-5 bottom-5 flex items-center space-x-4">
			<button
				onClick={handleJumpToFirst}
				className="flex items-center flex-col border-l-indigo-50 rounded-3xl"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="32"
					height="32"
					fill="currentColor"
					className="bi bi-chevron-double-up"
					viewBox="0 0 16 16"
				>
					<path d="M7.646 2.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 3.707 2.354 9.354a.5.5 0 1 1-.708-.708l6-6z" />
					<path d="M7.646 6.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 7.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z" />
				</svg>
				Go to top
			</button>
		</div>
	);
};

Scripts.displayName = "Scripts";

export default Scripts;
