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

  const modalElements = document.querySelectorAll("[rs-modal-element]");

  modalElements.forEach((el) => {
    const attr = el.getAttribute("rs-modal-element");

    // === OPEN BUTTON ===
    if (attr.startsWith("open-")) {
      const modalId = attr.replace("open-", "modal-");
      el.setAttribute("role", "button");
      el.setAttribute("aria-controls", modalId);
      el.setAttribute("aria-expanded", "false");

      el.addEventListener("click", () => {
        const modal = document.querySelector(`[rs-modal-element="${modalId}"]`);
        if (!modal) return;

        // Open modal
        modal.classList.add("rsOpenModalPopUp");
        modal.focus();
        el.setAttribute("aria-expanded", "true");
      });
      el.style.cursor = "pointer";
    }

    // === MODAL WRAPPER ===
    if (attr.startsWith("modal-")) {
      el.setAttribute("role", "dialog");
      el.setAttribute("aria-modal", "true");
      el.setAttribute("tabindex", "-1");

      const modalId = attr;
      el.setAttribute("aria-labelledby", `${modalId}-title`);
      el.setAttribute("aria-describedby", `${modalId}-desc`);
    }

    // === CLOSE BUTTON ===
    if (attr.startsWith("close-")) {
      el.setAttribute("role", "button");
      el.setAttribute("aria-label", "Close Modal");

      el.addEventListener("click", () => {
        const modalAttr = attr.replace("close-", "modal-");
        const modal = document.querySelector(`[rs-modal-element="${modalAttr}"]`);
        if (!modal) return;

        // Close modal
        modal.classList.remove("rsOpenModalPopUp");

        // Reset iframe sources
        modal.querySelectorAll("iframe").forEach((iframe) => {
          if (iframe.hasAttribute("src")) {
            iframe.setAttribute("src", iframe.getAttribute("src"));
          }
        });

        // Update open button state
        const openBtn = document.querySelector(`[rs-modal-element="open-${modalAttr.replace("modal-", "")}"]`);
        if (openBtn) openBtn.setAttribute("aria-expanded", "false");
      });
      el.style.cursor = "pointer";
    }
  });

  // === ESC KEY CLOSE ===
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      document.querySelectorAll("[rs-modal-element^='modal-']").forEach((modal) => {
        if (modal.classList.contains("rsOpenModalPopUp")) {
          modal.classList.remove("rsOpenModalPopUp");

          const id = modal.getAttribute("rs-modal-element").replace("modal-", "");
          const openBtn = document.querySelector(`[rs-modal-element="open-${id}"]`);
          if (openBtn) openBtn.setAttribute("aria-expanded", "false");
        }
      });
    }
  });
})();
