document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('obituary-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        let isValid = true;
        const errorMessages = [];

        // Get form fields
        const name = document.getElementById('id_name');
        const dateOfBirth = document.getElementById('id_date_of_birth');
        const dateOfDeath = document.getElementById('id_date_of_death');
        const content = document.getElementById('id_content');
        const author = document.getElementById('id_author');

        // Clear previous error messages
        document.querySelectorAll('.error').forEach(el => el.remove());

        // Validate name
        if (!name.value.trim()) {
            isValid = false;
            showError(name, 'Name is required');
        }

        // Validate dates
        if (!dateOfBirth.value) {
            isValid = false;
            showError(dateOfBirth, 'Date of birth is required');
        }

        if (!dateOfDeath.value) {
            isValid = false;
            showError(dateOfDeath, 'Date of death is required');
        }

        // Compare dates
        if (dateOfBirth.value && dateOfDeath.value) {
            const birth = new Date(dateOfBirth.value);
            const death = new Date(dateOfDeath.value);
            
            if (death < birth) {
                isValid = false;
                showError(dateOfDeath, 'Date of death cannot be before date of birth');
            }
        }

        // Validate content
        if (!content.value.trim()) {
            isValid = false;
            showError(content, 'Content is required');
        } else if (content.value.trim().length < 50) {
            isValid = false;
            showError(content, 'Content must be at least 50 characters long');
        }

        // Validate author
        if (!author.value.trim()) {
            isValid = false;
            showError(author, 'Author name is required');
        }

        if (!isValid) {
            e.preventDefault();
        }
    });

    function showError(element, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error';
        errorDiv.textContent = message;
        element.parentNode.insertBefore(errorDiv, element.nextSibling);
    }
});
