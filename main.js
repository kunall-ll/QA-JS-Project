var employeeData = [{
        "NI Number": "SC460395",
        "Full Name": "Clark Kent",
        "Phone Number": "+446969696969",
        "Address": "20 streetville, metropolis",
        "Department": "superhero"
    },
    {
        "NI Number": "SC460395",
        "Full Name": "Clark Kent",
        "Phone Number": "+446969696969",
        "Address": "20 streetville, metropolis",
        "Department": "superhero"
    }
]

var table = document.getElementById("employees")

createTableHeaders(table);
createTableData(table);

function createTableHeaders(table) {
    let tr = table.insertRow(-1);

    for (let key in employeeData[0]) {
        let th = document.createElement("th");
        th.innerHTML = key;
        tr.appendChild(th);
    }
}

function createTableData(table) {
    for (let i = 0; i < employeeData.length; i++) {
        let tr = table.insertRow(i + 1);

        for (var data in employeeData[i]) {
            let td = document.createElement("td");
            td.innerHTML = employeeData[i][data];
            tr.appendChild(td);
        }
    }
}

var addEmployee = document.getElementById("addEmployee");
var saveEmployee = document.getElementById("saveEmployee");

saveEmployee.addEventListener("click", function () {
    document.getElementById("addModal").classList.toggle("modal--open");
    saveEmployeeDetails();
});

addEmployee.addEventListener("click", function () {
    let modal = document.getElementById("addModal");
    modal.classList.toggle("modal--open");
});

function saveEmployeeDetails() {
    var employee = {
        "NI Number": document.getElementsByName("NiNumber")[0].value,
        "Full Name": document.getElementsByName("Full Name")[0].value,
        "Phone Number": document.getElementsByName("Phone Number")[0].value,
        "Address": document.getElementsByName("Address")[0].value,
        "Department": document.getElementsByName("Department")[0].value
    };

    employeeData.push(employee);

    let table = document.getElementById("employees");

    addRow(table, employee);
}

function addRow(table, employee) {
    let tr = table.insertRow();

    for (var data in employee) {
        let td = document.createElement("td");
        td.innerHTML = employee[data];
        tr.appendChild(td);
    }
}
