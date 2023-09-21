const body = document.getElementsByTagName("body");
var messaCont = document.createElement("div");
var messagePa = document.createElement("p");                                                                                    // fehlermeldungen oder hinweise in diesem paragraf ausgeben
messagePa.setAttribute("class", "message");
messaCont.appendChild(messagePa);
body[0].appendChild(messagePa);

const navCont = document.getElementById("nav-content");                                                                         // navigationleiste
const table = document.createElement("table");
var content = document.getElementById("content");                                                                               // formular abschnitt im index-file ansprechen
var formsContainer = document.createElement("div");                                                                             // formular container
formsContainer.setAttribute("class", "add-content");
let temp = "";                                                                                                                  // im temp soll der aktuell geladene formular gespeichert werden.
let pageC = "";                                                                                                                 // der aktuell geladene seite soll unabhängig von seiner inhalt bemerkt werden
const title = document.createElement("h1");
title.classList.add("content-title");

// seite wechseln
const pagChan = document.createElement("button");                                                                               // in der navigationsleite soll ein button das wechseln zwischen Kategorie und produkt ermöglichen
var pagChanBtnText = document.createTextNode("Kategorien");
pagChan.setAttribute("type", "button");
pagChan.setAttribute("class", "change-to-page");
pagChan.appendChild(pagChanBtnText);
navCont.appendChild(pagChan);
pagChan.addEventListener("click", () => { if (pageC > 0) {                                                                      // der button soll dynamisch zwischen kategorie und produkt switchen bzw. sich anpassen können
                                            loadTableCategory();
                                            pagChan.innerHTML = "";
                                            pagChanBtnText = document.createTextNode("Produkte");                                        
                                            pagChan.appendChild(pagChanBtnText);
                                          } else {
                                            loadTableProduct();
                                            pagChan.innerHTML = "";
                                            pagChanBtnText = document.createTextNode("Kategorien");
                                            pagChan.appendChild(pagChanBtnText);
                                          } 
                                        });

// suchfeld
const searchFild = document.createElement("input");                                                                             // in der navigationsleiste soll ein suchfeld angezeigt werden 
searchFild.setAttribute("type", "text");
searchFild.setAttribute("placeholder", " id / sku");                                                                            // suchfeld soll erstmal das suchen ein kategorie nach seiner id und ein produkt nach seiner sku ermöglichen
let valToSearch = "";
searchFild.onchange = () => { valToSearch = searchFild.value };
const searchBtn = document.createElement("button");
var searchBtnText = document.createTextNode("suchen");
searchBtn.setAttribute("type", "button");
searchBtn.setAttribute("class", "search-btn");
searchBtn.appendChild(searchBtnText);
navCont.appendChild(searchFild);
navCont.appendChild(searchBtn);
searchBtn.addEventListener("click", () => { if (pageC > 0) {
                                               loadTableProduct(valToSearch);
                                            } else {
                                               loadTableCategory(valToSearch);
                                            }
                                          });


// button zu abmelden
const logoutBtn = document.createElement("button");
var logoutBtnText = document.createTextNode("abmelden");
logoutBtn.setAttribute("type", "button");
logoutBtn.setAttribute("class", "logout-btn");
logoutBtn.appendChild(logoutBtnText);
navCont.appendChild(logoutBtn);
logoutBtn.addEventListener("click", () => {  
                                            location.href = "./login.php";
                                          });

// hinzufügen button erzeugen
function addNewItem() {                                                                                                         // funktion erstellt einen butten am tabellen anfang um generel neu produkte einfügen zukönnen
    const addBtn = document.createElement("button");
    var addBtnText = document.createTextNode("Hinzufügen");
    addBtn.appendChild(addBtnText);
    addBtn.setAttribute("class", "add-btn");
    addBtn.setAttribute("type", "button");
    addBtn.addEventListener('click', () => { content.appendChild(addContent()) });
    return addBtn;
}

