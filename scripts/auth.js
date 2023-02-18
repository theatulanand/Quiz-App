var x = document.getElementById("login");
var y = document.getElementById("register");
var z = document.getElementById("btn");

function changeToRegister() {
    x.style.left = "-400px"
    y.style.left = "50px"
    z.style.left = "110px"
}
function changeToLogin() {
    x.style.left = "50px"
    y.style.left = "-400px"
    z.style.left = "0"
}
function register(event) {
    event.preventDefault();
    //getting users from LocalStorage;
    let users = JSON.parse(localStorage.getItem('users')) || [];

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    for (let i = 0; i < users.length; i++) {
        if (users[i].email == email) {
            alert("Email Already Registered, Please Login");
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("password").value = "";
            changeToLogin();
            return;
        }
    }

    let newUser = {
        name,
        email,
        password
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    alert("User Registration Successful");
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    changeToLogin();
}
function login(event) {
    event.preventDefault();
    let users = JSON.parse(localStorage.getItem('users')) || [];

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    for (let i = 0; i < users.length; i++) {
        if (users[i].email == email) {
            if (users[i].password == password) {
                alert("Login Success");
                return;
            } else {
                alert("Invalid Password");
                return;
            }
        }
    }

    alert("Email Not Found, Create account first !!");
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    changeToRegister();
}