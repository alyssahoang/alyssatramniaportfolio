import Prism from "prismjs";

// Import the necessary language support (e.g., JavaScript)
import "prismjs/components/prism-sql";
import "prismjs/themes/prism-okaidia.css";

export function initializePrism() {
	Prism.highlightAll();
}
