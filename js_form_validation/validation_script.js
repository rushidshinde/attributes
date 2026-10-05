/**
 * [attributes by RS] Javascript Form Validation
 * Unminified reference version of validation_script.min.js
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
  textAndNumber: "^[^$@#%&*+_=!^₹€£¥₣?.,`~:;'\"\\)\\(><\\}\\{\\-\\/\\[\\]\\|]{0,}$",
  email: "^[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9_\\-]+[.]+[a-zA-Z0-9\\-.]{2,61}$",
  businessEmail: "^[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9_\\-]+[.]+[a-zA-Z0-9\\-.]{2,61}$",
  contactNumber: "^\\+?[0-9]{6,14}$",
};

(function () {
  /**
   * Helper function to verify if an email address belongs to disallowed public domains.
   * @param {HTMLInputElement} inputEl
   * @returns {boolean}
   */
  const isDisallowedDomain = (inputEl) => {
    const domain = inputEl.value.split("@")[1];
    return Boolean(disallowedDomains.includes(domain));
  };

  /**
   * Sets HTML5 pattern and title attributes on the input element.
   * @param {HTMLInputElement} inputEl
   * @param {string} pattern
   * @param {string} errorMessage
   */
  const setFieldAttributes = (inputEl, pattern, errorMessage) => {
    if (pattern) {
      inputEl.setAttribute("pattern", pattern);
    }
    inputEl.setAttribute("title", errorMessage);
  };

  /**
   * Validates an input field against regex pattern and businessEmail rules.
   * Uses native setCustomValidity & reportValidity APIs.
   * @param {HTMLInputElement} inputEl
   * @param {string} pattern
   * @param {string} errorMessage
   * @param {string} formType
   */
  const validateField = (inputEl, pattern, errorMessage, formType) => {
    const regex = new RegExp(pattern, "u");

    if (regex.test(inputEl.value)) {
      inputEl.setCustomValidity("");
    } else {
      const validity = inputEl.validity;
      if (validity.valueMissing) {
        inputEl.setCustomValidity("Required Field");
      } else if (validity.patternMismatch) {
        inputEl.setCustomValidity(errorMessage);
      } else {
        inputEl.setCustomValidity("");
      }
      inputEl.reportValidity();
    }

    if (formType === "businessEmail") {
      if (isDisallowedDomain(inputEl)) {
        inputEl.setCustomValidity(errorMessage);
        inputEl.reportValidity();
      } else {
        inputEl.setCustomValidity("");
      }
    }
  };

  // Initialize input field validation
  document.addEventListener("DOMContentLoaded", function () {
    const inputs = document.querySelectorAll('[rs-form-field="input"]');

    inputs.forEach(function (input) {
      let pattern;
      let formType;

      if (input.hasAttribute("rs-form-type")) {
        formType = input.getAttribute("rs-form-type");
      }

      if (input.hasAttribute("rs-form-pattern")) {
        pattern = input.getAttribute("rs-form-pattern");
      } else if (formType && patterns[formType]) {
        pattern = patterns[formType];
      }

      const errorMessage = input.hasAttribute("rs-form-error")
        ? input.getAttribute("rs-form-error")
        : "Please enter valid data";

      setFieldAttributes(input, pattern, errorMessage);

      input.addEventListener("change", function () {
        validateField(input, pattern, errorMessage, formType);
      });
    });
  });
})();

// Initialize multi-select checkbox validation
document.addEventListener("DOMContentLoaded", () => {
  const checkboxWrappers = document.querySelectorAll(
    '[rs-form-field="checkbox-wrapper"][rs-checkbox-multi-select="true"]'
  );

  checkboxWrappers.forEach((wrapper) => {
    const checkboxes = wrapper.querySelectorAll('input[type="checkbox"]');

    // Initially mark all checkboxes as required so at least one must be checked
    checkboxes.forEach((cb) => {
      cb.required = true;
    });

    checkboxes.forEach((cb) => {
      cb.addEventListener("change", () => {
        const isAnyChecked = Array.from(checkboxes).some((item) => item.checked);
        if (isAnyChecked) {
          // If at least one is checked, remove required from all
          checkboxes.forEach((item) => {
            item.required = false;
          });
        } else {
          // If none checked, reinstate required on all
          checkboxes.forEach((item) => {
            item.required = true;
          });
        }
      });
    });
  });
});