// neue produkte hinzufügen, die daten aus inputfelder müssen als paremeter mitgegeben werden
function addItems(sku, active, cat, name, img, desc, price, stock) {
    var request = new XMLHttpRequest();
    var str     = "";

    if (pageC > 0) {
    //    request.open("POST", "http://localhost:8888/API/V1/Product/" + sku);
        request.open("PUT", "https://campus.csbe.ch/sollberger-manuel/uek307/Product/" + sku);
        str     = '{"sku":"' + sku + 
                  '","active":"' + active + 
                  '","category":"' + cat + 
                  '","name":"' + name + 
                  '","image":"' + img + 
                  '","description":"' + desc + 
                  '","price":"' + price + 
                  '","stock":"' + stock + '"}';
    } else {
     //   request.open("POST", "http://localhost:8888/API/V1/Category/" + name);
        request.open("POST", "https://campus.csbe.ch/sollberger-manuel/uek307/Category");
        str     = '{"active":"' + active + 
                  '","name":"' + name + '"}';
    }
    request.onload = loadResponseMessage;
    request.send(str);

    function loadResponseMessage(event) {
        if (event.target.status == 200 || event.target.status == 201) {
//            var responseData = JSON.parse(event.target.responseText);
            messagePa.innerText = "Eintrag wurde erstellt.";
            //messagePa.innerText = responseData.massage;
        } else if (event.target.status == 404) {
            messagePa.innerText = "Die Seite wurde nicht gefunden!";
        } else if (event.target.status == 500) {
            messagePa.innerText = "Server Fehler!";
        } else {
            messagePa.innerText = "Beim laden der Produke ist Fehler auf geträten!";
        }
    }
}

// eine bestehende produkt oder Kategorie bearbeiten oder aktualisieren
function editItems(id, sku, active, cat, name, img, desc, price, stock) {
    var request = new XMLHttpRequest();
    var str     = "";

    if (pageC > 0) {
    //    request.open("PUT", "http://localhost:8888/API/V1/Product/" + id);
        request.open("PUT", "https://campus.csbe.ch/sollberger-manuel/uek307/Product/" + id);
        str     = '{"sku":"' + sku + 
                  '","active":"' + active + 
                  '","category":"' + cat + 
                  '","name":"' + name + 
                  '","image":"' + img + 
                  '","description":"' + desc + 
                  '","price":"' + price + 
                  '","stock":"' + stock + '"}';
    } else {
   //     request.open("PUT", "http://localhost:8888/API/V1/Category/" + id);
        request.open("PUT", "https://campus.csbe.ch/sollberger-manuel/uek307/Category/" + id);
        str     = '{"active":"' + active + 
                  '","name":"' + name + '"}';
    }
    request.onload = loadResponseMessage;
    request.send(str);

    function loadResponseMessage(event) {
        if (event.target.status == 201) {
//            var responseData = JSON.parse(event.target.responseText);
            messagePa.innerText = "Eintrag wurde angepasst!.";
            //messagePa.innerText = responseData.massage;
        } else if (event.target.status == 404) {
            messagePa.innerText = "Die Seite wurde nicht gefunden!";
        } else if (event.target.status == 500) {
            messagePa.innerText = "Server Fehler!";
        } else {
            messagePa.innerText = "Beim laden der Produke ist Fehler auf geträten!";
        }
    }
}

// eine bestehende produkt oder kategorie löschen, produkt id muss mitgegeben werden
function deleteItems(id) {                                                                                                      // id ist in dem fall nur ein parameter, bei aufruf der funktion entweder ein produkt sku oder ketegorie_id muss mitgegeben werden
    var request = new XMLHttpRequest();

    if (pageC > 0) {
//        request.open("DELETE", "http://localhost:8888/API/V1/Product/" + id);
      request.open("DELETE", "https://campus.csbe.ch/sollberger-manuel/uek307/Product/" + id);
    } else {
//        request.open("DELETE", "http://localhost:8888/API/V1/Category/" + id);
      request.open("DELETE", "https://campus.csbe.ch/sollberger-manuel/uek307/Category/" + id);
    }
    request.onload = loadResponseMessage;
    request.send();

    function loadResponseMessage(event) {
        if (event.target.status == 200) {
//            var responseData = JSON.parse(event.target.responseText);
//            messagePa.innerText = responseData.massage;
            messagePa.innerText = "Eintrag wurde gelöscht!";
        } else if (event.target.status == 404) {
            messagePa.innerText = "Die Seite wurde nicht gefunden!";
        } else if (event.target.status == 500) {
            messagePa.innerText = "Server Fehler!";
        } else {
            messagePa.innerText = "Beim laden der Produke ist Fehler auf geträten!";
        }
    }
}

