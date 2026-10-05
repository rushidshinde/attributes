/**
 * [attributes by RS] Javascript Form Validation
 * Custom error bubble system matching default browser bubble aesthetic across all devices.
 */

// List of public/disallowed email domains for "businessEmail" validation
const disallowedDomains = [
  "gmail.com",
  "yahoo.com",
  "outlook.com",
  "aol.com",
  "hotmail.com",
  "icloud.com",
  "live.com",
  "me.com",
  "mail.com",
  "protonmail.com",
  "inbox.com",
  "zoho.com",
  "ymail.com",
  "rocketmail.com",
  "fastmail.com",
  "tutanota.com",
  "gmx.com",
  "mailinator.com",
  "yandex.com",
  "qq.com",
  "163.com",
  "126.com",
  "sina.com",
  "yeah.net",
];

// Predefined regex patterns for common input field types
const patterns = {
  text: "^[^0-9$@#%&*+_=!^₹€£¥₣?.,`~:;'\"\\)\\(><\\}\\{\\-\\/\\[\\]\\|]{0,}$",
  number: "^[0-9]+$",
  textAndNumber: "^[^$@#%&*+_=!^₹€£¥₣?.,`~:;'\"\\)\\(><\\}\\{\\-\\/\\[\\]\\|]{0,}$",
  email: "^[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9_\\-]+[.]+[a-zA-Z0-9\\-.]{2,61}$",
  businessEmail: "^[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9_\\-]+[.]+[a-zA-Z0-9\\-.]{2,61}$",
  contactNumber: "^\\+?[0-9]{6,14}$",
};

