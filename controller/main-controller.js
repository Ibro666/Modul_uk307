//select table
function selectTableValues() {
    //var request = new XMLHttpRequest();                             
    //request.open("GET", "https://campus.csbe.ch/sollberger-manuel/uek307/Categories");
    //request.setRequestHeader('Authorization', `Bearer ${}`);
    //request.onload = loadedFact;
    //request.send();

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
            table.appendChild(delItem);
        }
    }

}


const body          = document.getElementsByTagName("body");
var messaCont       = document.createElement("div");
var messagePa       = document.createElement("p");                                                                                  // fehlermeldungen oder hinweise in diesem paragraf ausgeben
messagePa.setAttribute("class", "message");
messaCont.appendChild(messagePa);
body[0].appendChild(messagePa);

const navCont       = document.getElementById("nav-content");                                                                       // navigationleiste
var table           = document.getElementById("product-table");
var inData          = document.getElementById("input-data");                                                                        // formular abschnitt im index-file ansprechen
var content         = document.createElement("div");                                                                                // formular container
content.setAttribute("class", "add-content");
let temp            = "";
let pageC           = "";                                                                                                           // der aktuell geladene seite soll unabhängig von seiner inhalt bemerkt werden

// seite wechseln
const pagChan       = document.createElement("button");
var pagChanBtnText  = document.createTextNode("Kategorien");
pagChan.setAttribute("type", "button");
pagChan.setAttribute("class", "change-to-page");
pagChan.appendChild(pagChanBtnText);
navCont.appendChild(pagChan);
pagChan.addEventListener("click", () => { if (pageC == 0) {
                                            loadTableProduct();
                                            pagChan.innerHTML = "";
                                            pagChanBtnText  = document.createTextNode("Kategorien");
                                            pagChan.appendChild(pagChanBtnText);
                                          } else {
                                            loadTableCategory();
                                            pagChan.innerHTML = "";
                                            pagChanBtnText  = document.createTextNode("Produkte");                                        
                                            pagChan.appendChild(pagChanBtnText);
                                          } 
                                        });

// suchfeld
const searchFild    = document.createElement("input");
searchFild.setAttribute("type", "text");

const searchBtn     = document.createElement("button");
var searchBtnText   = document.createTextNode("suchen");
searchBtn.setAttribute("type", "button");
searchBtn.setAttribute("class", "search-btn");
searchBtn.appendChild(searchBtnText);
navCont.appendChild(searchFild);
navCont.appendChild(searchBtn);

// button zu abmelden
const logoutBtn     = document.createElement("button");
var logoutBtnText   = document.createTextNode("abmelden");
logoutBtn.setAttribute("type", "button");
logoutBtn.setAttribute("class", "logout-btn");
logoutBtn.appendChild(logoutBtnText);
navCont.appendChild(logoutBtn);
logoutBtn.addEventListener("click", () => {  
                                            location.href = "login.html";
                                          });

// hinzufügen button erzeugen
function addNewItem() {                                                                                                         // funktion erstellt einen butten am tabellen anfang um generel neu produkte einfügen zukönnen
    const addBtn    = document.createElement("button");
    var addBtnText  = document.createTextNode("Hinzufügen");
    addBtn.appendChild(addBtnText);
    addBtn.setAttribute("class", "add-btn");
    addBtn.setAttribute("type", "button");
    addBtn.addEventListener('click', () => { inData.appendChild(addContent()) });
    return addBtn;
}

// neue produkte hinzufügen, die daten aus inputfelder müssen als paremeter mitgegeben werden
function addItems(sku, active, cat, name, img, desc, price, stock) {
    var request = new XMLHttpRequest();
    request.open("POST", "http://localhost:8888/API/V1/Product/" + sku);
    //request.open("POST", "https://campus.csbe.ch/sollberger-manuel/uek307/Category");
    request.onload = loadResponseMessage;
    var str     = '{"sku":"' + sku + 
                  '","active":"' + active + 
                  '","category":"' + cat + 
                  '","name":"' + name + 
                  '","image":"' + img + 
                  '","description":"' + desc + 
                  '","price":"' + price + 
                  '","stock":"' + stock + '"}';
    //console.log(str);                                                                                                         // prüfen ob der json daten den richtigen format haben
    request.send(str);

    function loadResponseMessage(event) {
        var responseData    = JSON.parse(event.target.responseText);
        messagePa.innerText = responseData.massage;
    }
}