function addContent(status) {                                                                                                   // funktion erstellt eine formular, wo man neue daten eingeben kann um neue produkte hinzuzufügen oder auch die bestehen zu ändern
        formsContainer.innerHTML = "";
        content.innerHTML = "";                                                                                                 // vor der ausgabe sicher stellen, das das keine ausgabe vorhanden ist, um eine neue ausgabe generieren zukönnen.
        var item1 = document.createElement("div");
        var item2 = document.createElement("div");
        var item3 = document.createElement("div");
        var item4 = document.createElement("div");
        var item5 = document.createElement("div");
        var item6 = document.createElement("div");
        var item7 = document.createElement("div");
        var item8 = document.createElement("div");
        var item9 = document.createElement("div");
        var erMessage = document.createElement("div");
        item1.setAttribute("class", "item-containner");
        item2.setAttribute("class", "item-containner");
        item3.setAttribute("class", "item-containner");
        item4.setAttribute("class", "item-containner");
        item5.setAttribute("class", "item-containner");
        item6.setAttribute("class", "item-containner");
        item7.setAttribute("class", "item-containner");
        item8.setAttribute("class", "item-containner");
        item9.setAttribute("class", "item-containner item-btn");

        // temporäre variable definieren, um benutzereingabe abzufangen
        let sku = "";
        let active = "";
        let cat = "";
        let name = "";
        let img = "";
        let desc = "";
        let price = "";
        let stock = "";

        var laFSku = document.createElement("label"); 
        var inFlSku = document.createElement("input");
        var labTitleSku = document.createTextNode("Sku:");
        laFSku.setAttribute("for", "sku-input");
        laFSku.appendChild(labTitleSku);
        inFlSku.setAttribute("type", "text");
        inFlSku.setAttribute("name", "sku-input");
        inFlSku.onchange = () => { sku = inFlSku.value };                                                                       // benutzereingaben beim wechseln der feld abfangen
        item1.appendChild(laFSku);
        item1.appendChild(inFlSku);

        var laFAct = document.createElement("label");
        var inFlAct = document.createElement("input");
        var labTitleAct = document.createTextNode("Status:");
        laFAct.setAttribute("for", "active");
        laFAct.appendChild(labTitleAct);
        inFlAct.setAttribute("type", "text");
        inFlAct.setAttribute("name", "active");
        inFlAct.onchange = () => { active = inFlAct.value };
        item2.appendChild(laFAct);
        item2.appendChild(inFlAct);

        var laFCat = document.createElement("label");
        var inFlCat = document.createElement("input");
        var labTitleCat = document.createTextNode("Kategorie-Nr.:");
        laFCat.setAttribute("for", "category-id");
        laFCat.appendChild(labTitleCat);
        inFlCat.setAttribute("type", "text");
        inFlCat.setAttribute("name", "category-id");
        inFlCat.onchange = () => { cat = inFlCat.value };
        item3.appendChild(laFCat);
        item3.appendChild(inFlCat);

        var laFNam = document.createElement("label");
        var inFlNam = document.createElement("input");
        var labTitleNam = document.createTextNode("Bezeichnung:");
        laFNam.setAttribute("for", "pro-name");
        laFNam.appendChild(labTitleNam);
        inFlNam.setAttribute("type", "text");
        inFlNam.setAttribute("name", "pro-name");
        inFlNam.onchange = () => { name = inFlNam.value };
        item4.appendChild(laFNam);
        item4.appendChild(inFlNam);

        var laFImg = document.createElement("label");
        var inFlImg = document.createElement("input");
        var labTitleImg = document.createTextNode("Bilder:");
        laFImg.setAttribute("for", "img");
        laFImg.appendChild(labTitleImg);
        inFlImg.setAttribute("type", "text");
        inFlImg.setAttribute("name", "img");
        inFlImg.onchange = () => { img = inFlImg.value };
        item5.appendChild(laFImg);
        item5.appendChild(inFlImg);

        var laFDesc = document.createElement("label");
        var inFlDesc = document.createElement("input");
        var labTitleDesc = document.createTextNode("Beschreibung:");
        laFDesc.setAttribute("for", "description");
        laFDesc.appendChild(labTitleDesc);
        inFlDesc.setAttribute("type", "text");
        inFlDesc.setAttribute("name", "description");
        inFlDesc.onchange = () => { desc = inFlDesc.value };
        item6.appendChild(laFDesc);
        item6.appendChild(inFlDesc);

        var laFPri = document.createElement("label");
        var inFlPri = document.createElement("input");
        var labTitlePri = document.createTextNode("Preis:");
        laFPri.setAttribute("for", "price");
        laFPri.appendChild(labTitlePri);
        inFlPri.setAttribute("type", "text");
        inFlPri.setAttribute("name", "price");
        inFlPri.onchange = () => { price = inFlPri.value };
        item7.appendChild(laFPri);
        item7.appendChild(inFlPri);

        var laFSt = document.createElement("label");
        var inFlSt = document.createElement("input");
        var labTitleSt = document.createTextNode("Menge:");
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
            addBtn.addEventListener('click', (e) => { 
                                                         if (pageC > 0) {
                                                            if (sku === "" || sku == null ||
                                                                active === "" || active == null ||
                                                                cat === "" || cat == null ||
                                                                name === "" || name == null ||
                                                                img === "" || img == null ||
                                                                desc === "" || desc == null ||
                                                                price === "" || price == null ||
                                                                stock === "" || stock == null) {
                                                                    erMessage.innerText = "Felder ausfüllen!";
                                                                    erMessage.classList.add("error-message");
                                                                    inFlSku.classList.add("error-input");
                                                                    inFlAct.classList.add("error-input");
                                                                    inFlCat.classList.add("error-input");
                                                                    inFlNam.classList.add("error-input");
                                                                    inFlImg.classList.add("error-input");
                                                                    inFlDesc.classList.add("error-input");
                                                                    inFlPri.classList.add("error-input");
                                                                    inFlSt.classList.add("error-input");
                                                            } else {
                                                            	editItems( status                                                         // die werte welche ein benutzer eingegeben hat als parmeter mitgeben.
                                                                	  ,sku 
                                                                	  ,active 
                                                                   	  ,cat 
                                                                	  ,name 
                                                                	  ,img 
                                                                	  ,desc 
                                                                	  ,price 
                                                                	  ,stock );
                                                                 loadTableProduct();
                                                            }
                                                         } else {
                                                            if (active === "" || active == null ||
                                                                name === "" || name == null) {
                                                                    erMessage.innerText = "Felder ausfüllen!";
                                                                    erMessage.classList.add("error-message");
                                                                    inFlAct.classList.add("error-input");
                                                                    inFlNam.classList.add("error-input");
                                                            } else {
                                                            	editItems( status                                                         // die werte welche ein benutzer eingegeben hat als parmeter mitgeben.
                                                                	  ,sku 
                                                                	  ,active 
                                                                	  ,cat 
                                                                	  ,name 
                                                                	  ,img 
                                                                	  ,desc 
                                                                	  ,price 
                                                                	  ,stock );
                                                             	loadTableCategory();
                                                            }
                                                         }
                                                    });
        } else {
            var addBtnText = document.createTextNode("Hinzufügen");
            addBtn.addEventListener('click', () => { 
                                                         if (pageC > 0) {
                                                            if (sku === "" || sku == null ||
                                                                active === "" || active == null ||
                                                                cat === "" || cat == null ||
                                                                name === "" || name == null ||
                                                                img === "" || img == null ||
                                                                desc === "" || desc == null ||
                                                                price === "" || price == null ||
                                                                stock === "" || stock == null) {
                                                                    erMessage.innerText = "Felder ausfüllen!";
                                                                    erMessage.classList.add("error-message");
                                                                    inFlSku.classList.add("error-input");
                                                                    inFlAct.classList.add("error-input");
                                                                    inFlCat.classList.add("error-input");
                                                                    inFlNam.classList.add("error-input");
                                                                    inFlImg.classList.add("error-input");
                                                                    inFlDesc.classList.add("error-input");
                                                                    inFlPri.classList.add("error-input");
                                                                    inFlSt.classList.add("error-input");
                                                            } else { 
                                                            addItems( sku                                                              // die werte welche ein benutzer eingegeben hat als parmeter mitgeben
                                                              ,active 
                                                              ,cat 
                                                              ,name 
                                                              ,img
                                                              ,desc
                                                              ,price
                                                              ,stock);
                                                                loadTableProduct();
                                                            }
                                                         } else {
                                                            if (active === "" || active == null ||
                                                                name === "" || name == null) {
                                                                    erMessage.innerText = "Felder ausfüllen!";
                                                                    erMessage.classList.add("error-message");
                                                                    inFlAct.classList.add("error-input");
                                                                    inFlNam.classList.add("error-input");
                                                            } else {
                                                            addItems( sku                                                              // die werte welche ein benutzer eingegeben hat als parmeter mitgeben
                                                              ,active 
                                                              ,cat 
                                                              ,name 
                                                              ,img
                                                              ,desc
                                                              ,price
                                                              ,stock);
                                                                loadTableCategory();
                                                            }
                                                         }
                                                    });
        }
        addBtn.appendChild(addBtnText);
        addBtn.setAttribute("class", "add-btn add-btn-in-forms");
        addBtn.setAttribute("type", "button");
        item9.appendChild(addBtn);

        var canselBtn = document.createElement("button");
        var canselText = document.createTextNode("Abbrechen");
        canselBtn.setAttribute("class", "cansel-btn");
        canselBtn.setAttribute("type", "button");
        canselBtn.addEventListener("click", () => {  if (pageC > 0) {
                                                        loadTableProduct();
                                                     } else {
                                                        loadTableCategory();
                                                     } 
                                                   });
        canselBtn.appendChild(canselText);
        item9.appendChild(canselBtn);

        inFlSku.addEventListener("focus", () => {
            inFlSku.classList.remove("error-input");                                                                            // beim aktivieren der inputfeld soll der roter rand entfernt werden
            erMessage.innerText = "";                                                                                           // fehler meldung entfernen
        });

        inFlAct.addEventListener("focus", () => {
            inFlAct.classList.remove("error-input");
            erMessage.innerText = "";
        });

        inFlCat.addEventListener("focus", () => {
            inFlCat.classList.remove("error-input");
            erMessage.innerText = "";
        });
        
        inFlNam.addEventListener("focus", () => {
            inFlNam.classList.remove("error-input");
            erMessage.innerText = "";
        });

        inFlImg.addEventListener("focus", () => {
            inFlImg.classList.remove("error-input");
            erMessage.innerText = "";
        });

        inFlDesc.addEventListener("focus", () => {
            inFlDesc.classList.remove("error-input");
            erMessage.innerText = "";
        });

        inFlPri.addEventListener("focus", () => {
            inFlPri.classList.remove("error-input");
            erMessage.innerText = "";
        });

        inFlSt.addEventListener("focus", () => {
            inFlSt.classList.remove("error-input");
            erMessage.innerText = "";
        });

        // formular ausgeben
    if (formsContainer != temp) {                                                                                               // überprüfen ob der formular schon aus gegeben ist wenn nicht soll ausgegenen werden
        if (pageC > 0) {
            formsContainer.appendChild(item1);
            formsContainer.appendChild(item2);
            formsContainer.appendChild(item3);
            formsContainer.appendChild(item4);
            formsContainer.appendChild(item5);
            formsContainer.appendChild(item6);
            formsContainer.appendChild(item7);
            formsContainer.appendChild(item8);
            formsContainer.appendChild(item9);            
        } else {
            formsContainer.appendChild(item2);
            formsContainer.appendChild(item4);
            formsContainer.appendChild(item9);                                                                                  // nach dem der formular ausgegeben wurde wird die ausgabe in den temp gespeichert, so kann es beim nächsten aufruf überprüft werden ob der formular schon ausgegeben worden ist
        }
        temp = formsContainer;   
    } else {
        temp = "";                                                                                                              // variable leeren
        formsContainer.innerHTML = "";
        if (pageC > 0) {                                                                                                        // überprüfen ob die kategorien oder produkte geleden sind
            formsContainer.appendChild(item1);
            formsContainer.appendChild(item2);
            formsContainer.appendChild(item3);
            formsContainer.appendChild(item4);
            formsContainer.appendChild(item5);
            formsContainer.appendChild(item6);
            formsContainer.appendChild(item7);
            formsContainer.appendChild(item8);
            formsContainer.appendChild(item9);
        } else {
            formsContainer.appendChild(item2);
            formsContainer.appendChild(item4);
            formsContainer.appendChild(item9);
        }
    }
    formsContainer.appendChild(erMessage);

    return formsContainer;
}

