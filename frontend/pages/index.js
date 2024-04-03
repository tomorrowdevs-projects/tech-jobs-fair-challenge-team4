$(document).ready(function(){
    // Define click event for navigation links
    $('#login-link').click(function(){
        window.location.href = 'login/login.html';
    });

    $('#contact-link').click(function(){
        window.location.href = 'contact/list.html';
    });

    $('#personal-info-link').click(function(){
        window.location.href = 'personal-info/personal_info.html';
    });

    $('#user-link').click(function(){
        window.location.href = 'users/users.html';
    });

    $('#role-link').click(function(){
        window.location.href = 'role/role.html';
    });
});