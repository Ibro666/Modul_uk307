const forms = document.getElementById("login-form");
const username = document.getElementById("user-login");
const pass = document.getElementById("password-fild");
const tableCont = document.getElementById("table-container");
const loginPage = document.getElementById("body-for-login-p");

function authenticate() {
    let login = username.value;
    let passw = pass.value;
    //console.log(login + ' ' + passw);
    var authdate = '{"username":"' + login + '","password":"' + passw + '"}';
    //var authdataParsed = JSON.parse(authdate)                             // nur beim empfangen wird parsed
    //console.log(authdate);

    var request = new XMLHttpRequest();
    request.open("POST", "https://campus.csbe.ch/sollberger-manuel/uek307/Authenticate");
    request.onload = loadedFact;
    request.send(authdate);                     // beim post-request bekommt der send-methode form daten als parameter

    //console.log(login + ' ' + passw);

    function loadedFact(event) {
        if (request.status === 200) {

            loginPage.style.display = "none";


            var button = document.createElement("button");
            button.setAttribute("type", "button");
            button.setAttribute("onclick", "loadTableCategory()");
            var btntext = document.createTextNode("load data");
            button.appendChild(btntext);
            tableCont.appendChild(button);
        }
        //alert(event.target.responseText);
        //console.log(event.target);
        //var responseData = JSON.parse(event.target.responseText);
        //document.getElementById("table").innerText = responseData.fact;
        //document.cookie = 'token=' + event.target.responseText;
        //location.href="../view/index.html";
        //var cookie = document.cookie;
        //console.log(cookie);
        //console.log(cookieArray);
    }
}

function loadTableCategory() {
    var request = new XMLHttpRequest();                             
    request.open("GET", "https://campus.csbe.ch/sollberger-manuel/uek307/Categories");
    //request.setRequestHeader('Authorization', `Bearer ${}`);
    request.onload = loadedFact;
    request.send();


    const table = document.createElement("table");
    const rowHeader = document.createElement("tr");
    const tableHeaderDiscribe = document.createElement("th");
    const tableHeaderAktive = document.createElement("th");
    const tableHeaderName = document.createElement("th");
    
    table.appendChild(rowHeader);
    rowHeader.appendChild(tableHeaderDiscribe);
    rowHeader.appendChild(tableHeaderAktive);
    rowHeader.appendChild(tableHeaderName);
    var thDiscribe = document.createTextNode("Bezeichnung");
    var thAktive = document.createTextNode("Aktiv");
    var thName = document.createTextNode("Name");
    //var tableId = document.createAttribute("id");
    //tableId.nodeValue = "caregory-table";

    table.setAttribute('name', 'caregory-table');
    tableHeaderDiscribe.appendChild(thDiscribe);
    tableHeaderAktive.appendChild(thAktive);
    tableHeaderName.appendChild(thName);
    
    const body = document.getElementsByTagName("body") [0].appendChild(table);
    
    function loadedFact(event) {
        
        var responseData = JSON.parse(event.target.responseText);
        document.getElementsByName("caregory-table").innerText = responseData.fact;
        table = responseData.fact;

        for (var i = 0; i < responseData.length; i++) {
            var responseData = responseData[i];
    
            var row = document.createElement("tr");
            var idColumn = document.createElement("td");
            var statColumn = document.createElement("td");
            var nameColumn = document.createElement("td");      
    
            table.appendChild(row);
        
            table.appendChild(idColumn);
            idColumn.innerText = responseData.category_id;
        
            table.appendChild(statColumn);
            statColumn.innerText = responseData.active;
    
            table.appendChild(nameColumn);
            nameColumn.innerText = responseData.name;
        }
    }
}