function loadTableCategory(id) {
    var request = new XMLHttpRequest();
    
    if (id) {
//        request.open("GET", "http://localhost:8888/API/V1/Category/" + id);
        request.open("GET", "https://campus.csbe.ch/sollberger-manuel/uek307/Category/" + id);
    } else {
//        request.open("GET", "http://localhost:8888/API/V1/Categorys");
        request.open("GET", "https://campus.csbe.ch/sollberger-manuel/uek307/Categories");
    }
    request.onload = loadedFact;
    request.send();

    formsContainer.innerHTML = "";
    table.innerHTML = "";                                                                                                       // tabelleninhalt vor dem befüllen der tabelle leeren, um die anzeige neuzuladen. anderenfals würde die tabelle nur erweitert anstelle neuzuladen.
    content.innerHTML = "";

    title.innerText = "Kategorie";
    const rowHeader = document.createElement("tr");
    const rowContainer = document.createElement("div");
    const tableHeaderBtnFild = document.createElement("th");                                                                    // am tabellen anfage einen feld definieren, welche einen button enthalten soll
    const addBtnContainer = document.createElement("div");
    rowHeader.classList.add("row-header");
    rowHeader.classList.add("row-h-cat");
    rowContainer.classList.add("row-container-cat");
    addBtnContainer.classList.add("add-btn-container");
    table.classList.add("table-layout");                                                                                        // da kategorie weniger inhalte als produkte hat soll es zentriert werden

    const tabId              = document.createElement("th");
    const tabAkt             = document.createElement("th");
    const tabName            = document.createElement("th");
    //const tabValF            = document.createElement("th");
    //const tabValT            = document.createElement("th");
    var thColId              = document.createTextNode("Kategorie-Nr.");
    var thAktive             = document.createTextNode("Status");
    var thName               = document.createTextNode("Bezeichnung");
    //var thValFr              = document.createTextNode("Erfasst am:");
    //var thValTo              = document.createTextNode("letzte Änderung");

    tabId.appendChild(thColId);
    tabAkt.appendChild(thAktive);
    tabName.appendChild(thName);
    //tabValF.appendChild(thValFr);
    //tabValT.appendChild(thValTo);
    tableHeaderBtnFild.appendChild(addBtnContainer);                                                                            // das butten um neue item hinzuzufügen in die spalte platzueren
    addBtnContainer.appendChild(addNewItem());

    table.appendChild(rowHeader);
    content.appendChild(title);
    content.appendChild(table);                                                                                                 // spaltentitel in die tabelle hinzufügen
    rowHeader.appendChild(rowContainer);
    rowContainer.appendChild(tabId);
    rowContainer.appendChild(tabAkt);
    rowContainer.appendChild(tabName);
    //rowContainer.appendChild(tabValF);
    //rowContainer.appendChild(tabValT);
    rowContainer.appendChild(tableHeaderBtnFild);

    // tabelle befüllen
    function loadedFact(event) {
        var responseData = JSON.parse(event.target.responseText);                                                               // die daten aus dem json in die variable ziehen

        if (event.target.status == 200) {                                                                                       // überprüfen ob die verbindung in ordnung ist und ein antwort vorhanden ist
            for (var i = 0; i < responseData.length; i++) {
                var response = responseData[i];
                let cId = responseData[i].category_id;

                // bearbeiten button in der zeile
                const editBtn = document.createElement("button");                                                               // pro zeile der tabelle soll dem produkt entsprechende button zum bearbeiten der produkt erzeugt und ausgegeben
                var editBtnText = document.createTextNode("Bearbeiten");
                editBtn.appendChild(editBtnText);
                editBtn.setAttribute("class", "edit-btn");
                editBtn.setAttribute("type", "button");
                editBtn.addEventListener('click', () => { content.appendChild(addContent(cId));                                 // beim klicken der butten soll ein formular ausgegeben werden. formular benötigt in dem fall ein product_id zu identifikation der zeile bzw. produkt
                                                        });

                // löschen butten in der zeile
                const delBtn = document.createElement("button");                                                                // pro zeile der tabelle soll auch ein dem produkt betreffend butten erzeugt werden, um den produkt löschen zu ermöglichen
                var delBtnText = document.createTextNode("Löschen");
                delBtn.appendChild(delBtnText);
                delBtn.setAttribute("class", "del-btn");
                delBtn.setAttribute("type", "button");
                delBtn.addEventListener('click', () => { deleteItems(cId);
                                                         if (pageC > 0) {
                                                             loadTableProduct();
                                                         } else {
                                                             loadTableCategory();
                                                         }                                                                      // beim klichen der button soll der der entsprechende produkt gelöscht und der tabelle neugeladen werden. der stimmte produkt soll anhand der product_id festgestellt werden.
                                                        });                                  

                // zeile und zellen erzeugen
                var row = document.createElement("tr");
                var idColumn = document.createElement("td");
                var statColumn = document.createElement("td");
                var nameColumn = document.createElement("td");
                //var valFrColumn = document.createElement("td");
                //var valToColumn = document.createElement("td");
                var btnColumn = document.createElement("td");
                var editItem = document.createElement("div");
                var delItem = document.createElement("div");
                var btnContainer = document.createElement("div");

                row.classList.add("items-row");
                row.classList.add("i-row-cat");
                editItem.classList.add("row-btn-edit");
                delItem.classList.add("row-btn-del");
                btnContainer.classList.add("row-btns");

                // zeile in die tabelle einfügen
                table.appendChild(row);

                row.appendChild(idColumn);
                idColumn.innerText = response.category_id;

                row.appendChild(statColumn);
                statColumn.innerText = response.active;
                
                row.appendChild(nameColumn); 
                nameColumn.innerText = response.name;

                //row.appendChild(valFrColumn); 
                //valFrColumn.innerText = response.valid_from;
                
                //row.appendChild(valToColumn); 
                //valToColumn.innerText = response.valid_to;

                row.appendChild(btnColumn);
                btnColumn.appendChild(btnContainer);

                btnContainer.appendChild(editItem);                                                                             // pro zeile zu den jeweiligen datensätze butten zu editieren platzieren
                editItem.appendChild(editBtn);

                btnContainer.appendChild(delItem);
                delItem.appendChild(delBtn);   
            }
        } else if (event.target.status == 404) {
            messagePa.innerText = "Die Seite wurde nicht gefunden!";
        } else if (event.target.status == 500) {
            messagePa.innerText = "Server Fehler!";
        } else {
            messagePa.innerText = "Beim laden der Produke ist Fehler auf geträten!";
        }
    }
    pageC = 0;
}

