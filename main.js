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

const employees = function () {
    let controls;
    let rowIndex = -1;

    function init() {
        _setupControls();
        _bindEvents();
        _setupTable();
    }
    function _setupControls() {
        controls = { //centralised object for mapping add employee and save employee
            table: document.getElementById("employees"),
            addEmployee: document.getElementById("addEmployee"),
            saveEmployee: document.getElementById("saveEmployee"),
        };
    }

    function _bindEvents() {
        // document.getElementbyId("addEmployee").addEventListener("click", _openAddEmployeeModal); 
        controls.addEmployee.addEventListener("click", _openAddEmployeeModal);

        controls.saveEmployee.addEventListener("click", _submitAddEmployeeModal);
    }

    
    function _setupTable() {
        let tr = controls.table.insertRow(rowIndex); //table row is made
        let action = document.createElement("th"); //action needs to exist on every employee
        rowIndex++;

        for (let key in employeeData[0]) { //however many keys there are in the JSON object, create a table header and that table header should include the value 
            let th = document.createElement("th");
            th.innerHTML = key; 
            tr.appendChild(th); //add the value into the table row
        }

        action.classList.add("actions");
        action.innerHTML = "Actions";
        tr.appendChild(action);

        for (let i = 0; i < employeeData.length; i++) { //for however many employees there are, creates a table data element
            let row = controls.table.insertRow(++rowIndex);

            for (var key in employeeData[i]) {
                let td = document.createElement("td");
                td.innerHTML = employeeData[i][key];
                row.appendChild(td); //put the table data in the respective row
            }

            _addActionButtons(row, rowIndex);
        }
    }

    function _deleteEmployee(index) {
        employeeData.splice(index, 1); //deletes from the JSON object
        rowIndex--;

        var rowToDelete = document.getElementsByTagName("tr")[index]; //specifies a row to delete
        rowToDelete.remove(); //directly removes the row
    }

    function _editEmployee(index) {
        console.log(`Edit Employee ${index}`);
    }

    function _addActionButtons(row, index) {
        let action = document.createElement("td"), //creates table data tag
            deleteID = `delete_${index}`,//IDs set based on the entry's index
            editID = `edit_${index}`;

        action.classList.add("actions"); //adding the CSS class since the entire table is populated in JS
        action.innerHTML = `<span class='material-icons-outlined actionBtn' id="${deleteID}">delete</span>`; //uses google material icons for delete
        action.innerHTML += `<span class='material-icons-outlined actionBtn' id="${editID}">edit</span>`; //the same as above, but for edit
        row.appendChild(action);
//Tells the JS to react to any clicks on the edit or delete icons
        document.getElementById(deleteID).addEventListener("click", function() { _deleteEmployee(index)}); //calls delete employee function with whatever index from the JSON object
        document.getElementById(editID).addEventListener("click", function() { _editEmployee(index)});
    }

    function _addRow(employee) { //puts a new row in and increments the index
        let tr = controls.table.insertRow();
        rowIndex++;
    
        for (var key in employee) {
            let td = document.createElement("td");
            td.innerHTML = employee[key];
            tr.appendChild(td);
        }

        _addActionButtons(tr, rowIndex); //creates new action buttons (edit and delete) for the new rows
    }

    function _submitAddEmployeeModal() {
        document.getElementById("addModal").classList.toggle("modal--open"); 
        
        var employee = { //initialises input fields for new employee when modal is toggled
            "NI Number": document.getElementsByName("NiNumber")[0].value,
            "Full Name": document.getElementsByName("Full Name")[0].value,
            "Phone Number": document.getElementsByName("Phone Number")[0].value,
            Address: document.getElementsByName("Address")[0].value,
            Department: document.getElementsByName("Department")[0].value,
        };
    
        employeeData.push(employee);
        _addRow(employee);
    }

    function _openAddEmployeeModal() {
        let modal = document.getElementById("addModal");
        // let blackout = document.getElementsByClassName("blackout")[0];
        // let main = document.getElementsByClassName("main")[0];
        // main.classList.add("main--blackout");
        // blackout.classList.add("blackout--show");
        modal.classList.toggle("modal--open");
    }

    init(); //Initialises all functions

}();