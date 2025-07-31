(function(){
  document.addEventListener("DOMContentLoaded", () => {
    // Inject CSS into page head with custom attribute
    const style = document.createElement('style');
    style.setAttribute('data-scroll-style', '');
    style.innerHTML = `[data-scroll]{opacity:0;transition:opacity .8s ease-in-out}[data-scroll=in]{opacity:1}`;
    document.head.appendChild(style);

    // Select all elements to animate
    const elements = document.querySelectorAll('[data-scroll="out"]');

    // Intersection Observer config
    const OFFSET_OPTIONS = {
      rootMargin: "0px 0px -15% 0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          el.setAttribute("data-scroll", "in");
          observer.unobserve(el); // Remove if you want repeat on scroll
        }
      });
    }, OFFSET_OPTIONS);

    elements.forEach(el => {
      observer.observe(el);
    });
  });
})();
