document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');
    if (email) {
        document.getElementById('email').textContent = email;
    }
});

function validateAndSave() {
    "use strict";
    let address = document.getElementById("email").value;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (address.length < 6) {
        alert("Address is too short");
    }
    else if (!emailRegex.test(address)) {
        alert("Invalid address");
    }
    else {
        window.location.href = "signup.html?email=" + encodeURIComponent(address);

    }
}




// Function to load a file into a specified element
function loadContent(url, elementId) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
        })
        .catch(error => console.log('Error loading content: ', error));
}

// Load the header, navigation, and footer
loadContent('parts/header.html', 'header');
loadContent('parts/nav.html', 'nav');
loadContent('parts/footer.html', 'footer');




