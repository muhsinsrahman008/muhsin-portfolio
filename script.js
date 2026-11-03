(() => {
 const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
 const items = document.querySelectorAll('.reveal');
 if ('IntersectionObserver' in window && !reduced) {
  const observer = new IntersectionObserver((entries, obs) => entries.forEach(entry => {
   if (entry.isIntersecting) { entry.target.classList.add('visible'); obs.unobserve(entry.target); }
  }), {threshold:.12});
  items.forEach(item => observer.observe(item));
 } else items.forEach(item => item.classList.add('visible'));
 const links = [...document.querySelectorAll('.rail nav a')];
 const sections = [...document.querySelectorAll('main section[id]')];
 if ('IntersectionObserver' in window) {
  const navObserver = new IntersectionObserver(entries => entries.forEach(entry => {
   if (entry.isIntersecting) links.forEach(link => link.classList.toggle('active', link.hash === '#' + entry.target.id));
  }), {rootMargin:'-35% 0px -55% 0px'});
  sections.forEach(section => navObserver.observe(section));
 }
 document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', event => {
  const target = document.querySelector(link.getAttribute('href'));
  if (target) { event.preventDefault(); target.scrollIntoView({behavior:reduced?'auto':'smooth'}); }
 }));
})();