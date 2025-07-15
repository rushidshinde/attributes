(function(){
  document.addEventListener('DOMContentLoaded', () => {
    const groups = document.querySelectorAll('[rs-accordion-element="accordion-group"]');

    groups.forEach(group => {
      const accordions = group.querySelectorAll('[rs-accordion-element="accordion"]');
      const initialIndex = parseInt(group.getAttribute('rs-accordian-initial'), 10) - 1;
      const singleOpen = group.getAttribute('rs-accordian-single') === 'true';

      accordions.forEach((accordion, index) => {
        const trigger = accordion.querySelector('[rs-accordion-element="trigger"]');

        const setActive = (active) => {
          const elements = [accordion, ...accordion.querySelectorAll('[rs-accordion-element]')];
          elements.forEach(el => {
            if (active) {
              el.classList.add('is-active-accordian');
            } else {
              el.classList.remove('is-active-accordian');
            }
          });
        };

        const openAccordion = () => {
          if (singleOpen) {
            accordions.forEach(other => {
              if (other !== accordion) {
                const elements = [other, ...other.querySelectorAll('[rs-accordion-element]')];
                elements.forEach(el => el.classList.remove('is-active-accordian'));
              }
            });
          }
          setActive(true);
        };

        const closeAccordion = () => {
          setActive(false);
        };

        trigger.addEventListener('click', () => {
          const isOpen = accordion.classList.contains('is-active-accordian');
          if (isOpen) {
            closeAccordion();
          } else {
            openAccordion();
          }
        });

        if (!isNaN(initialIndex) && index === initialIndex) {
          openAccordion();
        }
      });
    });
  });
})();
