const forms = document.getElementById("login-form");
const username = document.getElementById("user-login");
const pass = document.getElementById("password-fild");
const tableCont = document.getElementById("table-container");
const loginPage = document.getElementById("body-for-login-p");

function authenticate() {
    let login = username.value;
    let passw = pass.value;
    var authdate = '{"email":"' + login + '","password":"' + passw + '"}';                                                      // benutzer eingaben in json-format an den server weiter geben.

    var request = new XMLHttpRequest();
    request.open("POST", "http://localhost:8888/API/V1/Authenticate");
    //request.open("POST", "https://campus.csbe.ch/sollberger-manuel/uek307/Authenticate");
    request.onload = loadedFact;
    request.send(authdate);                                                                                                     // beim post-request bekommt der send-methode form daten als parameter

    function loadedFact(event) {
        if (request.status === 200) {                                                                                           // wenn response ok ist dann soll die hauptseite geladen werden.
            location.assign("./index.html");
        }
    }
}