// tabelle befüllen
function loadTableProduct(id) {                                                                                                 // abfrage ab die endpoint über get schicken um alle produkte auflisten zu können
    var request = new XMLHttpRequest();                             
    
    if (id) {
//        request.open("GET", "http://localhost:8888/API/V1/Product/" + id);
        request.open("GET", "https://campus.csbe.ch/sollberger-manuel/uek307/Product/" + id);    
    } else {
//        request.open("GET", "http://localhost:8888/API/V1/Products");
        request.open("GET", "https://campus.csbe.ch/sollberger-manuel/uek307/Products");
    }
    request.onload = loadedFact;
    request.send();
    
    formsContainer.innerHTML = "";
    table.innerHTML = "";                                                                                                       // tabelleninhalt vor dem befüllen der tabelle leeren, um die anzeige neuzuladen. anderenfals würde die tabelle nur erweitert anstelle neuzuladen.
    content.innerHTML = "";

    // tabelle befüllen
    function loadedFact(event) {
        title.innerText = "Produkt";
        const rowHeader = document.createElement("tr");
        const rowContainer = document.createElement("div");
        const tabId = document.createElement("th");                                                                             // spalten erzeugen
        const tabSku = document.createElement("th");
        const tabAkt = document.createElement("th");
        const tabCat = document.createElement("th");
        const tabName = document.createElement("th");
        const tabImg = document.createElement("th");
        const tabDesc = document.createElement("th");
        const tabPrice = document.createElement("th");
        const tabSto = document.createElement("th");
        //const tabValF = document.createElement("th");
        //const tabValT = document.createElement("th");
        const tableHeaderBtnFild = document.createElement("th");                                                                // am tabellen anfage einen feld definieren, welche einen button enthalten soll
        const addBtnContainer = document.createElement("div");
        rowHeader.classList.add("row-header");
        rowContainer.classList.add("row-container");
        addBtnContainer.classList.add("add-btn-container");
        table.classList.remove("table-layout");

        var thColId = document.createTextNode("ID");                                                                            // spalten titel definieren
        var thSku = document.createTextNode("Sku");
        var thAktive = document.createTextNode("Status");
        var thCatId = document.createTextNode("Kategorie-Nr.");
        var thName = document.createTextNode("Bezeichnung");
        var thImg = document.createTextNode("Bilder");
        var thDesc = document.createTextNode("Beschreibung");
        var thPrice = document.createTextNode("Preis");
        var thStock = document.createTextNode("Menge");
        //var thValFr = document.createTextNode("Erfasst am:");
        //var thValTo = document.createTextNode("letzte Änderung");

        tabId.appendChild(thColId);                                                                                             // spalten titel in die jeweilige spalte zuweisen
        tabSku.appendChild(thSku);
        tabAkt.appendChild(thAktive);
        tabCat.appendChild(thCatId);
        tabName.appendChild(thName);
        tabImg.appendChild(thImg);
        tabDesc.appendChild(thDesc);
        tabPrice.appendChild(thPrice);
        tabSto.appendChild(thStock);
        //tabValF.appendChild(thValFr);
        //tabValT.appendChild(thValTo);
        tableHeaderBtnFild.appendChild(addBtnContainer);                                                                        // das butten um neue item hinzuzufügen in die spalte platzueren
        addBtnContainer.appendChild(addNewItem());

        table.appendChild(rowHeader);
        content.appendChild(title);
        content.appendChild(table);                                                                                             // spaltentitel in die tabelle hinzufügen
        rowHeader.appendChild(rowContainer);
        rowContainer.appendChild(tabId);                                                                                        // spaltentitel in der tabelle platzieren
        rowContainer.appendChild(tabSku);
        rowContainer.appendChild(tabAkt);
        rowContainer.appendChild(tabCat);
        rowContainer.appendChild(tabName);
        rowContainer.appendChild(tabImg);
        rowContainer.appendChild(tabDesc);
        rowContainer.appendChild(tabPrice);
        rowContainer.appendChild(tabSto);  
        //rowContainer.appendChild(tabValF);
        //rowContainer.appendChild(tabValT);
        rowContainer.appendChild(tableHeaderBtnFild);    

        if (event.target.status === 200) {                                                                                      // überprüfen ob die anfrage und die authentifikation erfolgreich war
            var responseData = JSON.parse(event.target.responseText);                                                           // die daten aus dem json in die variable ziehen            

            for (var i = 0; i < responseData.length; i++) {
                var response = responseData[i];
                let pSku = responseData[i].sku;

                // bearbeiten button in der zeile
                const editBtn = document.createElement("button");                                                               // pro zeile der tabelle soll dem produkt entsprechende button zum bearbeiten der produkt erzeugt und ausgegeben
                var editBtnText = document.createTextNode("Bearbeiten");
                editBtn.appendChild(editBtnText);
                editBtn.setAttribute("class", "edit-btn");
                editBtn.setAttribute("type", "button");
                editBtn.addEventListener('click', () => { content.appendChild(addContent(pSku)) });                              // beim klicken der butten soll ein formular ausgegeben werden. formular benötigt in dem fall ein product_id zu identifikation der zeile bzw. produkt

                // löschen butten in der zeile
                const delBtn = document.createElement("button");                                                                // pro zeile der tabelle soll auch ein dem produkt betreffend butten erzeugt werden, um den produkt löschen zu ermöglichen
                var delBtnText = document.createTextNode("Löschen");
                delBtn.appendChild(delBtnText);
                delBtn.setAttribute("class", "del-btn");
                delBtn.setAttribute("type", "button");
                delBtn.addEventListener('click', () => { deleteItems(pSku), loadTableProduct() });                               // beim klichen der button soll der der entsprechende produkt gelöscht und der tabelle neugeladen werden. der stimmte produkt soll anhand der product_id festgestellt werden.

                // zeile und zellen erzeugen
                var row = document.createElement("tr");
                var idColumn = document.createElement("td");
                var statColumn = document.createElement("td");
                var skuColumn = document.createElement("td");
                var idCat = document.createElement("td");
                var nameColumn = document.createElement("td");
                var imageColumn = document.createElement("td");
                var descColumn = document.createElement("td");
                var priceColumn = document.createElement("td");
                var stockColumn = document.createElement("td");
                //var valFrColumn = document.createElement("td");
                //var valToColumn = document.createElement("td");
                var btnColumn = document.createElement("td");
                var editItem = document.createElement("div");
                var delItem = document.createElement("div");
                var btnContainer = document.createElement("div");

                row.classList.add("items-row");
                editItem.classList.add("row-btn-edit");
                delItem.classList.add("row-btn-del");
                btnContainer.classList.add("row-btns");

                // zeile in die tabelle einfügen
                table.appendChild(row);

                row.appendChild(idColumn);                                                                                      // jeweilige spaltenwerte pro zeile platzieren
                idColumn.innerText = response.product_id;                                                                       // spaltenwerte in einer zeile ausgeben
            
                row.appendChild(skuColumn);
                skuColumn.innerText = response.sku;

                row.appendChild(statColumn);
                statColumn.innerText = response.active;

                row.appendChild(idCat);
                idCat.innerText = response.id_category;
                
                row.appendChild(nameColumn); 
                nameColumn.innerText = response.name;

                row.appendChild(imageColumn);
//                imageColumn.innerText = response.image;
                imageColumn.innerText = response.product_image;
                
                row.appendChild(descColumn); 
                descColumn.innerText = response.description;
                
                row.appendChild(priceColumn); 
                priceColumn.innerText = response.price;
                
                row.appendChild(stockColumn); 
                stockColumn.innerText = response.stock;
                
                //row.appendChild(valFrColumn); 
                //valFrColumn.innerText = response.valid_from;
                
                //row.appendChild(valToColumn); 
                //valToColumn.innerText = response.valid_to;

                row.appendChild(btnColumn);
                btnColumn.appendChild(btnContainer);

                btnContainer.appendChild(editItem);                                                                             // pro zeile zu den jeweiligen datensätze butten zu editieren platzieren
                editItem.appendChild(editBtn);

                btnContainer.appendChild(delItem);
                delItem.appendChild(delBtn);                                                                                    // pro zeile zu den jeweiligen datensätze butten zu löschen platzieren
            }
        } else if (event.target.status == 404) {
            messagePa.innerText = "Die Seite wurde nicht gefunden!";
            location.href = "../view/login.php";
        } else if (event.target.status == 500) {
            messagePa.innerText = "Server Fehler!";
        } else {
            messagePa.innerText = "Beim laden der Produke ist Fehler auf geträten!";
        }
    }
    pageC = 1;
}

loadTableProduct();