// eine bestehende produkt bearbeiten oder aktualisieren
function editItems(id, sku, active, cat, name, img, desc, price, stock) {
    var request = new XMLHttpRequest();
    request.open("PUT", "http://localhost:8888/API/V1/Product/" + id);
//    request.open("", "");
    request.onload = loadResponseMessage;
    var str     = '{"sku":"' + sku + 
                  '","active":"' + active + 
                  '","category":"' + cat + 
                  '","name":"' + name + 
                  '","image":"' + img + 
                  '","description":"' + desc + 
                  '","price":"' + price + 
                  '","stock":"' + stock + '"}';
    request.send(str);

    function loadResponseMessage(event) {
        var responseData    = JSON.parse(event.target.responseText);
        //console.log(responseData);                                                                                            // prüfen ob der response vollständig kommt
        messagePa.innerText = responseData.massage;
    }
}

// eine bestehende produkt löschen, produkt id muss mitgegeben werden
function deleteItems(id) {
    var request = new XMLHttpRequest();
    request.open("DELETE", "http://localhost:8888/API/V1/Product/" + id);
//    request.open("", "");
    request.onload = loadResponseMessage;
    request.send();

    function loadResponseMessage(event) {
        var responseData    = JSON.parse(event.target.responseText);
        messagePa.innerText = responseData.massage;
    }
    
}

