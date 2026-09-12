import { useCallback, useEffect, useRef, useState } from "react";
import { trackEvent } from "../../../utils/clarity";

// Clipboard write with a "Copied ✓" flash, replacing the cheat sheet's original
// vanilla-JS delegated click handler. `copied` holds the key most recently
// copied so a single hook can drive a whole row of swatches.
export const useCopy = (resetAfter = 1100) => {
	const [copied, setCopied] = useState<string | null>(null);
	const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(
		() => () => {
			if (timer.current) clearTimeout(timer.current);
		},
		[]
	);

	const flash = useCallback(
		(key: string) => {
			setCopied(key);
			if (timer.current) clearTimeout(timer.current);
			timer.current = setTimeout(() => setCopied(null), resetAfter);
		},
		[resetAfter]
	);

	const copy = useCallback(
		(text: string, key = text) => {
			// execCommand fallback for Safari/http contexts, where the async
			// clipboard API is unavailable or rejects.
			const fallback = () => {
				const area = document.createElement("textarea");
				area.value = text;
				area.style.position = "fixed";
				area.style.opacity = "0";
				document.body.appendChild(area);
				area.select();
				try {
					document.execCommand("copy");
					flash(key);
				} catch {
					/* clipboard unavailable — nothing useful to show the user */
				}
				document.body.removeChild(area);
			};

			if (navigator.clipboard?.writeText) {
				navigator.clipboard.writeText(text).then(() => flash(key), fallback);
			} else {
				fallback();
			}

			trackEvent("cheat_sheet_copy", { value: text.slice(0, 60) });
		},
		[flash]
	);

	return { copy, copied };
};
