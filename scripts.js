function validateForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Check if all fields are filled out
    if (name && email && message) {
        // Allow form submission
        return true;
    } else {
        alert('Please fill out all fields.');
        return false; // Prevent form submission if validation fails
    }
}

function showPopup() {
    // Prevent default form submission to show the popup first
    event.preventDefault();

    // Show the popup
    document.getElementById('popup').style.display = 'flex';

    // Simulate sending the form (this would typically be handled by FormSubmit.co)
    setTimeout(function() {
        // Submit the form programmatically after the popup
        document.getElementById('contact-form').submit();
    }, 1500);  // Slight delay before submitting the form

    return false;  // Prevent the form from submitting immediately
}

// Function to close the popup
function closePopup() {
    document.getElementById('popup').style.display = 'none';
}