function addContent(status) {                                                                                                   // funktion erstellt eine formular, wo man neue daten eingeben kann um neue produkte hinzuzufügen oder auch die bestehen zu ändern
        content.innerHTML = "";                                                                                                 // vor der ausgabe sicher stellen, das das keine ausgabe vorhanden ist, um eine neue ausgabe generieren zukönnen.
        var item1       = document.createElement("div");
        var item2       = document.createElement("div");
        var item3       = document.createElement("div");
        var item4       = document.createElement("div");
        var item5       = document.createElement("div");
        var item6       = document.createElement("div");
        var item7       = document.createElement("div");
        var item8       = document.createElement("div");
        var item9       = document.createElement("div");
        item1.setAttribute("class", "item-containner");
        item2.setAttribute("class", "item-containner");
        item3.setAttribute("class", "item-containner");
        item4.setAttribute("class", "item-containner");
        item5.setAttribute("class", "item-containner");
        item6.setAttribute("class", "item-containner");
        item7.setAttribute("class", "item-containner");
        item8.setAttribute("class", "item-containner");
        item9.setAttribute("class", "item-containner");

        //var item1     = document.getElementById("item1");
        //var item2     = document.getElementById("item2");
        //var item3     = document.getElementById("item3");
        //var item4     = document.getElementById("item4");
        //var item5     = document.getElementById("item5");
        //var item6     = document.getElementById("item6");
        //var item7     = document.getElementById('item7');
        //var item8     = document.getElementById("item8");
        //var itemBtn   = document.getElementById("item-btn");

        // temporäre variable definieren, um benutzereingabe abzufangen
        let sku         = "";
        let active      = "";
        let cat         = "";
        let name        = "";
        let img         = "";
        let desc        = "";
        let price       = "";
        let stock       = "";

        var laFSku      = document.createElement("label"); 
        var inFlSku     = document.createElement("input");
        var labTitleSku = document.createTextNode("Sku:");
        laFSku.setAttribute("for", "sku-input");
        laFSku.appendChild(labTitleSku);
        inFlSku.setAttribute("type", "text");
        inFlSku.setAttribute("name", "sku-input");
        inFlSku.onchange = () => { sku = inFlSku.value };                                                                       // benutzereingaben beim wechseln der feld abfangen
        item1.appendChild(laFSku);
        item1.appendChild(inFlSku);

        var laFAct      = document.createElement("label");
        var inFlAct     = document.createElement("input");
        var labTitleAct = document.createTextNode("Status:");
        laFAct.setAttribute("for", "active");
        laFAct.appendChild(labTitleAct);
        inFlAct.setAttribute("type", "text");
        inFlAct.setAttribute("name", "active");
        inFlAct.onchange = () => { active = inFlAct.value };
        item2.appendChild(laFAct);
        item2.appendChild(inFlAct);

        var laFCat      = document.createElement("label");
        var inFlCat     = document.createElement("input");
        var labTitleCat = document.createTextNode("Kategorie-Nr.:");
        laFCat.setAttribute("for", "category-id");
        laFCat.appendChild(labTitleCat);
        inFlCat.setAttribute("type", "text");
        inFlCat.setAttribute("name", "category-id");
        inFlCat.onchange = () => { cat = inFlCat.value };
        item3.appendChild(laFCat);
        item3.appendChild(inFlCat);

        var laFNam      = document.createElement("label");
        var inFlNam     = document.createElement("input");
        var labTitleNam = document.createTextNode("Bezeichnung:");
        laFNam.setAttribute("for", "pro-name");
        laFNam.appendChild(labTitleNam);
        inFlNam.setAttribute("type", "text");
        inFlNam.setAttribute("name", "pro-name");
        inFlNam.onchange = () => { name = inFlNam.value };
        item4.appendChild(laFNam);
        item4.appendChild(inFlNam);

        var laFImg      = document.createElement("label");
        var inFlImg     = document.createElement("input");
        var labTitleImg = document.createTextNode("Bilder:");
        laFImg.setAttribute("for", "img");
        laFImg.appendChild(labTitleImg);
        inFlImg.setAttribute("type", "text");
        inFlImg.setAttribute("name", "img");
        inFlImg.onchange = () => { img = inFlImg.value };
        item5.appendChild(laFImg);
        item5.appendChild(inFlImg);

        var laFDesc     = document.createElement("label");
        var inFlDesc    = document.createElement("input");
        var labTitleDesc = document.createTextNode("Beschreibung:");
        laFDesc.setAttribute("for", "description");
        laFDesc.appendChild(labTitleDesc);
        inFlDesc.setAttribute("type", "text");
        inFlDesc.setAttribute("name", "description");
        inFlDesc.onchange = () => { desc = inFlDesc.value };
        item6.appendChild(laFDesc);
        item6.appendChild(inFlDesc);

        var laFPri      = document.createElement("label");
        var inFlPri     = document.createElement("input");
        var labTitlePri = document.createTextNode("Preis:");
        laFPri.setAttribute("for", "price");
        laFPri.appendChild(labTitlePri);
        inFlPri.setAttribute("type", "text");
        inFlPri.setAttribute("name", "price");
        inFlPri.onchange = () => { price = inFlPri.value };
        item7.appendChild(laFPri);
        item7.appendChild(inFlPri);

        var laFSt       = document.createElement("label");
        var inFlSt      = document.createElement("input");
        var labTitleSt  = document.createTextNode("Menge:");
        laFSt.setAttribute("for", "stock");
        laFSt.appendChild(labTitleSt);
        inFlSt.setAttribute("type", "text");
        inFlSt.setAttribute("name", "stock");
        inFlSt.onchange = () => { stock = inFlSt.value };
        item8.appendChild(laFSt);
        item8.appendChild(inFlSt);

        const addBtn = document.createElement("button");
        if (status > 0) {                                                                                                       // status 0 ist das aller erste datensatz, es kann nur eingefügt werden. falls der status höcher 0 ist handelt es sich um einen datensatz der schon existiert
            var addBtnText = document.createTextNode("Speichern");
            addBtn.addEventListener('click', () => { editItems( status                                                          // die werte welche ein benutzer eingegeben hat als parmeter mitgeben.
                                                               ,sku 
                                                               ,active 
                                                               ,cat 
                                                               ,name 
                                                               ,img 
                                                               ,desc 
                                                               ,price 
                                                               ,stock 
                                                               ) 
                                                    ,loadTableProduct() 
                                                    });
        } else {
            var addBtnText = document.createTextNode("Hinzufügen");
            addBtn.addEventListener('click', () => { addItems( sku                                                              // die werte welche ein benutzer eingegeben hat als parmeter mitgeben
                                                              ,active 
                                                              ,cat 
                                                              ,name 
                                                              ,img
                                                              ,desc
                                                              ,price
                                                              ,stock
                                                              )
                                                    ,loadTableProduct() 
                                                    });
        }
        addBtn.appendChild(addBtnText);
        addBtn.setAttribute("class", "add-btn");
        addBtn.setAttribute("type", "button");
        item9.appendChild(addBtn);
        
        // formular ausgeben
    if (content != temp) {                                                                                                      // überprüfen ob der formular schon aus gegeben ist wenn nicht soll ausgegenen werden
        if (pageC == 0) {
            content.appendChild(item2);
            content.appendChild(item4);
            content.appendChild(item9);                                                                                                  // nach dem der formular ausgegeben wurde wird die ausgabe in den temp gespeichert, so kann es beim nächsten aufruf überprüft werden ob der formular schon ausgegeben worden ist
        } else {
            content.appendChild(item1);
            content.appendChild(item2);
            content.appendChild(item3);
            content.appendChild(item4);
            content.appendChild(item5);
            content.appendChild(item6);
            content.appendChild(item7);
            content.appendChild(item8);
            content.appendChild(item9);
        }
        temp = content;   
    } else {
        temp = "";                                                                                                          // variable leeren
        content.innerHTML = "";
        if (pageC == 0) {                                                                                                        // überprüfen ob die kategorien oder produkte geleden sind
            content.appendChild(item2);
            content.appendChild(item4);
            content.appendChild(item9);
        } else {
            content.appendChild(item1);
            content.appendChild(item2);
            content.appendChild(item3);
            content.appendChild(item4);
            content.appendChild(item5);
            content.appendChild(item6);
            content.appendChild(item7);
            content.appendChild(item8);
            content.appendChild(item9);
        }
    }

    return content;
}


