const forms     = document.getElementById("login-form");
const messagel  = document.getElementById("messagel");
const messagep  = document.getElementById("messagep");
const username  = document.getElementById("user-login");
const pass      = document.getElementById("password-fild");
const loginPage = document.getElementById("body-for-login-p");
const submitBtn = document.getElementById("submit");

function authenticate(login, passw) {

    var authdate = '{"email":"' + login + '","password":"' + passw + '"}';                                                      // benutzer eingaben in json-format an den server weiter geben.

    var request = new XMLHttpRequest();
    request.open("POST", "http://localhost:8888/API/V1/Authenticate");
    //request.open("POST", "https://campus.csbe.ch/sollberger-manuel/uek307/Authenticate");
    request.onload = loadedFact;
    request.send(authdate);                                                                                                     // beim post-request bekommt der send-methode form daten als parameter

    function loadedFact(event) {
        if (event.target.status === 200) {                                                                                      // wenn response ok ist dann soll die hauptseite geladen werden.
            location.assign("./index-home.php");
        } else if (event.target.status === 401) {
            
        } else if (event.target.status === 500) {
            
        }
    }
}

submitBtn.addEventListener("click", (e) => { 
    let login = username.value;
    let passw = pass.value;

    if (login === "" || login == null || passw === "" || passw == null) {
        if (login === "" || login == null) {
            e.preventDefault();
            messagel.innerText = "Login darf nicht leer sein!"
            messagel.classList.add("error-message");
            username.classList.add("error-input");
        }
        if (passw === "" || passw == null) {
            e.preventDefault();
            messagep.innerText = "Passwordfeld darf nicht leer sein!"
            messagep.classList.add("error-message");
            pass.classList.add("error-input");
        }
    } else {
        authenticate(login, passw);
    }

    username.addEventListener("focus", () => {
        username.classList.remove("error-input");
        messagel.innerText = "";
    });

    pass.addEventListener("focus", () => {
        pass.classList.remove("error-input");
        messagep.innerText = "";
    });
});  