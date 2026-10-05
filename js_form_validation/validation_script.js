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
        --rs-bubble-font-family: inherit, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
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

      /* Disabled Next Button for multi-step forms */
      [rs-step-btn="next"]:disabled,
      [rs-step-btn="next"][disabled],
      [rs-step-btn="next"].rs-disabled {
        opacity: 0.55 !important;
        cursor: not-allowed !important;
        pointer-events: none !important;
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
   * Applies the disabled state and explicit disabled attribute to a button.
   * Supports <button>, <input>, <a>, <div>, etc.
   * @param {HTMLElement} btn
   */
  const applyDisabled = (btn) => {
    if (!btn) return;
    btn.setAttribute("disabled", "true");
    btn.setAttribute("aria-disabled", "true");
    btn.classList.add("rs-disabled");
    if ("disabled" in btn) {
      btn.disabled = true;
    }
  };

  /**
   * Removes the disabled state and disabled attribute from a button.
   * @param {HTMLElement} btn
   */
  const removeDisabled = (btn) => {
    if (!btn) return;
    btn.removeAttribute("disabled");
    btn.removeAttribute("aria-disabled");
    btn.classList.remove("rs-disabled");
    if ("disabled" in btn) {
      btn.disabled = false;
    }
  };

  /**
   * Toggles the disabled state of a button.
   * @param {HTMLElement} btn
   * @param {boolean} isDisabled
   */
  const setButtonDisabledState = (btn, isDisabled) => {
    if (isDisabled) {
      applyDisabled(btn);
    } else {
      removeDisabled(btn);
    }
  };

  /**
   * Checks whether a step container is currently visible/active in the DOM.
   * @param {HTMLElement} stepEl
   * @returns {boolean}
   */
  const isStepVisible = (stepEl) => {
    if (!stepEl) return false;
    if (stepEl.getAttribute("aria-hidden") === "true") return false;
    if (stepEl.getAttribute("aria-hidden") === "false") return true;

    if (
      stepEl.classList.contains("active") ||
      stepEl.classList.contains("rs-step-active") ||
      stepEl.classList.contains("current") ||
      stepEl.classList.contains("w--tab-active")
    ) {
      return true;
    }

    if (stepEl.style.display === "none") return false;

    try {
      const style = window.getComputedStyle(stepEl);
      if (style.display === "none" || style.visibility === "hidden") {
        return false;
      }
    } catch (e) {}

    return true;
  };

  /**
   * Validates all input fields and checkbox wrappers within a specific step container.
   * Only fields marked as required must be filled; any filled field must pass pattern checks.
   * @param {HTMLElement} stepEl
   * @returns {boolean}
   */
  const validateStepFields = (stepEl) => {
    const inputs = stepEl.querySelectorAll('[rs-form-field="input"]');
    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i];
      const value = (input.value || "").trim();

      const isRequired =
        input.required ||
        input.hasAttribute("required") ||
        input.getAttribute("rs-form-required") === "true";

      // If marked required, it must not be empty
      if (isRequired && value.length === 0) {
        return false;
      }

      // If field has a value (whether required or optional), it must pass pattern/domain validation
      if (value.length > 0) {
        const result = validateInputElement(input);
        if (!result.isValid) return false;
      }
    }

    const checkboxWrappers = stepEl.querySelectorAll(
      '[rs-form-field="checkbox-wrapper"][rs-checkbox-multi-select="true"]'
    );
    for (let i = 0; i < checkboxWrappers.length; i++) {
      const result = validateCheckboxWrapper(checkboxWrappers[i]);
      if (!result.isValid) return false;
    }

    return true;
  };

  /**
   * Finds all Next buttons associated with a step container.
   * Supports buttons nested at any depth inside the step, explicitly linked by step attribute,
   * or shared in the parent form footer.
   * @param {HTMLElement} stepEl
   * @returns {HTMLElement[]}
   */
  const getStepNextButtons = (stepEl) => {
    const buttons = new Set();

    // 1. Next buttons located anywhere inside this step container (at any nesting depth)
    stepEl.querySelectorAll('[rs-step-btn="next"]').forEach((btn) => buttons.add(btn));

    // 2. Next buttons in the parent form explicitly linked to this step index/value
    const stepVal = stepEl.getAttribute("rs-form-step");
    const parentForm = stepEl.closest("form");
    if (parentForm && stepVal) {
      parentForm
        .querySelectorAll(
          `[rs-step-btn="next"][rs-form-step="${stepVal}"], [rs-step-btn="next"][rs-step-target="${stepVal}"]`
        )
        .forEach((btn) => buttons.add(btn));
    }

    // 3. Shared Next buttons in the parent form footer (outside all step wrappers)
    if (buttons.size === 0 && parentForm) {
      const allNextBtns = parentForm.querySelectorAll('[rs-step-btn="next"]');
      allNextBtns.forEach((btn) => {
        if (!btn.closest("[rs-form-step]")) {
          buttons.add(btn);
        }
      });
    }

    return Array.from(buttons);
  };

  /**
   * Updates the disabled state of the Next button for a step based on its validity.
   * @param {HTMLElement} stepEl
   */
  const updateStepNextButton = (stepEl) => {
    if (!stepEl) return;
    const nextBtns = getStepNextButtons(stepEl);
    if (nextBtns.length === 0) return;

    const isValid = validateStepFields(stepEl);
    nextBtns.forEach((btn) => {
      const isInside = stepEl.contains(btn);
      const stepVal = stepEl.getAttribute("rs-form-step");
      const isLinked =
        btn.getAttribute("rs-form-step") === stepVal ||
        btn.getAttribute("rs-step-target") === stepVal;

      if (isInside || isLinked) {
        // Exclusively belongs to this step container
        setButtonDisabledState(btn, !isValid);
      } else {
        // Shared Next button outside all step wrappers:
        // Only update based on this step if this step is currently visible/active
        if (isStepVisible(stepEl)) {
          setButtonDisabledState(btn, !isValid);
        }
      }
    });
  };

  /**
   * Initializes all inputs, checkbox groups, multi-step containers, and forms.
   */
  const initValidation = () => {
    RSBubbleManager.init();

    const inputs = document.querySelectorAll('[rs-form-field="input"]');
    const checkboxWrappers = document.querySelectorAll(
      '[rs-form-field="checkbox-wrapper"][rs-checkbox-multi-select="true"]'
    );
    // Find all steps regardless of nesting depth inside forms
    const stepElements = document.querySelectorAll("[rs-form-step]");
    const allNextButtons = document.querySelectorAll('[rs-step-btn="next"]');

    // 1. Strict default: explicitly add disabled attribute to every Next button on initialization
    allNextButtons.forEach((btn) => {
      applyDisabled(btn);
    });

    // Track unique forms to attach submit listeners
    const forms = new Set();

    // Prevent clicks on disabled Next buttons in capture phase (supports <button>, <a>, <div>)
    document.addEventListener(
      "click",
      (e) => {
        const nextBtn = e.target.closest('[rs-step-btn="next"]');
        if (!nextBtn) return;

        const isBtnDisabled =
          nextBtn.disabled === true ||
          nextBtn.hasAttribute("disabled") ||
          nextBtn.classList.contains("rs-disabled") ||
          nextBtn.getAttribute("aria-disabled") === "true";

        if (isBtnDisabled) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          return false;
        }
      },
      true
    );

    // Re-add disabled immediately on click and re-evaluate upon step shift
    document.addEventListener("click", (e) => {
      const stepBtn = e.target.closest("[rs-step-btn]");
      if (!stepBtn) return;

      const isNext = stepBtn.getAttribute("rs-step-btn") === "next";

      // If clicking an enabled shared Next button, immediately re-add disabled
      // so it cannot be double-clicked before the next step is evaluated
      if (isNext && !stepBtn.closest("[rs-form-step]")) {
        applyDisabled(stepBtn);
      }

      // Re-evaluate step validity once external DOM changes / animations take effect
      const recheck = () => {
        stepElements.forEach((stepEl) => {
          updateStepNextButton(stepEl);
        });
      };

      setTimeout(recheck, 0);
      setTimeout(recheck, 50);
      setTimeout(recheck, 250);
    });

    // Setup MutationObserver on all steps to detect external step shifts (style, class, aria-hidden changes)
    if (typeof MutationObserver !== "undefined" && stepElements.length > 0) {
      const stepObserver = new MutationObserver(() => {
        stepElements.forEach((stepEl) => {
          updateStepNextButton(stepEl);
        });
      });

      stepElements.forEach((stepEl) => {
        stepObserver.observe(stepEl, {
          attributes: true,
          attributeFilter: ["style", "class", "aria-hidden"],
        });
      });
    }

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

    // Setup multi-step form steps & next button enablement
    stepElements.forEach((stepEl) => {
      const parentForm = stepEl.closest("form");
      if (parentForm) forms.add(parentForm);

      // Evaluate initial validity of step (removes disabled only if already valid)
      updateStepNextButton(stepEl);

      // Re-evaluate validity in real time on input and change
      stepEl.addEventListener("input", () => {
        updateStepNextButton(stepEl);
      });

      stepEl.addEventListener("change", () => {
        updateStepNextButton(stepEl);
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
        form.querySelectorAll("[rs-form-step]").forEach((stepEl) => {
          setTimeout(() => updateStepNextButton(stepEl), 10);
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
