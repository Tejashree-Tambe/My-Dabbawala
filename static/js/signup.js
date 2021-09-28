function validateform(){
    var uname = document.myform.username.value;
    var uemail = document.myform.email.value;
    var umobile = document.myform.mobile.value;
    var upass = document.myform.password.value;
    var ucpass = document.myform.confirmpassword.value;
    if(uname==null || uname==""){
        alert("username should be entered");
        return false;
    }else if (upass.length< 6){
        alert("Password must be atleast 6 characters long");
        return false;
    }
}
