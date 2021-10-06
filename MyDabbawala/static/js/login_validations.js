function validateForm() {
    var username = document.getElementById("username");

    var password = document.getElementById("password");

    if (username.value.trim() == "" && password.value.trim() == "") {

        alert("Error: Username and Password should be entered");
        return false;
    }
    else {
        true;
    }


    if (username.value.trim() == "") {
        alert("Error: Username should not be empty");
        return false;
    }
    else {
        true;
    }
    if (password.value.trim() == "") {


        alert("Error: Password should not be empty");
        return false;
    }
    else {
        true;
    }
}