(function () {
  /**
   * Injects CSS styles for the custom error bubble into document.head.
   */
  const injectStyles = () => {
    if (document.getElementById("rs-validation-bubble-styles")) return;

    const style = document.createElement("style");
    style.id = "rs-validation-bubble-styles";
    style.textContent = `
      :root {
        --rs-bubble-bg: #ffffff;
        --rs-bubble-color: #202124;
        --rs-bubble-font-size: 13px;
        --rs-bubble-font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        --rs-bubble-border-color: #dadce0;
        --rs-bubble-border-radius: 5px;
        --rs-bubble-shadow: 0 4px 14px rgba(0, 0, 0, 0.16), 0 1px 3px rgba(0, 0, 0, 0.08);
        --rs-bubble-icon-bg: #e65100;
        --rs-bubble-icon-color: #ffffff;
        --rs-bubble-max-width: 320px;
        --rs-bubble-padding: 8px 12px;
        --rs-input-invalid-border: #d93025;
      }

      .rs-validation-bubble {
        position: absolute;
        z-index: 999999;
        display: none;
        align-items: center;
        gap: 8px;
        background: var(--rs-bubble-bg, #ffffff);
        color: var(--rs-bubble-color, #202124);
        font-family: var(--rs-bubble-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
        font-size: var(--rs-bubble-font-size, 13px);
        line-height: 1.4;
        padding: var(--rs-bubble-padding, 8px 12px);
        border-radius: var(--rs-bubble-border-radius, 5px);
        border: 1px solid var(--rs-bubble-border-color, #dadce0);
        box-shadow: var(--rs-bubble-shadow, 0 4px 14px rgba(0, 0, 0, 0.16), 0 1px 3px rgba(0, 0, 0, 0.08));
        pointer-events: auto;
        opacity: 0;
        transform: translateY(4px);
        transition: opacity 0.15s ease, transform 0.15s ease;
        width: max-content;
        max-width: min(calc(100vw - 24px), var(--rs-bubble-max-width, 320px));
        box-sizing: border-box;
      }

      @media (max-width: 480px) {
        .rs-validation-bubble {
          --rs-bubble-font-size: 12px;
          --rs-bubble-padding: 6px 10px;
        }
      }

      @media (max-width: 370px) {
        .rs-validation-bubble {
          max-width: 70vw;
        }
      }

      .rs-validation-bubble.rs-visible {
        display: flex;
        opacity: 1;
        transform: translateY(0);
      }

      .rs-bubble-icon {
        flex-shrink: 0;
        width: 18px;
        height: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .rs-bubble-icon svg {
        width: 18px;
        height: 18px;
        display: block;
      }

      .rs-bubble-message {
        flex: 1;
        font-weight: 400;
        word-break: break-word;
      }

      /* Directional arrows (beak) */
      .rs-bubble-arrow {
        position: absolute;
        width: 8px;
        height: 8px;
        background: var(--rs-bubble-bg, #ffffff);
        border: 1px solid var(--rs-bubble-border-color, #dadce0);
        transform: rotate(45deg);
        z-index: 2;
      }

      /* When bubble is below target (arrow points UP) */
      .rs-bubble-bottom .rs-bubble-arrow {
        top: -5px;
        border-right: none;
        border-bottom: none;
      }

      /* When bubble is above target (arrow points DOWN) */
      .rs-bubble-top .rs-bubble-arrow {
        bottom: -5px;
        border-left: none;
        border-top: none;
      }

      /* Input highlighting for error state */
      .rs-input-invalid {
        border-color: var(--rs-input-invalid-border, #d93025) !important;
      }
    `;
    document.head.appendChild(style);
  };

  /**
   * Singleton Bubble Manager
   */
  const RSBubbleManager = {
    bubbleEl: null,
    arrowEl: null,
    messageEl: null,
    currentTarget: null,

    init() {
      if (this.bubbleEl) return;

      injectStyles();

      const bubble = document.createElement("div");
      bubble.className = "rs-validation-bubble";
      bubble.setAttribute("role", "alert");
      bubble.setAttribute("aria-live", "assertive");

      // Warning icon (orange square badge with white exclamation point matching native browser style)
      const icon = document.createElement("div");
      icon.className = "rs-bubble-icon";
      icon.innerHTML = `
        <svg viewBox="0 0 20 20" width="18" height="18">
          <rect width="20" height="20" rx="3.5" fill="var(--rs-bubble-icon-bg, #e65100)"/>
          <path d="M9 4.5h2v6.5H9zm0 8.5h2v2H9z" fill="var(--rs-bubble-icon-color, #ffffff)"/>
        </svg>
      `;

      const message = document.createElement("div");
      message.className = "rs-bubble-message";

      const arrow = document.createElement("div");
      arrow.className = "rs-bubble-arrow";

      bubble.appendChild(arrow);
      bubble.appendChild(icon);
      bubble.appendChild(message);

      document.body.appendChild(bubble);

      this.bubbleEl = bubble;
      this.arrowEl = arrow;
      this.messageEl = message;

      // Dismiss when clicking outside
      document.addEventListener("pointerdown", (e) => {
        if (
          this.bubbleEl &&
          !this.bubbleEl.contains(e.target) &&
          this.currentTarget !== e.target &&
          (!this.currentTarget || !this.currentTarget.contains(e.target))
        ) {
          this.hide();
        }
      });

      // Update position on window resize or scroll
      window.addEventListener("resize", () => this.updatePosition());
      window.addEventListener("scroll", () => this.updatePosition(), true);
    },

    show(targetEl, message) {
      if (!this.bubbleEl) this.init();

      this.currentTarget = targetEl;
      this.messageEl.textContent = message;

      this.bubbleEl.style.display = "flex";
      this.updatePosition();

      requestAnimationFrame(() => {
        this.updatePosition();
        this.bubbleEl.classList.add("rs-visible");
      });

      // Keep position synced while smooth scroll is animating
      let startTime = performance.now();
      const syncScroll = (now) => {
        if (!this.currentTarget || !this.bubbleEl || this.bubbleEl.style.display === "none") return;
        this.updatePosition();
        if (now - startTime < 600) {
          requestAnimationFrame(syncScroll);
        }
      };
      requestAnimationFrame(syncScroll);
    },

    updatePosition() {
      if (!this.currentTarget || !this.bubbleEl || this.bubbleEl.style.display === "none") {
        return;
      }

      const targetRect = this.currentTarget.getBoundingClientRect();
      const bubbleRect = this.bubbleEl.getBoundingClientRect();

      const scrollX = window.pageXOffset || document.documentElement.scrollLeft || 0;
      const scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;

      // Determine whether to place bubble below or above the target
      const spaceBelow = viewportHeight - targetRect.bottom;
      const neededHeight = bubbleRect.height + 12;
      const showAbove = spaceBelow < neededHeight && targetRect.top > neededHeight;

      let top = 0;
      if (showAbove) {
        top = scrollY + targetRect.top - bubbleRect.height - 8;
        this.bubbleEl.classList.remove("rs-bubble-bottom");
        this.bubbleEl.classList.add("rs-bubble-top");
      } else {
        top = scrollY + targetRect.bottom + 8;
        this.bubbleEl.classList.remove("rs-bubble-top");
        this.bubbleEl.classList.add("rs-bubble-bottom");
      }

      // Calculate horizontal positioning: left-align bubble directly with the target field
      let left = scrollX + targetRect.left;
      const maxLeft = scrollX + viewportWidth - bubbleRect.width - 12;
      const minLeft = scrollX + 12;

      if (left > maxLeft) left = maxLeft;
      if (left < minLeft) left = minLeft;

      this.bubbleEl.style.top = `${Math.round(top)}px`;
      this.bubbleEl.style.left = `${Math.round(left)}px`;

      // Position arrow relative to the target field start
      const targetAnchor = scrollX + targetRect.left + Math.min(24, targetRect.width / 2);
      let arrowLeft = targetAnchor - left - 4;
      arrowLeft = Math.max(12, Math.min(arrowLeft, bubbleRect.width - 20));
      this.arrowEl.style.left = `${Math.round(arrowLeft)}px`;
    },

    hide() {
      if (this.bubbleEl) {
        this.bubbleEl.classList.remove("rs-visible");
        this.bubbleEl.style.display = "none";
      }
      this.currentTarget = null;
    },
  };

  /**
   * Helper function to verify if an email address belongs to disallowed public domains.
   * @param {HTMLInputElement} inputEl
   * @returns {boolean}
   */
  const isDisallowedDomain = (inputEl) => {
    const domain = (inputEl.value.split("@")[1] || "").toLowerCase().trim();
    return Boolean(disallowedDomains.includes(domain));
  };

  /**
   * Validates a single input element.
   * @param {HTMLInputElement} inputEl
   * @returns {{ isValid: boolean, message: string }}
   */
  const validateInputElement = (inputEl) => {
    const value = (inputEl.value || "").trim();
    const isRequired = inputEl.required || inputEl.hasAttribute("required");

    let formType = inputEl.getAttribute("rs-form-type");
    let pattern = inputEl.getAttribute("rs-form-pattern");

    if (!pattern && formType && patterns[formType]) {
      pattern = patterns[formType];
    }

    const customError = inputEl.getAttribute("rs-form-error");

    // 1. Required field check
    if (isRequired && value.length === 0) {
      return {
        isValid: false,
        message: customError || "Please fill out this field.",
      };
    }

    // If empty and not required, skip pattern checks
    if (value.length === 0) {
      return { isValid: true, message: "" };
    }

    // 2. Business Email check
    if (formType === "businessEmail") {
      if (isDisallowedDomain(inputEl)) {
        return {
          isValid: false,
          message: customError || "Please enter a valid business email address.",
        };
      }
    }

    // 3. Pattern / Regex check
    if (pattern) {
      try {
        const regex = new RegExp(pattern, "u");
        if (!regex.test(value)) {
          return {
            isValid: false,
            message: customError || "Please enter valid data.",
          };
        }
      } catch (err) {
        console.error("Invalid regex pattern on element:", pattern, err);
      }
    }

    return { isValid: true, message: "" };
  };

  /**
   * Validates a multi-select checkbox wrapper.
   * @param {HTMLElement} wrapper
   * @returns {{ isValid: boolean, message: string }}
   */
  const validateCheckboxWrapper = (wrapper) => {
    const checkboxes = wrapper.querySelectorAll('input[type="checkbox"]');
    if (checkboxes.length === 0) return { isValid: true, message: "" };

    const isAnyChecked = Array.from(checkboxes).some((cb) => cb.checked);
    if (!isAnyChecked) {
      const customError = wrapper.getAttribute("rs-form-error");
      return {
        isValid: false,
        message: customError || "Please select at least one option.",
      };
    }

    return { isValid: true, message: "" };
  };

  /**
   * Validates all fields within a form.
   * @param {HTMLFormElement} form
   * @returns {{ isValid: boolean, firstInvalid: HTMLElement|null, message: string }}
   */
  const validateForm = (form) => {
    const inputs = form.querySelectorAll('[rs-form-field="input"]');
    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i];
      const result = validateInputElement(input);
      if (!result.isValid) {
        return { isValid: false, firstInvalid: input, message: result.message };
      }
    }

    const checkboxWrappers = form.querySelectorAll(
      '[rs-form-field="checkbox-wrapper"][rs-checkbox-multi-select="true"]'
    );
    for (let i = 0; i < checkboxWrappers.length; i++) {
      const wrapper = checkboxWrappers[i];
      const result = validateCheckboxWrapper(wrapper);
      if (!result.isValid) {
        return { isValid: false, firstInvalid: wrapper, message: result.message };
      }
    }

    return { isValid: true, firstInvalid: null, message: "" };
  };

  /**
   * Initializes all inputs, checkbox groups, and forms.
   */
  const initValidation = () => {
    RSBubbleManager.init();

    const inputs = document.querySelectorAll('[rs-form-field="input"]');
    const checkboxWrappers = document.querySelectorAll(
      '[rs-form-field="checkbox-wrapper"][rs-checkbox-multi-select="true"]'
    );

    // Track unique forms to attach submit listeners
    const forms = new Set();

    // Setup input fields
    inputs.forEach((input) => {
      if (input.form) forms.add(input.form);

      // Suppress native browser bubbles
      input.addEventListener("invalid", (e) => e.preventDefault());

      // Dismiss bubble and error highlight as soon as user types
      input.addEventListener("input", () => {
        input.classList.remove("rs-input-invalid");
        if (RSBubbleManager.currentTarget === input) {
          RSBubbleManager.hide();
        }
      });

      // Validate on change / blur
      input.addEventListener("change", () => {
        const result = validateInputElement(input);
        if (!result.isValid) {
          input.classList.add("rs-input-invalid");
          RSBubbleManager.show(input, result.message);
        } else {
          input.classList.remove("rs-input-invalid");
          if (RSBubbleManager.currentTarget === input) {
            RSBubbleManager.hide();
          }
        }
      });
    });

    // Setup multi-select checkbox wrappers
    checkboxWrappers.forEach((wrapper) => {
      const parentForm = wrapper.closest("form");
      if (parentForm) forms.add(parentForm);

      const checkboxes = wrapper.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach((cb) => {
        // Dismiss error when user checks any box
        cb.addEventListener("change", () => {
          const result = validateCheckboxWrapper(wrapper);
          if (result.isValid) {
            wrapper.classList.remove("rs-input-invalid");
            if (RSBubbleManager.currentTarget === wrapper) {
              RSBubbleManager.hide();
            }
          }
        });
      });
    });

    // Intercept form submit
    forms.forEach((form) => {
      // Disable default browser tooltips on the form
      form.noValidate = true;

      form.addEventListener("submit", (e) => {
        const result = validateForm(form);
        if (!result.isValid) {
          e.preventDefault();
          e.stopImmediatePropagation();

          const target = result.firstInvalid;
          target.classList.add("rs-input-invalid");

          // Smooth scroll to target on desktop and mobile
          target.scrollIntoView({ behavior: "smooth", block: "center" });

          // Focus field if focusable
          if (typeof target.focus === "function") {
            try {
              target.focus({ preventScroll: true });
            } catch (err) {
              target.focus();
            }
          }

          RSBubbleManager.show(target, result.message);
        }
      });

      form.addEventListener("reset", () => {
        RSBubbleManager.hide();
        form.querySelectorAll(".rs-input-invalid").forEach((el) => {
          el.classList.remove("rs-input-invalid");
        });
      });
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initValidation);
  } else {
    initValidation();
  }
})();
