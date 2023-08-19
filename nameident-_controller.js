function loadFact(param) {
    var request = new XMLHttpRequest();
    request.open("GET", "https://api.nationalize.io/?name="+param);
    request.onload = loadedFact;
    request.send();
    
    //alert("finction");
    function loadedFact(event) {
        alert(event.target.responseText);
        var responseData = JSON.parse(event.target.responseText);
        //document.getElementById("table").innerText = responseData.fact;
        console.log(responseData);
        for (var i = 0; i < responseData.length; i++) {
            var responseData = responseData[i];
            
            var personRow = document.createElement("tr");
            var personNameColumn = document.createElement("td");
            var personAgeColumn = document.createElement("td");
        
            table.appendChild(personRow);
        
            table.appendChild(personNameColumn);
            personNameColumn.innerText = responseData.name;
        
            table.appendChild(personAgeColumn);
            personAgeColumn.innerText = responseData.age;
        
        
            console.log(responseData.name);
        }
    }
}