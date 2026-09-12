import Prism from "prismjs";

// Language support has to be imported explicitly — Prism only highlights
// languages that are loaded. `sql` covers the SQL/DAX snippets, `python` the
// pandas and scikit-learn ones in the notebook.
import "prismjs/components/prism-sql";
import "prismjs/components/prism-python";
import "prismjs/themes/prism-okaidia.css";

export function initializePrism() {
	Prism.highlightAll();
}
