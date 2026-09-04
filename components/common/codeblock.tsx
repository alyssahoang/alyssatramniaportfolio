import React, { useEffect } from "react";
import { initializePrism } from "../../prism-setup";

interface CodeBlockProps {
	language: string;
	code: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ language, code }) => {
	useEffect(() => {
		initializePrism();
	}, []);

	return (
		<div className="code-block">
			<header className="code-header">{language}</header>
			<pre style={{ margin: "0" }}>
				<code className={`language-${language} codeSec`}>{code}</code>
			</pre>
		</div>
	);
};

export default CodeBlock;