function loadTableCategory() {
    var request = new XMLHttpRequest();                             
    request.open("GET", "http://localhost:8888/API/V1/Categorys");
    //request.open("GET", "https://campus.csbe.ch/sollberger-manuel/uek307/Categories");
    request.onload = loadedFact;
    request.send();

    table.innerHTML          = "";                                                                                              // tabelleninhalt vor dem befüllen der tabelle leeren, um die anzeige neuzuladen. anderenfals würde die tabelle nur erweitert anstelle neuzuladen.
    content.innerHTML        = "";

    const rowHeader          = document.createElement("tr");
    const tableHeaderBtnFild = document.createElement("th");                                                                    // am tabellen anfage einen feld definieren, welche einen button enthalten soll

    // test API
    const tabId              = document.createElement("th");
    const tabAkt             = document.createElement("th");
    const tabName            = document.createElement("th");
    const tabValF            = document.createElement("th");
    const tabValT            = document.createElement("th");
    var thColId              = document.createTextNode("Kategorie-Nr.");
    var thAktive             = document.createTextNode("Status");
    var thName               = document.createTextNode("Bezeichnung");
    var thValFr              = document.createTextNode("Erfasst am:");
    var thValTo              = document.createTextNode("letzte Änderung");

    tabId.appendChild(thColId);
    tabAkt.appendChild(thAktive);
    tabName.appendChild(thName);
    tabValF.appendChild(thValFr);
    tabValT.appendChild(thValTo);
    tableHeaderBtnFild.appendChild(addNewItem())

    //var thDiscribe = document.createTextNode("Bezeichnung");  // tabellenheader für profudtive system
    //var thAktive = document.createTextNode("Aktiv");
    //var thSum = document.createTextNode("Summe");
    //tableHeaderDiscribe.appendChild(thDiscribe);
    //tableHeaderAktive.appendChild(thAktive);
    //tableHeaderSum.appendChild(thSum);

    //contentContainer.appendChild(content);
    //contentContainer.appendChild(toolBar);
    //content.appendChild(table);

    table.appendChild(rowHeader);                   // test von
    rowHeader.appendChild(tabId);   
    rowHeader.appendChild(tabAkt);
    rowHeader.appendChild(tabName);
    rowHeader.appendChild(tabValF);
    rowHeader.appendChild(tabValT);                 // test bis
    rowHeader.appendChild(tableHeaderBtnFild);

    // tabelle befüllen
    function loadedFact(event) {
        var responseData = JSON.parse(event.target.responseText);                                                               // die daten aus dem json in die variable ziehen
                
        for (var i = 0; i < responseData.length; i++) {
            var response = responseData[i];
            let pid = responseData[i].category_id;

            // bearbeiten button in der zeile
            const editBtn = document.createElement("button");                                                                   // pro zeile der tabelle soll dem produkt entsprechende button zum bearbeiten der produkt erzeugt und ausgegeben
            var editBtnText = document.createTextNode("Bearbeiten");
            editBtn.appendChild(editBtnText);
            editBtn.setAttribute("class", "edit-btn");
            editBtn.setAttribute("type", "button");
            editBtn.addEventListener('click', () => { inData.appendChild(addContent(pid))                                       // beim klicken der butten soll ein formular ausgegeben werden. formular benötigt in dem fall ein product_id zu identifikation der zeile bzw. produkt
                                                    });

            // löschen butten in der zeile
            const delBtn = document.createElement("button");                                                                    // pro zeile der tabelle soll auch ein dem produkt betreffend butten erzeugt werden, um den produkt löschen zu ermöglichen
            var delBtnText = document.createTextNode("Löschen");
            delBtn.appendChild(delBtnText);
            delBtn.setAttribute("class", "del-btn");
            delBtn.setAttribute("type", "button");
            delBtn.addEventListener('click', () => { deleteItems(pid)
                                                    ,loadTableProduct()                                                         // beim klichen der button soll der der entsprechende produkt gelöscht und der tabelle neugeladen werden. der stimmte produkt soll anhand der product_id festgestellt werden.
                                                   });                                  

            // zeile und zellen erzeugen
            var row         = document.createElement("tr");
            var idColumn    = document.createElement("td");
            var statColumn  = document.createElement("td");
            var nameColumn  = document.createElement("td");
            var valFrColumn = document.createElement("td");
            var valToColumn = document.createElement("td");
            var editItem    = document.createElement("td");
            var delItem     = document.createElement("td");

            // zeile in die tabelle einfügen
            table.appendChild(row);

            row.appendChild(idColumn);
            idColumn.innerText = response.category_id;

            row.appendChild(statColumn);
            statColumn.innerText = response.active;
            
            row.appendChild(nameColumn); 
            nameColumn.innerText = response.name;

            row.appendChild(valFrColumn); 
            valFrColumn.innerText = response.valid_from;
            
            row.appendChild(valToColumn); 
            valToColumn.innerText = response.valid_to;

            row.appendChild(editItem);
            editItem.appendChild(editBtn);

            row.appendChild(delItem);
            delItem.appendChild(delBtn);
        }
    }
    pageC = 0;
}

