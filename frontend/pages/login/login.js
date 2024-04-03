document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('loginForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission

        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;

        fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: username, password: password})
        })
        .then(function(response) {
            if (response.ok) {
                console.log(response);
                alert('Login Successful');
            } else {
                console.error('Login failed');
                alert('Login Failed. Please try again.');
            }
        })
        .catch(function(error) {
            console.error('Network Error:', error);
            alert('Network Error. Please try again.');
        });
    });
});