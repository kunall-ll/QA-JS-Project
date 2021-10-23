var employeeData = [{
    "NINumber": "SC460395",
    "fullName": "Clark Kent",
    "phoneNumber": "+446969696969",
    "address": "20 streetville, metropolis",
    "department": "superhero"
}]


var employees = document.getElementById("employees");
//employees.innerHTML = employeeData.

for (let index = 0; index < employeeData.length; index++) {
    let thisEmployee = employeeData[index];
    employees.innerHTML += "<li>" + thisEmployee.NINumber + "";
    
}



console.log(employeeData);