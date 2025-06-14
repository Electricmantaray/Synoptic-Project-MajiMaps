// Initialise form submission
document.addEventListener("DOMContentLoaded", () => {
    // ========== Validation config ==========
    // Define all forms and their entries
    const formsConfig = {
        // Simple Forms
        contactForm: {
            id: "contactUsForm",
            errorId: "contactUsError",
            fields: {
                reason: { required: true, type: "text" },
                contactUsEmail: { required: true, type: "email" },
                message: { required: true, type: "textarea", }
            }
        },

        // Forms that enters a Database
        emailServiceForm: {
            id: "emailServiceForm",
            errorId: "emailServiceError",
            fields: {
                forename: { required: false, type: "text" },
                surname: { required: false, type: "text" },
                emailServiceEmail: { required: true, type: "email" },
                preferences: {
                    required: true,
                    type: "checkboxGroup",
                    names: ["emergencies", "newsletter"]
                }
            }
        },

        // Form config for the report sections
        reportForm: {
            id: "reportForm",
            errorId: "reportError",
            fields: {
                location: { required: true, type: "text" },
                report_type: { required: true, type: "select" },
                description: { required: true, type: "textarea", maxlength: 255 }
            }
        },

        // Config for initial validation fo login form
        adminLoginForm: {
            id: "adminLoginForm",
            errorId: "adminLoginError",
            fields: {
                adminEmail: { required: true, type: "email" },
                adminPassword: { required: true, type: "text" }
            }
        }
    };

    // ========= Global validation functions =========

    // === Utility functions === 

    // focus styling to provide validation feedback
    // Provides feedback when user interacts
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

    // Provides feedback when form has error, on exact entry
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

    // Provides feedback when form has success, on exact entry
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
    // Checks against regex to see if email is properly formatted
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Main Validation Helper
    // Validates against all entries with bonus validation for specialised entries such as checkbox
    function validateField(input, rules, form) {
        if (rules.type === "checkboxGroup") {
            // Validate checkboxes, at least one checked if required
            if (!rules.required) return null;

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

        // General validation - contains redundent check to see if entry is present as precaution
        const value = input.value.trim();

        // Valie
        if (rules.required && value === "") {
            return "This field is required.";
        }

        // Email
        if (rules.type === "email" && value !== "" && !isValidEmail(value)) {
            return "Please enter a valid email address.";
        }

        // Drop Down box
        if (rules.type === "select") {
            if (rules.required && (!input || !input.value || input.value === "")) {
                return "This field is required.";
            }
        }

        // Max Length text box
        if (rules.maxlength && value.length > rules.maxlength) {
            return `Maximum length is ${rules.maxlength} characters.`;
        }

        // no errors
        return null;
    }

    // ========== Main Code structure =========
    Object.values(formsConfig).forEach(({ id, fields, errorId }) => {
        const form = document.getElementById(id);

        if (!form) return;

        // Triggers when submit button for that form is clicked
        form.addEventListener("submit", async (e) => {
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

            // Validate fields - using previous helper functions
            Object.entries(fields).forEach(([fieldName, rules]) => {
                // checkbox checks
                if (rules.type === "checkboxGroup") {
                    const errorMsg = validateField(null, rules, form);
                    // Logs all error messages to be output if form fails
                    if (errorMsg) {
                        errors.push(errorMsg);
                        isValid = false;
                        // Applies predefined styles as feedback
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
                        errors.push(`${(fieldName)}: ${errorMsg}`);
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
                }
                return;
            }


            // Build JSON object from fields for submission
            const json = {};

            Object.entries(fields).forEach(([fieldName, rules]) => {
                if (rules.type === "checkboxGroup") {
                    rules.names.forEach(name => {
                        const checkbox = form.querySelector(`input[name="${name}"]`);
                        if (checkbox) {
                            json[name] = checkbox.checked;
                        }
                    });
                } else {
                    const input = form.querySelector(`[name="${fieldName}"]`);
                    if (input) {
                        json[fieldName] = input.value.trim();
                    }
                }
            });


            // Location splitting for database - splites location into lat and lon
            if (id === "reportForm" && json.location) {
                const parts = json.location.split(",").map(s => s.trim());
                if (parts.length === 2) {
                    const lat = parseFloat(parts[0]);
                    const lon = parseFloat(parts[1]);
                    if (!isNaN(lat) && !isNaN(lon)) {
                        json.latitude = lat;
                        json.longitude = lon;
                    } else {
                        if (errorElement) {
                            errorElement.textContent = "Location format is invalid. Use: latitude, longitude";
                        }
                        return;
                    }
                } else {
                    if (errorElement) {
                        errorElement.textContent = "Location must be in 'latitude, longitude' format.";
                    }
                    return;
                }
                // remove original string field
                delete json.location;
            }

            try {
                // Send POST request to form.action URL
                const response = await fetch(form.action, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(json),
                });

                // Check HTTP status
                if (!response.ok) {
                    // Try to parse JSON errors from server
                    const errorData = await response.json();
                    if (errorData.error) {
                        if (Array.isArray(errorData.error)) {
                            // Highlight server validated fields with errors
                            errorData.error.forEach(err => {
                                const fieldInput = form.querySelector(`[name="${err.path}"]`);
                                if (fieldInput) applyErrorStyles(fieldInput);
                            });
                            if (errorElement) {
                                errorElement.innerHTML = "Please fix the highlighted fields.";
                            }
                        } else if (typeof errorData.error === "string") {
                            // Show the error string from backend (duplicate email ect)
                            if (errorElement) {
                                errorElement.textContent = errorData.error;
                            }
                        } else {
                            if (errorElement) {
                                errorElement.textContent = "Server error: Please try again later.";
                            }
                        }
                    } else {
                        if (errorElement) {
                            errorElement.textContent = "Server error: Please try again later.";
                        }
                    }

                    return;
                }

                // If success, parse response JSON
                const successData = await response.json();
                console.log("Login successData:", successData);
                if (successData.redirectUrl) {
                    window.location.href = successData.redirectUrl;
                    return;
                }

                // Show success message
                if (errorElement) {
                    errorElement.textContent = successData.message || "Form submitted successfully!";
                }

                // Reset form and clear all styles
                form.reset();
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

            } catch (err) {
                if (errorElement) {
                    errorElement.textContent = "Network error: Please try again later.";
                }
            }
        });
    });
});

