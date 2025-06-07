// Initialise form submission
document.addEventListener("DOMContentLoaded", () => {
        // ========== Validation config ==========
    // Define all forms and their entries
    const formsConfig = {
        // Simple Forms
        contactForm: {
            id: "contactForm",
            errorId: "contactUsError",
            fields: {
                reason: { required: true, type: "text" },
                contactUsEmail: { required: true, type: "email" },
                message: { required: true, type: "text" }
            }
        },

        // Forms that enters a Database
        emailServiceForm: {
            id: "emailServiceForm",
            errorId: "emailServiceError",
            fields: {
                forename: { required: false, type: "text" },
                surname: { required: false, type: "text" },
                email: { required: true, type: "email" },
                preferences: {
                    required: true,
                    type: "checkboxGroup",
                    names: ["emergencies", "newsletter"]
                }
            }
        },

        reportForm: {
            id: "reportForm",
            fields: {
                location: { required: true, type: "text" },
                type: { required: true, type: "select" },
                description: { required: true, type: "text" }
            }
        }
    };

    // ========= Global validation functions =========

    // === Utility functions === 

    // focus styling to provide validation feedback
    function clearValidationStyles(input) {
        input.classList.remove(
            "border-2",
            "border-red-600",
            "focus:outline-none",
            "focus:ring-2",
            "focus:ring-red-600",
            "border-green-600",
            "focus:ring-green-600",
            "focus:ring-[#3a31d8]"
        );
    }

    function applyBaseFocusStyles(input) {
        clearValidationStyles(input);
        input.classList.add(
            "focus:outline-none",
            "focus:ring-2",
            "focus:ring-[#3a31d8]"
        );
    }

    function applyErrorStyles(input) {
        clearValidationStyles(input);
        input.classList.add(
            "border-2",
            "border-red-600",
            "focus:outline-none",
            "focus:ring-2",
            "focus:ring-red-600"
        );
    }

    function applySuccessStyles(input) {
        clearValidationStyles(input);
        input.classList.add(
            "border-2",
            "border-green-600",
            "focus:outline-none",
            "focus:ring-2",
            "focus:ring-green-600"
        );
    }

    // === Helper functions ===


    // Email validator
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Main Validation Helper

    function validateField(input, rules, form) {
        if (rules.type === "checkboxGroup") {
            // Validate checkboxes, at least one checked if required
            if (!rules.required) return null; // no validation needed if not required

            const checked = rules.names.some(name => {
                const checkbox = form.querySelector(`input[name="${name}"]`);
                return checkbox && checkbox.checked;
            });
            if (!checked) {
                return "Please select at least one subscription preference.";
            }
            return null;
        }

        if (!input) {
            return "Field not found";
        }

        const value = input.value.trim();

        if (rules.required && value === "") {
            return "This field is required.";
        }

        if (rules.type === "email" && value !== "" && !isValidEmail(value)) {
            return "Please enter a valid email address.";
        }

        // no errors
        return null; 
    }

    // ========== Main Code structure =========
    Object.values(formsConfig).forEach( ({ id, fields, errorId }) => {
        const form = document.getElementById(id);
        
        if (!form) return;

        form.addEventListener("submit", (e) => {
            e.preventDefault();

            let isValid = true;
            const errors = [];

            // clear previous errors
            const errorElement = document.getElementById(errorId);
            if (errorElement) {
                errorElement.textContent = "";
            }


            // Clear all styles first
            Object.entries(fields).forEach(([fieldName, rules]) => {
                if (rules.type === "checkboxGroup") {
                    rules.names.forEach(name => {
                        const input = form.querySelector(`input[name="${name}"]`);
                        if (input) clearValidationStyles(input);
                    });
                    
                } else {
                    const input = form.querySelector(`[name="${fieldName}"]`);
                    if (input) clearValidationStyles(input);
                }
            });

            // Validate fields
            Object.entries(fields).forEach(([fieldName, rules]) => {
                if (rules.type === "checkboxGroup") {
                    const errorMsg = validateField(null, rules, form);
                    if (errorMsg) {
                        errors.push(errorMsg);
                        isValid = false;
                        // Style all checkbox inputs as error
                        rules.names.forEach(name => {
                            const input = form.querySelector(`input[name="${name}"]`);
                            if (input) applyErrorStyles(input);
                        });
                    } else {
                        rules.names.forEach(name => {
                            const input = form.querySelector(`input[name="${name}"]`);
                            if (input) applySuccessStyles(input);
                        });
                    }
                } else {
                    const input = form.querySelector(`[name="${fieldName}"]`);
                    const errorMsg = validateField(input, rules, form);
                    if (errorMsg) {
                        errors.push(`${capitalize(fieldName)}: ${errorMsg}`);
                        isValid = false;
                        if (input) applyErrorStyles(input);
                    } else if (input) {
                        applySuccessStyles(input);
                    }
                }
            });

            if (!isValid) {
                if (errorElement) {
                    errorElement.innerHTML = errors.join("<br />");
                    errorElement.scrollIntoView({ behavior: "smooth" });
                }
                return;
            }

            // Form is valid
            form.submit();
        });
    });
});