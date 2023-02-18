const x = document.getElementById("login");
const y = document.getElementById("register");
const z = document.getElementById("btn");

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

// If user is already loggedIn
const loggedInUser = localStorage.getItem("loggedInUser");
if (loggedInUser) {
    window.location.href = "../pages/quiz.html"
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
            changeToLogin();
            return;
        }
    }

    let newUser = {
        name,
        email,
        password
    };
    console.log(newUser)
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    alert("User Registration Successful");
    changeToLogin();
}
function login(event) {
    event.preventDefault();
    let users = JSON.parse(localStorage.getItem('users')) || [];

    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    for (let i = 0; i < users.length; i++) {
        if (users[i].email == email) {
            if (users[i].password == password) {
                alert("Login Success");
                window.location.href = "../pages/quiz.html";
                localStorage.setItem("loggedInUser", JSON.stringify(users[i]));
                return;
            } else {
                alert("Invalid Password");
                return;
            }
        }
    }

    alert("Email Not Found, Create account first !!");
    changeToRegister();
}