const forms = document.getElementById("login-form");
const username = document.getElementById("user-login");
const pass = document.getElementById("password-fild");
const tableCont = document.getElementById("table-container");
const loginPage = document.getElementById("body-for-login-p");

function authenticate() {
    let login = username.value;
    let passw = pass.value;
    var authdate = '{"username":"' + login + '","password":"' + passw + '"}';
    //var authdataParsed = JSON.parse(authdate)                             // nur beim empfangen wird parsed


    var request = new XMLHttpRequest();
    request.open("POST", "localhost:8888/API/V1/Authenticate");
    //request.open("POST", "https://campus.csbe.ch/sollberger-manuel/uek307/Authenticate");
    console.log(authdate);
    request.onload = loadedFact;
    request.send(authdate);                     // beim post-request bekommt der send-methode form daten als parameter

    function loadedFact(event) {
        if (request.status === 200) {

            loginPage.style.display = "none";
            //console.log('event: ', event)
            //console.log('request: ', request.getResponseHeader())

            var button = document.createElement("button");
            button.setAttribute("type", "button");
            button.setAttribute("onclick", "loadTableCategory()");
            var btntext = document.createTextNode("load data");
            button.appendChild(btntext);
            tableCont.appendChild(button);
        }
    }
}

function loadTableCategory() {
    var request = new XMLHttpRequest();                             
    request.open("GET", "localhost:8888/API/V1/Products");
    //request.open("GET", "https://campus.csbe.ch/sollberger-manuel/uek307/Categories");
    //request.setRequestHeader('Authorization', `Bearer ${}`);
    request.onload = loadedFact;
    request.send();


    // Layout definieren
    const contentContainer = document.createElement("div");
    const content = document.createElement("div");
    contentContainer.setAttribute("class", "content-container");

    // navigation 
    const toolBar = document.createElement("div");

    // tabelle definieren
    const table = document.createElement("table");
    const rowHeader = document.createElement("tr");
    table.setAttribute("name", "caregory-table");
    table.setAttribute("class", "table-cat-content");

    // titel der tabelle
    const tableHeaderDiscribe = document.createElement("th");
    const tableHeaderAktive = document.createElement("th");
    const tableHeaderSum = document.createElement("th");
    const addItem = document.createElement("th");
    var thDiscribe = document.createTextNode("Bezeichnung");
    var thAktive = document.createTextNode("Aktiv");
    var thSum = document.createTextNode("Summe");
    tableHeaderDiscribe.appendChild(thDiscribe);
    tableHeaderAktive.appendChild(thAktive);
    tableHeaderSum.appendChild(thSum);

    // hinzufügen button
    const addBtn = document.createElement("button");
    var addBtnText = document.createTextNode("Hinzufügen");
    addBtn.appendChild(addBtnText);
    addBtn.setAttribute("class", "add-btn");
    addBtn.setAttribute("type", "button");
    addBtn.setAttribute("onclick", "");

    // bearbeiten button 
    const editBtn = document.createElement("button");
    var editBtnText = document.createTextNode("Bearbeiten");
    editBtn.appendChild(editBtnText);
    editBtn.setAttribute("class", "edit-btn");
    editBtn.setAttribute("type", "button");
    editBtn.setAttribute("onclick", "");

    // löschen butten
    const delBtn = document.createElement("button");
    var delBtnText = document.createTextNode("Löschen");
    delBtn.appendChild(delBtnText);
    delBtn.setAttribute("class", "del-btn");
    delBtn.setAttribute("type", "button");
    delBtn.setAttribute("onclick", "");

    //table = responseData.fact;
    contentContainer.appendChild(content);
    contentContainer.appendChild(toolBar);
    content.appendChild(table);
    table.appendChild(rowHeader);
    rowHeader.appendChild(tableHeaderDiscribe);
    rowHeader.appendChild(tableHeaderAktive);
    rowHeader.appendChild(tableHeaderSum);
    rowHeader.appendChild(addItem);
    addItem.appendChild(addBtn);

    const body = document.getElementsByTagName("body") [0].appendChild(contentContainer);

    // tabelle befüllen
    function loadedFact(event) {   
        var responseData = JSON.parse(event.target.responseText);
        document.getElementsByName("caregory-table").innerText = responseData.fact;
        
        for (var i = 0; i < responseData.length; i++) {
            var responseData = responseData[i];

            var row = document.createElement("tr");
            var idColumn = document.createElement("td");
            var statColumn = document.createElement("td");
            var nameColumn = document.createElement("td");
            var editItem = document.createElement("td");
            var delItem = document.createElement("td");      

            table.appendChild(row);
        
            table.appendChild(idColumn);
            idColumn.innerText = responseData.category_id;
        
            table.appendChild(statColumn);
            statColumn.innerText = responseData.active;

            table.appendChild(nameColumn);
            nameColumn.innerText = responseData.name;

            table.appendChild(editItem);
            editItem.appendChild(editBtn);

            table.appendChild(delItem);
            delItem.appendChild(delBtn);
        }
    }
}

