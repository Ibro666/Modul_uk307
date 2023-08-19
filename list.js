var people = [
    {
        name: "Horst Henkelschwünkler",
        age:  56
    },
    {
        name: " Horst Wuppmann",
        age: 48
    }
];


var table = document.getElementById("people-table");

for (var i = 0; i < people.length; i++) {
    var persen = people[i];
    
    var personRow = document.createElement("tr");
    var personNameColumn = document.createElement("td");
    var personAgeColumn = document.createElement("td");

    table.appendChild(personRow);

    table.appendChild(personNameColumn);
    personNameColumn.innerText = persen.name;

    table.appendChild(personAgeColumn);
    personAgeColumn.innerText = persen.age;


    console.log(persen.name);
}