// tabelle befüllen
function loadTableProduct() {                                                                                                  // abfrage ab die endpoint über get schicken um alle produkte auflisten zu können
    var request = new XMLHttpRequest();                             
    request.open("GET", "http://localhost:8888/API/V1/Products");
    //request.open("GET", "https://campus.csbe.ch/sollberger-manuel/uek307/Categories");
    request.onload = loadedFact;
    request.send();

    table.innerHTML     = "";                                                                                                       // tabelleninhalt vor dem befüllen der tabelle leeren, um die anzeige neuzuladen. anderenfals würde die tabelle nur erweitert anstelle neuzuladen.
    content.innerHTML   = "";

    // Layout definieren
    //const contentContainer = document.createElement("div");
    //const content = document.createElement("div");
    //contentContainer.setAttribute("class", "content-container");

    // navigation 
    //const toolBar = document.createElement("div");

    // tabelle definieren
    //const table = document.createElement("table");
    const rowHeader = document.createElement("tr");
    //table.setAttribute("class", "table-cat-content");

    // titel der tabelle
    //const tableHeaderDiscribe = document.createElement("th");
    //const tableHeaderAktive = document.createElement("th");
    //const tableHeaderSum = document.createElement("th");
    const tableHeaderBtnFild = document.createElement("th");                                                                    // am tabellen anfage einen feld definieren, welche einen button enthalten soll

    // test API
    const tabId     = document.createElement("th");
    const tabSku    = document.createElement("th");
    const tabAkt    = document.createElement("th");
    const tabCat    = document.createElement("th");
    const tabName   = document.createElement("th");
    const tabImg    = document.createElement("th");
    const tabDesc   = document.createElement("th");
    const tabPrice  = document.createElement("th");
    const tabSto    = document.createElement("th");
    const tabValF   = document.createElement("th");
    const tabValT   = document.createElement("th");

    var thColId     = document.createTextNode("Produkt-Nr.");
    var thSku       = document.createTextNode("Sku");
    var thAktive    = document.createTextNode("Status");
    var thCatId     = document.createTextNode("Kategorie-Nr.");
    var thName      = document.createTextNode("Bezeichnung");
    var thImg       = document.createTextNode("Bilder");
    var thDesc      = document.createTextNode("Beschreibung");
    var thPrice     = document.createTextNode("Preis");
    var thStock     = document.createTextNode("Menge");
    var thValFr     = document.createTextNode("Erfasst am:");
    var thValTo     = document.createTextNode("letzte Änderung");

    tabId.appendChild(thColId);
    tabSku.appendChild(thSku);
    tabAkt.appendChild(thAktive);
    tabCat.appendChild(thCatId);
    tabName.appendChild(thName);
    tabImg.appendChild(thImg);
    tabDesc.appendChild(thDesc);
    tabPrice.appendChild(thPrice);
    tabSto.appendChild(thStock);
    tabValF.appendChild(thValFr);
    tabValT.appendChild(thValTo);
    tableHeaderBtnFild.appendChild(addNewItem())

    //var thDiscribe = document.createTextNode("Bezeichnung");  // tabellenheader für profudtive system
    //var thAktive = document.createTextNode("Aktiv");
    //var thSum = document.createTextNode("Summe");
    //tableHeaderDiscribe.appendChild(thDiscribe);
    //tableHeaderAktive.appendChild(thAktive);
    //tableHeaderSum.appendChild(thSum);

    //contentContainer.appendChild(content);
    //contentContainer.appendChild(toolBar);
    //content.appendChild(table);

    table.appendChild(rowHeader);                   // test von
    rowHeader.appendChild(tabId);   
    rowHeader.appendChild(tabSku);
    rowHeader.appendChild(tabAkt);
    rowHeader.appendChild(tabCat);
    rowHeader.appendChild(tabName);
    rowHeader.appendChild(tabImg);
    rowHeader.appendChild(tabDesc);
    rowHeader.appendChild(tabPrice);
    rowHeader.appendChild(tabSto);  
    rowHeader.appendChild(tabValF);
    rowHeader.appendChild(tabValT);                 // test bis
    //rowHeader.appendChild(tableHeaderDiscribe);
    //rowHeader.appendChild(tableHeaderAktive);
    //rowHeader.appendChild(tableHeaderSum);
    rowHeader.appendChild(tableHeaderBtnFild);

    // tabelle befüllen
    function loadedFact(event) {
        var responseData = JSON.parse(event.target.responseText);                                                               // die daten aus dem json in die variable ziehen
                
        for (var i = 0; i < responseData.length; i++) {
            var response = responseData[i];
            let pid = responseData[i].product_id;

            // bearbeiten button in der zeile
            const editBtn = document.createElement("button");                                                                   // pro zeile der tabelle soll dem produkt entsprechende button zum bearbeiten der produkt erzeugt und ausgegeben
            var editBtnText = document.createTextNode("Bearbeiten");
            editBtn.appendChild(editBtnText);
            editBtn.setAttribute("class", "edit-btn");
            editBtn.setAttribute("type", "button");
            editBtn.addEventListener('click', () => { inData.appendChild(addContent(pid)) });                                   // beim klicken der butten soll ein formular ausgegeben werden. formular benötigt in dem fall ein product_id zu identifikation der zeile bzw. produkt

            // löschen butten in der zeile
            const delBtn = document.createElement("button");                                                                    // pro zeile der tabelle soll auch ein dem produkt betreffend butten erzeugt werden, um den produkt löschen zu ermöglichen
            var delBtnText = document.createTextNode("Löschen");
            delBtn.appendChild(delBtnText);
            delBtn.setAttribute("class", "del-btn");
            delBtn.setAttribute("type", "button");
            delBtn.addEventListener('click', () => { deleteItems(pid), loadTableProduct() });                                  // beim klichen der button soll der der entsprechende produkt gelöscht und der tabelle neugeladen werden. der stimmte produkt soll anhand der product_id festgestellt werden.

            // zeile und zellen erzeugen
            var row         = document.createElement("tr");
            var idColumn    = document.createElement("td");
            var statColumn  = document.createElement("td");
            var skuColumn   = document.createElement("td");
            var editItem    = document.createElement("td");
            var delItem     = document.createElement("td");  
            
            // test API
            var idCat       = document.createElement("td");
            var nameColumn  = document.createElement("td");
            var imageColumn = document.createElement("td");
            var descColumn  = document.createElement("td");
            var priceColumn = document.createElement("td");
            var stockColumn = document.createElement("td");
            var valFrColumn = document.createElement("td");
            var valToColumn = document.createElement("td");

            // zeile in die tabelle einfügen
            table.appendChild(row);
                

            // tabellen header für den campus API
            //table.appendChild(idColumn);
            //idColumn.innerText = responseData.category_id;
    
            //table.appendChild(statColumn);
            //statColumn.innerText = responseData.active;

            //table.appendChild(nameColumn);
            //nameColumn.innerText = responseData.name;

            //var row = document.createElement("tr");
            //var idColumn = document.createElement("td");
            //var statColumn = document.createElement("td");
            //var nameColumn = document.createElement("td");
            //var editItem = document.createElement("td");
            //var delItem = document.createElement("td");      



            row.appendChild(idColumn);
            idColumn.innerText = response.product_id;
        
            row.appendChild(skuColumn);
            skuColumn.innerText = response.sku;

            row.appendChild(statColumn);
            statColumn.innerText = response.active;

            row.appendChild(idCat);
            idCat.innerText = response.id_category;
            
            row.appendChild(nameColumn); 
            nameColumn.innerText = response.name;

            row.appendChild(imageColumn);
            imageColumn.innerText = response.image;
            
            row.appendChild(descColumn); 
            descColumn.innerText = response.description;
            
            row.appendChild(priceColumn); 
            priceColumn.innerText = response.price;
            
            row.appendChild(stockColumn); 
            stockColumn.innerText = response.stock;
            
            row.appendChild(valFrColumn); 
            valFrColumn.innerText = response.valid_from;
            
            row.appendChild(valToColumn); 
            valToColumn.innerText = response.valid_to;

            row.appendChild(editItem);
            editItem.appendChild(editBtn);

            row.appendChild(delItem);
            delItem.appendChild(delBtn);
        }
    }
    pageC = 1;
}

loadTableProduct();
