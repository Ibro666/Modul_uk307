const form = document.getElementById("api-request");
const userName = document.getElementById("uname");

function loadFact() {
    let param = userName.value;

    var request = new XMLHttpRequest();
    request.open("GET", "https://api.nationalize.io?name="+param);
    //console.log(param);
    request.onload = loadedFact;
    request.send();

    //alert("function");
    function loadedFact(event) {
        //alert(event.target.responseText);
        var responseData = JSON.parse(event.target.responseText);
        document.getElementById("table").innerText = responseData.fact;
        //console.log(responseData.country.length);
        
        for (var i = 0; i < responseData.country.length; i++) {
            //var responseData = responseData.country[i];

            var row = document.createElement("tr");
            var idColumn = document.createElement("td");
            var probColumn = document.createElement("td");      

            table.appendChild(row);
        
            table.appendChild(idColumn);
            idColumn.innerText = responseData.country[i].country_id;
        
            table.appendChild(probColumn);
            probColumn.innerText = responseData.country[i].probability;
        }
    }
}