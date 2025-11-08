  (function () {
    // Inject base and visible styles
    const style = document.createElement("style");
    style.textContent = `
      [rs-modal-element^="modal-"] {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100vh;
        overflow: hidden;
        opacity: 0;
        pointer-events: none;
        visibility: hidden;
        z-index: -1;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: opacity 0.3s ease, visibility 0.3s ease, z-index 0.3s ease;
      }

      [rs-modal-element^="modal-"].rsOpenModalPopUp {
        opacity: 1;
        pointer-events: auto;
        visibility: visible;
        z-index: 9999;         
      }
    `;
    document.head.appendChild(style);

    // Get all elements with rs-modal-element attribute
    const modalElements = document.querySelectorAll("[rs-modal-element]");

    modalElements.forEach((el) => {
      const attr = el.getAttribute("rs-modal-element");

      // === OPEN MODAL BUTTON ===
      if (attr.startsWith("open-")) {
        el.addEventListener("click", () => {
          const modalAttr = attr.replace("open-", "modal-");
          const modal = document.querySelector(`[rs-modal-element="${modalAttr}"]`);
          if (modal) modal.classList.add("rsOpenModalPopUp");
        });
        el.style.cursor = "pointer";
      }

      // === CLOSE MODAL BUTTON ===
      if (attr.startsWith("close-")) {
        el.addEventListener("click", () => {
          const modalAttr = attr.replace("close-", "modal-");
          const modal = document.querySelector(`[rs-modal-element="${modalAttr}"]`);
          if (!modal) return;

          modal.classList.remove("rsOpenModalPopUp");

          // Reset iframes inside modal
          modal.querySelectorAll("iframe").forEach((iframe) => {
            if (iframe.hasAttribute("src")) {
              iframe.setAttribute("src", iframe.getAttribute("src"));
            }
          });
        });
        el.style.cursor = "pointer";
      }
    });

    // === ESC KEY CLOSE ===
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        modalElements.forEach((el) => {
          const attr = el.getAttribute("rs-modal-element");
          if (attr.startsWith("close-")) el.click();
        });
      }
    });
  })();
