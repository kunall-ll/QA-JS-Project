var employeeData = [{
        "NI Number": "SC460395",
        "Full Name": "Clark Kent",
        "Phone Number": "+44 7700 900472",
        Address: "344 Clinton Street, Metropolis",
        Department: "Superhero",
    },
    {
        "NI Number": "LP562560",
        "Full Name": "Harley Quinn",
        "Phone Number": "+44 7700 900902",
        Address: "93 Timm Street, Little Santa Prisca",
        Department: "Villain",
    },
    {
        "NI Number": "EY626528",
        "Full Name": "Peter Parker",
        "Phone Number": "+44 7700 900309",
        Address: "8839 69th Road, Central Queens",
        Department: "Superhero",
    },
];
//immediately invoking function expression so global scope isn't polluted
const employees = (function () {
    let controls,
        niNumber = document.getElementById("niNumber"),
        fullName = document.getElementById("fullName"),
        phoneNumber = document.getElementById("phoneNumber"),
        address = document.getElementById("address"),
        department = document.getElementById("department"),
        inputs = [niNumber, fullName, phoneNumber, address, department]; //puts the variables in an array so each can be referred to as an index
    
    function _setupControls() { //centralised object for mapping
        controls = {
            addEmployee: document.getElementById("addEmployee"),
            addModal: document.getElementById("addModal"),
            departmentSelect: document.getElementById("departmentSelect"),
            saveEmployee: document.getElementById("saveEmployee"),
            table: document.getElementById("employees")
        };
    }

    function _bindEvents() { //looks for clicks on add employee, and toggles the modal on and off
        controls.addEmployee.addEventListener("click", () => {
            _showHideModal();
        });
        controls.saveEmployee.addEventListener("click", () => { //looks for clicks when saving new employee
            _saveEmployee();
        });

        controls.departmentSelect.addEventListener("change", () => { //looks for whenever there is a change in the drop down bar
            controls.table.querySelectorAll("tr").forEach(function (e) { //selects all the rows in the table
                e.remove(); //and removes them
            });
            _setupTable(controls.departmentSelect.value); //shows whatever department is selected
        });
    }



    function _setupActions(row) { //sets up the column for the edit and delete icons with their event listeners and modals
        let actionColumn = document.createElement("td");

        actionColumn.classList.add("actions");
        actionColumn.innerHTML = `<span class='material-icons-outlined actionBtn deleteBtn'>delete</span>`;
        actionColumn.innerHTML += `<span class='material-icons-outlined actionBtn editBtn'>edit</span>`;
        row.appendChild(actionColumn);

        actionColumn.querySelector(".deleteBtn").addEventListener("click", event => {
            _removeRow(event);
        });

        actionColumn.querySelector(".editBtn").addEventListener("click", event => {
            _showHideModal(event.target.closest("tr"));
        });
    }

    function _removeRow(e) {
        let row = e.target.closest("tr");

        employeeData = employeeData.filter(employee => employee["NI Number"] !== row.cells[0].innerText); //NI no. used as unique identifier to remove a specific employee

        row.remove(); 
    }

    function _setupFilterDepartments() {
        const departments = [
            ...new Set(employeeData.map((employee) => employee.Department)), //gets distinct departments from employee data to be used in drop down filter
        ];

        for (let index = 0; index < departments.length; index++) {
            const department = departments[index];

            controls.departmentSelect.innerHTML += `<option id="${department}" value="${department}">${department}</option`; //shows the department options in the drop down list without overriding
        }
    }

    function _showHideModal(row) { //passes the row
        if (row) {
            for (const [index, cell] of [...row.cells].entries()) { //loops over all the data entries in the row
                if (!cell.classList.contains("actions")) {
                    inputs[index].value = cell.innerText; //populates the data fields in the modal with the employee info
                }
            }
            row.classList.toggle("editing");
            controls.saveEmployee.setAttribute('data-edit', 'true'); //used for when saving the employee
        } else {
            delete controls.saveEmployee.dataset.edit;
        }

        document.getElementById("addModal").classList.toggle("modal--open"); //toggles the modal
    }

    function _setupHeaders() { 
        let headerRow = controls.table.insertRow(-1),
            actionRow = document.createElement("th");
        //dynamically creates headers
        for (let key in employeeData[0]) {
            let headerCell = document.createElement("th");
            headerCell.innerHTML = key;
            headerRow.appendChild(headerCell);
        }

        actionRow.classList.add("actions");
        actionRow.innerHTML = "Actions";
        headerRow.appendChild(actionRow);
    }

    function _init() { //function that's called as soon as the iife is invoked
        _setupControls();
        _bindEvents();
        _setupTable();
        _setupFilterDepartments();
    }

    function _setupTable(filter) {
        let employees = employeeData;

        _setupHeaders(); //creates table headers regardless of filter

        if (filter) { //filters based on department selected
            employees = employeeData.filter(employee => employee.Department == filter)
        }
        //creates all the table data using the employees
        for (let i = 0; i < employees.length; i++) { 
            let row = controls.table.insertRow();

            for (var key in employees[i]) { 
                let dataCell = document.createElement("td");
                dataCell.innerHTML = employees[i][key];
                row.appendChild(dataCell); 
            }

            _setupActions(row);
        }
    }

    function _saveEmployee() {
        if (controls.saveEmployee.dataset.edit === "true") { //when saving an edited employee

            let row = document.getElementsByClassName("editing")[0];
            //edits the cell data for said employee with the data entered in the modal
            for (const [index, cell] of [...row.cells].entries()) {
                if (!cell.classList.contains("actions")) {
                    cell.innerText = inputs[index].value;
                }
            }

            row.classList.remove("editing");
        } else {
            let employee = {};

            for (const input of [...inputs]) {
                employee[input.placeholder] = input.value;
            }

            employeeData.push(employee);
            _addRow(employee);
        }

        document.getElementById("addModal").classList.toggle("modal--open");
        delete controls.saveEmployee.dataset.edit;
    }

    function _addRow(employee) {
        let row = controls.table.insertRow(); 

        for (var key in employee) {
            let dataCell = document.createElement("td"); //for every key, make a new columm
            dataCell.innerHTML = employee[key]; //in that column, put the value in
            row.appendChild(dataCell); //data cell should be in that SAME row
        }
        //rebuilds the drop down in case a new department is added
        controls.departmentSelect.querySelectorAll("option").forEach(function (e) {
            if (e.value !== "") {
                e.remove();
            }
        });

        _setupFilterDepartments();

        _setupActions(row);
    }

    _init();
})();