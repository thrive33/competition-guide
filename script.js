(function(){
	'use strict';

	const $ = (sel, root=document) => root.querySelector(sel);
	const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));

	// Theme toggle
	const themeToggle = $('#themeToggle');
	const applyTheme = (mode) => {
		if(mode === 'light') document.body.classList.add('light');
		else document.body.classList.remove('light');
		localStorage.setItem('theme', mode);
		themeToggle.textContent = mode === 'light' ? '🌞' : '🌙';
	};
	const preferred = localStorage.getItem('theme') || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
	applyTheme(preferred);
	themeToggle.addEventListener('click', () => {
		applyTheme(document.body.classList.contains('light') ? 'dark' : 'light');
	});

	// Search filter
	const searchInput = $('#search');
	const cards = $$('#cards .card');
	const normalize = (s) => (s || '').toLowerCase();
	const filter = () => {
		const q = normalize(searchInput.value);
		cards.forEach(card => {
			const hay = normalize(card.innerText + ' ' + (card.getAttribute('data-keywords')||''));
			card.style.display = hay.includes(q) ? '' : 'none';
		});
	};
	searchInput.addEventListener('input', filter);

	// Footer year
	const y = new Date().getFullYear();
	const yearEl = $('#year');
	if(yearEl) yearEl.textContent = String(y);
})();
