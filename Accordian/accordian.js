(function(){
  document.addEventListener('DOMContentLoaded', () => {
    const groups = document.querySelectorAll('[rs-accordion-element="accordion-group"]');

    groups.forEach(group => {
      const accordions = group.querySelectorAll('[rs-accordion-element="accordion"]');
      const initialIndex = parseInt(group.getAttribute('rs-accordian-initial'), 10) - 1;
      const singleOpen = group.getAttribute('rs-accordian-single') === 'true';

      accordions.forEach((accordion, index) => {
        const trigger = accordion.querySelector('[rs-accordion-element="trigger"]');
        const content = accordion.querySelector('[rs-accordion-element="content"]');

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

        const expand = () => {
          if (!content) return;
          content.style.maxHeight = content.scrollHeight + 'px';
        };

        const collapse = () => {
          if (!content) return;
          content.style.maxHeight = content.scrollHeight + 'px';
          void content.offsetHeight;
          content.style.maxHeight = '0px';
        };

        const openAccordion = () => {
          if (singleOpen) {
            accordions.forEach(other => {
              if (other !== accordion) {
                const otherContent = other.querySelector('[rs-accordion-element="content"]');
                const elements = [other, ...other.querySelectorAll('[rs-accordion-element]')];
                elements.forEach(el => el.classList.remove('is-active-accordian'));
                if (otherContent) {
                  otherContent.style.maxHeight = otherContent.scrollHeight + 'px';
                  void otherContent.offsetHeight;
                  otherContent.style.maxHeight = '0px';
                }
              }
            });
          }
          setActive(true);
          expand();
        };

        const closeAccordion = () => {
          collapse();
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

        if (content) {
          window.addEventListener('resize', () => {
            if (accordion.classList.contains('is-active-accordian')) {
              content.style.maxHeight = content.scrollHeight + 'px';
            }
          });
        }

        if (!isNaN(initialIndex) && index === initialIndex) {
          openAccordion();
        }
      });
    });
  });
})();