function validateForm() {
    var username = document.getElementById("username");
    var email = document.getElementById("email");
    var mobile = document.getElementById("mobile");
    var password = document.getElementById("password");
    var confirmpassword = document.getElementById("confirmpassword");

    if (username.value.trim() == "" && email.value.trim() == "" && mobile.value.trim() == "" && password.value.trim() == "" && confirmpassword.value.trim() == "") {
        alert("Error: No field should be empty");
        return false;
    }
    else {
        true;
    }


    var password = document.getElementById("password").value;
    var confirmpassword = document.getElementById("confirmpassword").value;
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;

    if (password != confirmpassword) {

        alert("Error: Password doesnot matches");
        return false;
    }
    var username = document.getElementById("username").value;
    if (signup.username.value.length < 6) {
        alert("Error: Username must contain at least six characters!");
        signup.username.focus();
        return false;
    }


    var email = document.getElementById('email');
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!filter.test(email.value)) {
        alert('Please provide a valid email address');
        email.focus;
        return false;
    }
    var password = document.getElementById("password").value;
    if (signup.password.value.length < 6) {
        alert("Error: Password must contain at least six characters!");
        signup.password.focus();
        return false;
    }

    var y = document.signup.mobile.value;
    if (isNaN(y) || y.indexOf(" ") != -1) {
        alert("Error:Enter numeric value")
        return false;
    }
    if (y.length > 10) {
        alert("Error: Enter 10 characters");
        return false;
    }
}