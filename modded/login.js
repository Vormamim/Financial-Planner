// This version uses fetch to POST login data to a backend server (see server.js example).
// It does NOT use localStorage. It expects a backend that reads/writes a CSV file.

const form = document.getElementById('form2');
const email_input = document.getElementById('emaillog-input');
const password_input = document.getElementById('passwordlog-input');
const error_message = document.getElementById('error-message');
const verify = document.getElementById('verify');

// Validate form fields
function getLoginFormErrors(email, password) {
    let errors = [];
    if (email === '' || email == null) {
        errors.push('Email is required');
        email_input.parentElement.classList.add('incorrect');
    }
    if (password === '' || password == null) {
        errors.push('Password is required');
        password_input.parentElement.classList.add('incorrect');
    }
    return errors;
}

// Remove error highlight on input
[email_input, password_input].forEach(input => {
    input.addEventListener('input', () => {
        if (input.parentElement.classList.contains('incorrect')) {
            input.parentElement.classList.remove('incorrect');
            error_message.innerText = '';
        }
    });
});

// Handle form submit
form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const email = email_input.value.trim();
    const password = password_input.value.trim();
    const errors = getLoginFormErrors(email, password);

    if (errors.length > 0) {
        error_message.innerText = errors.join(', ');
        return;
    }

    // Send login request to backend
    try {
        const res = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        if (res.ok) {
            verify.innerText = 'Login successful!';
            // window.location.href = 'planner.html'; // Uncomment to redirect
        } else {
            const data = await res.json();
            verify.innerText = data.message || 'Incorrect Login';
        }
    } catch (err) {
        verify.innerText = 'Server error. Please try again later.';