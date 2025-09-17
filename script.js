(function () {
	// Minimal entry animations injected and controlled entirely from JS.
	// - Respects prefers-reduced-motion
	// - Animates header, panel and staggered gallery thumbnails

	const css = `
	.js-anim-hidden { opacity: 0; transform: translateY(8px); transition: opacity .42s ease, transform .42s cubic-bezier(.2,.9,.22,1); }
	.js-anim-revealed { opacity: 1; transform: translateY(0); }
	.js-anim-fade { opacity: 0; transition: opacity .42s ease; }
	.js-anim-fade.js-anim-revealed { opacity: 1; }
	`;

	function injectStyle(s) {
		const style = document.createElement('style');
		style.setAttribute('data-js-anim', 'true');
		style.appendChild(document.createTextNode(s));
		document.head.appendChild(style);
	}

	function prefersReducedMotion() {
		try {
			return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		} catch (e) {
			return false;
		}
	}

	function revealWithStagger(nodes, opts = {}) {
		const { delay = 80, initial = 120 } = opts;
		nodes.forEach((el, i) => {
			const ms = initial + i * delay;
			setTimeout(() => el.classList.add('js-anim-revealed'), ms);
		});
	}

	document.addEventListener('DOMContentLoaded', () => {
		// inject CSS once
		injectStyle(css);

		if (prefersReducedMotion()) {
			// If user prefers reduced motion, avoid animations — just make elements visible
			document.querySelectorAll('.js-anim-hidden, .js-anim-fade').forEach(el => el.classList.add('js-anim-revealed'));
			return;
		}

		// Header elements
		const header = document.querySelector('.site-header');
		const logo = document.querySelector('.logo');
		const title = document.querySelector('.brand .title');
		const panel = document.querySelector('.panel');

		if (header) header.classList.add('js-anim-hidden');
		if (logo) logo.classList.add('js-anim-hidden');
		if (title) title.classList.add('js-anim-hidden');
		if (panel) panel.classList.add('js-anim-hidden');

		// Gallery thumbnails
		const thumbs = Array.from(document.querySelectorAll('.gallery .thumb'));
		thumbs.forEach(t => t.classList.add('js-anim-hidden'));

		// Small delay before starting reveals for a subtle entrance
		setTimeout(() => {
			// reveal header elements together
			[header, logo, title].filter(Boolean).forEach(el => el.classList.add('js-anim-revealed'));
			// reveal panel
			if (panel) setTimeout(() => panel.classList.add('js-anim-revealed'), 80);
			// stagger thumbs
			revealWithStagger(thumbs, { delay: 60, initial: 160 });
		}, 120);
	});
})();

