var employeeData = [
  {
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

const employees = (function () {
  let controls;
  let rowIndex = -1;

  function init() {
    _setupControls();
    _bindEvents();
    _setupTable();
    _filterDepartments();
  }

  function _setupControls() {
    controls = {
      table: document.getElementById("employees"),
      addEmployee: document.getElementById("addEmployee"), // button
      saveEmployee: document.getElementById("saveEmployee"), // save employee button on modal
      departmentSelect: document.getElementById("departmentSelect"),
    };
  }

  function _filterDepartments() {
    const departments = [
      ...new Set(employeeData.map((employee) => employee.Department)),
    ];

    for (let index = 0; index < departments.length; index++) {
      const department = departments[index];

      controls.departmentSelect.innerHTML += `<option id="${department}" value="${department}">${department}</option`;
    }

    console.log(departments);
  }

  function _bindEvents() {
    controls.addEmployee.addEventListener("click", () => {
      _openAddEmployeeModal();
    });
    
    controls.departmentSelect.addEventListener("change", () => {
      if (controls.departmentSelect.value != "") {
        // console.log(controls.departmentSelect.value);
        _setupTable(controls.departmentSelect.value);
      }
    });
  }

  function _setupTable(filter) {
    let newRow = controls.table.insertRow(rowIndex);
    let action = document.createElement("th");
    rowIndex++;

    for (let key in employeeData[0]) {
      let headerCell = document.createElement("th");
      headerCell.innerHTML = key;
      newRow.appendChild(headerCell);
    }

    action.classList.add("actions");
    action.innerHTML = "Actions";
    newRow.appendChild(action);

    for (let i = 0; i < employeeData.length; i++) {
      let row = controls.table.insertRow(++rowIndex);
      for (var key in employeeData[i]) {
        let dataCell = document.createElement("td");
        dataCell.innerHTML = employeeData[i][key];
        row.appendChild(dataCell);
      }

      _addActionButtons(row, rowIndex);
    }
  }

  function _addActionButtons(row, index) {
    let action = document.createElement("td"),
      deleteID = `delete_${index}`,
      editID = `edit_${index}`;

    action.classList.add("actions");
    action.innerHTML = `<span class='material-icons-outlined actionBtn' id="${deleteID}">delete</span>`;
    action.innerHTML += `<span class='material-icons-outlined actionBtn' data-edit="${index}" id="${editID}">edit</span>`;
    row.appendChild(action);

    document.getElementById(deleteID).addEventListener("click", function () {
      _deleteEmployee(index);
    });
    document.getElementById(editID).addEventListener("click", function () {
      _editEmployee(index);
    });
  }

  function _deleteEmployee(index) {
    employeeData.splice(index, 1);
    rowIndex--;

    var rowToDelete = document.getElementsByTagName("tr")[index];
    rowToDelete.remove();
  }

  function _editEmployee(index) {
    var thisEmployee = employeeData[index - 1];

    let NiNumber = document.getElementsByName("NiNumber")[0],
      FullName = document.getElementsByName("Full Name")[0],
      PhoneNumber = document.getElementsByName("Phone Number")[0],
      Address = document.getElementsByName("Address")[0],
      Department = document.getElementsByName("Department")[0];

    NiNumber.value = thisEmployee["NI Number"];
    FullName.value = thisEmployee["Full Name"];
    PhoneNumber.value = thisEmployee["Phone Number"];
    Address.value = thisEmployee["Address"];
    Department.value = thisEmployee["Department"];

    _openAddEmployeeModal(index);
  }

  function _openAddEmployeeModal(index) {
    //   let blackout = document.getElementsByClassName("blackout")[0];
    //   let main = document.getElementsByClassName("main")[0];
    //   main.classList.add("main--blackout");
    //   blackout.classList.add("blackout--show");
    let modal = document.getElementById("addModal");
    modal.classList.toggle("modal--open");

    controls.saveEmployee.addEventListener("click", () => {
      _submitAddEmployeeModal(index);
    });
  }

  function _addRow(employee) {
    let tr = controls.table.insertRow();
    rowIndex++;

    for (var key in employee) {
      let td = document.createElement("td");
      td.innerHTML = employee[key];
      tr.appendChild(td);
    }

    _addActionButtons(tr, rowIndex);
  }

  function _submitAddEmployeeModal(editIndex) {
    document.getElementById("addModal").classList.toggle("modal--open");
    let NiNumber = document.getElementsByName("NiNumber")[0],
      FullName = document.getElementsByName("Full Name")[0],
      PhoneNumber = document.getElementsByName("Phone Number")[0],
      Address = document.getElementsByName("Address")[0],
      Department = document.getElementsByName("Department")[0];

    var employee = {
      "NI Number": NiNumber.value,
      "Full Name": FullName.value,
      "Phone Number": PhoneNumber.value,
      Address: Address.value,
      Department: Department.value,
    };

    if (typeof editIndex == "number") {
      employeeData[editIndex - 1] = employee;
    } else {
      employeeData.push(employee);
      _addRow(employee);
    }

    document.querySelectorAll("tr").forEach(function (e) {
      e.remove();
    });

    rowIndex = -1;
    _setupTable();
  }

  init();
})();