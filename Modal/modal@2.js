(function () {
  // Inject base and visible styles
  const style = document.createElement("style");
  style.textContent = `[rs-modal-element^="modal-"] { position: fixed; top: 0; left: 0; right: 0; bottom: 0; width: 100%; height: 100vh; overflow: hidden; opacity: 0; pointer-events: none; visibility: hidden; z-index: -1; background: rgba(0, 0, 0, 0.5); display: flex; align-items: center; justify-content: center; transition: opacity 0.3s ease, visibility 0.3s ease, z-index 0.3s ease; } [rs-modal-element^="modal-"].rsOpenModalPopUp { opacity: 1; pointer-events: auto; visibility: visible; z-index: 9999; }`;
  document.head.appendChild(style);

  const modalElements = document.querySelectorAll("[rs-modal-element]");

  modalElements.forEach((el) => {
    const attr = el.getAttribute("rs-modal-element");

    // === OPEN BUTTON ===
    if (attr.startsWith("open-")) {
      const modalId = attr.replace("open-", "modal-");
      const modal = document.querySelector(`[rs-modal-element="${modalId}"]`);
      if (!modal) return;

      el.setAttribute("role", "button");
      el.setAttribute("tabindex", "0");
      el.setAttribute("aria-controls", modal.id || `${modalId}-popup`);
      el.setAttribute("aria-expanded", "false");
      el.setAttribute("aria-haspopup", "dialog");
      el.setAttribute("aria-roledescription", "open-modal-trigger");

      el.addEventListener("click", () => {
        modal.classList.add("rsOpenModalPopUp");
        document.documentElement.style.overflow = "hidden";
        document.body.style.overflow = "hidden";
        modal.focus();
        el.setAttribute("aria-expanded", "true");
      });

      el.style.cursor = "pointer";
    }

    // === MODAL WRAPPER ===
    if (attr.startsWith("modal-")) {
      el.setAttribute("role", el.getAttribute("role") || "dialog");
      el.setAttribute("aria-modal", el.getAttribute("aria-modal") || "true");
      el.setAttribute("tabindex", el.getAttribute("tabindex") || "-1");

      const modalId = el.getAttribute("id") || `${attr}-popup`;
      el.id = modalId;

      if (!el.hasAttribute("aria-labelledby")) el.setAttribute("aria-labelledby", `${attr}-heading`);
      if (!el.hasAttribute("aria-describedby")) el.setAttribute("aria-describedby", `${attr}-desc`);
    }

    // === CLOSE BUTTON ===
    if (attr.startsWith("close-")) {
      const modalId = attr.replace("close-", "modal-");
      const modal = document.querySelector(`[rs-modal-element="${modalId}"]`);
      if (!modal) return;

      el.setAttribute("role", "button");
      el.setAttribute("tabindex", "0");
      el.setAttribute("aria-controls", modal.id || `${modalId}-popup`);
      el.setAttribute("aria-label", el.getAttribute("aria-label") || "Close modal");
      el.setAttribute("aria-haspopup", "dialog");
      el.setAttribute("aria-roledescription", "close-modal-trigger");

      el.addEventListener("click", () => {
        closeModal(modal, modalId);
      });
      el.style.cursor = "pointer";
    }
  });

  function closeModal(modal, modalAttr) {
    modal.classList.remove("rsOpenModalPopUp");

    // Reset iframe sources to stop video playback
    modal.querySelectorAll("iframe").forEach((iframe) => {
      if (iframe.hasAttribute("src")) {
        iframe.setAttribute("src", iframe.getAttribute("src"));
      }
    });

    // Restore page scroll
    document.documentElement.style.overflowY = "auto";
    document.body.style.overflowY = "auto";

    // Update open button state
    const openBtn = document.querySelector(`[rs-modal-element="open-${modalAttr.replace("modal-", "")}"]`);
    if (openBtn) openBtn.setAttribute("aria-expanded", "false");
  }

  // === ESC KEY CLOSE ===
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      document.querySelectorAll("[rs-modal-element^='modal-']").forEach((modal) => {
        if (modal.classList.contains("rsOpenModalPopUp")) {
          const modalAttr = modal.getAttribute("rs-modal-element");
          closeModal(modal, modalAttr);
        }
      });
    }
  });
})();
