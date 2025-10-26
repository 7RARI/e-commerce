// Small interactions for the portfolio page
document.addEventListener('DOMContentLoaded', function(){
	// set current year in footer
	const yearEl = document.getElementById('year');
	if(yearEl) yearEl.textContent = new Date().getFullYear();

	// mobile nav toggle
	const navToggle = document.getElementById('nav-toggle');
	const siteNav = document.getElementById('site-nav');
	if(navToggle && siteNav){
		navToggle.addEventListener('click', function(){
			siteNav.classList.toggle('open');
		});
		// close nav when clicking a link
		siteNav.querySelectorAll('a').forEach(a => a.addEventListener('click', ()=> siteNav.classList.remove('open')));
	}

	// smooth scroll for in-page links
		document.querySelectorAll('a[href^="#"]').forEach(anchor => {
			anchor.addEventListener('click', function (e) {
				const targetId = this.getAttribute('href').slice(1);
				const target = document.getElementById(targetId);
				if(target){
					e.preventDefault();
					target.scrollIntoView({behavior:'smooth',block:'start'});
				}
			});
		});

		// Scrollspy: highlight active nav link using IntersectionObserver
		const sections = document.querySelectorAll('main section[id]');
		const navLinks = document.querySelectorAll('.site-nav a');
		if(window.IntersectionObserver && sections.length){
			const obsOptions = {root:null,rootMargin:'-20% 0px -35% 0px',threshold:0};
			const observer = new IntersectionObserver((entries)=>{
				entries.forEach(entry=>{
					const id = entry.target.id;
					const link = document.querySelector('.site-nav a[href="#'+id+'"]');
					if(link){
						if(entry.isIntersecting){
							navLinks.forEach(l=>l.classList.remove('active'));
							link.classList.add('active');
						}
					}
				});
			}, obsOptions);
			sections.forEach(s=>observer.observe(s));
		}

		// close nav on ESC or clicking outside (mobile)
		document.addEventListener('keydown', (e)=>{
			if(e.key === 'Escape' && siteNav.classList.contains('open')) siteNav.classList.remove('open');
		});
		document.addEventListener('click', (e)=>{
			if(siteNav.classList.contains('open')){
				const inside = siteNav.contains(e.target) || navToggle.contains(e.target);
				if(!inside) siteNav.classList.remove('open');
			}
		});
});