function addContent() {
    console.log("Das neue Fenster");

    var content = document.createElement("div");
    content.setAttribute("class", "add-content");

    var item1 = document.createElement("div");
    item1.setAttribute("class", "item-containner");

    var item2 = document.createElement("div");
    item2.setAttribute("class", "item-containner");

    var item3 = document.createElement("div");
    item3.setAttribute("class", "item-containner");

    var item4 = document.createElement("div");
    item4.setAttribute("class", "item-containner");

    var item5 = document.createElement("div");
    item5.setAttribute("class", "item-containner");

    var item6 = document.createElement("div");
    item6.setAttribute("class", "item-containner");

    var item7 = document.createElement("div");
    item7.setAttribute("class", "item-containner");

    var item8 = document.createElement("div");
    item8.setAttribute("class", "item-containner");

    var item9 = document.createElement("div");
    item9.setAttribute("class", "item-containner");
    

    var laFSku = document.createElement("label"); 
    var inFlSku = document.createElement("input");
    var labTitleSku = document.createTextNode("Sku:");
    laFSku.setAttribute("for", "sku-input");
    laFSku.appendChild(labTitleSku);
    inFlSku.setAttribute("type", "text");
    inFlSku.setAttribute("name", "sku-input");
    content.appendChild(item1);
    item1.appendChild(laFSku);
    item1.appendChild(inFlSku);

    var laFAct = document.createElement("label");
    var inFlAct = document.createElement("input");
    var labTitleAct = document.createTextNode("Status:");
    laFAct.setAttribute("for", "active");
    laFAct.appendChild(labTitleAct);
    inFlAct.setAttribute("type", "text");
    inFlAct.setAttribute("name", "active");
    content.appendChild(item2);
    item2.appendChild(laFAct);
    item2.appendChild(inFlAct);

    var laFCat = document.createElement("label");
    var inFlCat = document.createElement("input");
    var labTitleCat = document.createTextNode("Kategorie-Nr.:");
    laFCat.setAttribute("for", "category-id");
    laFCat.appendChild(labTitleCat);
    inFlCat.setAttribute("type", "text");
    inFlCat.setAttribute("name", "category-id");
    content.appendChild(item3);
    item3.appendChild(laFCat);
    item3.appendChild(inFlCat);

    var laFNam = document.createElement("label");
    var inFlNam = document.createElement("input");
    var labTitleNam = document.createTextNode("Bezeichnung:");
    laFNam.setAttribute("for", "pro-name");
    laFNam.appendChild(labTitleNam);
    inFlNam.setAttribute("type", "text");
    inFlNam.setAttribute("name", "pro-name");
    content.appendChild(item4);
    item4.appendChild(laFNam);
    item4.appendChild(inFlNam);

    var laFImg = document.createElement("label");
    var inFlImg = document.createElement("input");
    var labTitleImg = document.createTextNode("Bilder:");
    laFImg.setAttribute("for", "img");
    laFImg.appendChild(labTitleImg);
    inFlImg.setAttribute("type", "text");
    inFlImg.setAttribute("name", "img");
    content.appendChild(item5);
    item5.appendChild(laFImg);
    item5.appendChild(inFlImg);

    var laFDesc = document.createElement("label");
    var inFlDesc = document.createElement("input");
    var labTitleDesc = document.createTextNode("Beschreibung:");
    laFDesc.setAttribute("for", "description");
    laFDesc.appendChild(labTitleDesc);
    inFlDesc.setAttribute("type", "text");
    inFlDesc.setAttribute("name", "description");
    content.appendChild(item6);
    item6.appendChild(laFDesc);
    item6.appendChild(inFlDesc);

    var laFPri = document.createElement("label");
    var inFlPri = document.createElement("input");
    var labTitlePri = document.createTextNode("Preis:");
    laFPri.setAttribute("for", "price");
    laFPri.appendChild(labTitlePri);
    inFlPri.setAttribute("type", "text");
    inFlPri.setAttribute("name", "price");
    content.appendChild(item7);
    item7.appendChild(laFPri);
    item7.appendChild(inFlPri);

    var laFSt = document.createElement("label");
    var inFlSt = document.createElement("input");
    var labTitleSt = document.createTextNode("Menge:");
    laFSt.setAttribute("for", "stock");
    laFSt.appendChild(labTitleSt);
    inFlSt.setAttribute("type", "text");
    inFlSt.setAttribute("name", "stock");
    content.appendChild(item8);
    item8.appendChild(laFSt);
    item8.appendChild(inFlSt);

    // hinzufügen button
    const addBtn = document.createElement("button");
    var addBtnText = document.createTextNode("Hinzufügen");
    addBtn.appendChild(addBtnText);
    addBtn.setAttribute("class", "add-btn");
    addBtn.setAttribute("type", "button");
    addBtn.setAttribute("onclick", addItems(inFlSku.value, inFlAct.value, inFlCat.value, inFlNam.value, inFlImg.value, inFlDesc.value, inFlPri.value, inFlSt.value ));
    content.appendChild(item9);
    item9.appendChild(addBtn);

    const body = document.getElementsByTagName("body") [0].appendChild(content);
    
}

function addItems(sku, active, cat, name, img, desc, price, stock) {
    var request = new XMLHttpRequest();
    request.open("POST", "http://localhost:8888/API/V1/Product/" + sku);
    //request.open("POST", "https://campus.csbe.ch/sollberger-manuel/uek307/Category");

    var str = '{"sku":"' + sku + '","active":"' + active + '","category":"' + cat + '","name":"' + name + '","image":"' + img + '","description":"' + desc + '","price":"' + price + '","stock":"' + stock + '"}';

    request.send(str);
}

function editItems() {
    var request = new XMLHttpRequest();
    request.open("", "");
    request.send();
}

function deleteItems() {
    var request = new XMLHttpRequest();
    request.open("", "");
    request.send();
}
