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
        table.appendChild(delItem);
    }
}