function Company(company) {
    let _name = company.name;
    let _owner = company.owner;
    let _maxCount = _checkForPositive(company.maxCompanySize) ? company.maxCompanySize : 3;
    let _employees = [];
    let _logs = "";
    let _timeWhenHired;
    let _timeWhenFired = null;

    (function _createCompanyLog() {
        _logs += `${_name} was created in ${Date()}`;
    })();

    function _checkForPositive(value) {
        return value > 0;
    }

    function _checkFreePlace() {
        return _employees.length < _maxCount;
    }

    function _returnIndexOfSmallestSalary() {
        let min = _employees[0].getSalary();
        let index = 0;
        for (let i = 0; i < _employees.length; i++){
            if (min > _employees[i].getSalary()){
                index = i;
                min = _employees[i].getSalary();
            }
        }
        return index;
    }
    
    function calculateWorkingTimeInCompany() {
        if(_timeWhenFired === null){
            let date = new Date();
            return calculateSubtractionInSeconds(date);
        }
        return calculateSubtractionInSeconds(_timeWhenFired);
    }

    function calculateSubtractionInSeconds(value) {
        return value.getSeconds() - _timeWhenHired.getSeconds();
    }

    this.addNewEmployee = function (employee) {
        if(employee instanceof Employee){
            if(_checkFreePlace()){
                let date = new Date();
                _employees.push(employee);
                employee.hire(_name);
                _logs += `\n${employee.getName()} starts working at ${_name} in ${date}`;
                _timeWhenHired = date;
            } else {
                this.removeEmployee(_returnIndexOfSmallestSalary());
                _employees.push(employee);
            }
        } else {
            console.log(`Please try to add Employee instance!`);
        }
    };

    this.removeEmployee = function (id) {
        if(id < _employees.length && id >= 0){
            let date = new Date();
            _employees[id].fire();
            _logs += `\n_${_employees[id].getName()} ends working at ${_name} in ${date}`;
            _employees.splice(id, 1);
            _timeWhenFired = date;
        } else {
            console.log(`Employee with id = ${id} does not exist!`);
        }
    };

    this.getAverageSalary = function () {
        let averageSalary = 0;
        _employees.forEach(function (employee) {
            averageSalary += employee.getSalary();
        });
        return averageSalary / _employees.length;
    };

    this.getEmployees = function () {
        let employeesArray = [];
        _employees.forEach(function (employee) {
            employeesArray.push(employee.getEmployee());
        });
        return employeesArray;
    };

    this.getFormattedListOfEmployees = function () {
        let employeesList = ``;
        _employees.forEach(function (employee) {
            employeesList += `${employee.getName()} - works in ${_name} ${calculateWorkingTimeInCompany()} seconds\n`;
        });
        return employeesList;
    };

    this.getAverageAge = function () {
        let averageAge = 0;
        _employees.forEach(function (employee) {
            averageAge += employee.getAge();
        });
        return averageAge / _employees.length;
    };

    this.getHistory = function () {
        return _logs;
    }
}

function Employee(employee) {
    let _name = employee.name;
    let _primarySkill = employee.primarySkill;
    let _age = employee.age;
    let _salary = employee.salary;
    let _companyName;
    let _logs = "";

    function _hiredToCompanyLog() {
        _logs = `${_name} is hired to ${_companyName} in ${Date()}`;
    }

    function _firedFromCompanyLog() {
        _logs = `${_name} is fired from ${_companyName} in ${Date()}`;
    }

    function _checkSalary(amount) {
        return amount > _salary;
    }

    this.getEmployee = function() {
        return {name: _name, age: _age, salary: _salary, primarySkill: _primarySkill};
    };

    this.getName = function () {
        return _name;
    };

    this.getAge = function () {
        return _age;
    };

    this.getSalary = function () {
        return _salary;
    };

    this.setSalary = function (amount) {
        if(_checkSalary(amount)){
            _logs += `\nchange salary from ${_salary} to ${amount}`;
            _salary = amount;
        } else {
            _logs += `\ntry to change salary from ${_salary} to ${amount}`;
            console.log(`You cannot set smaller salary than employee has now!`);
        }
    };

    this.getWorkTimeInSeconds = function () {

    };

    this.hire = function (name) {
        _companyName = name;
        _hiredToCompanyLog();
    };
    
    this.fire = function () {
        _firedFromCompanyLog();
        _companyName = ``;
    };

    this.getHistory = function () {
        return _logs;
    }
}


let artem = new Employee({name: "Artem", age: 15, salary: 1000, primarySkill: "UX"});
let vova = new Employee({name: "Vova", age: 16, salary: 2000, primarySkill: "BE"});
let vasyl = new Employee({name: "Vasyl", age: 25, salary: 1000, primarySkill: "FE"});
let ivan = new Employee({name: "Ivan", age: 35, salary: 5000, primarySkill: "FE"});
let orest = new Employee({name: "Orest", age: 29, salary: 300, primarySkill: "AT"});
let anton = new Employee({name: "Anton", age: 19, salary: 500, primarySkill: "Manager"});

let epam = new Company({name: "Epam", owner: "Arkadii", maxCompanySize: 5});
epam.addNewEmployee(artem);
epam.addNewEmployee(vova);
// epam.removeEmployee(0);
// epam.addNewEmployee(vasyl);
// epam.addNewEmployee(ivan);
// epam.addNewEmployee(orest);
// epam.addNewEmployee(anton);

// epam.getEmployees();
// epam.removeEmployee(0);
epam.getEmployees();
//
// anton.getProperties();
//
// epam.getAverageSalary();
console.log(epam.getAverageAge());
console.log(epam.getHistory());

setTimeout(() => {
    // console.log(epam.getFormattedListOfEmployees());
    epam.removeEmployee(0);
}, 5000);

epam.getEmployees();
// console.log(artem.getHistory());
// epam.removeEmployee(0);
//
// console.log(artem.getHistory());
// artem.setSalary(200);
// artem.setSalary(400);
// artem.setSalary(4000);
//
// console.log(artem.getHistory());
// console.log(artem.getHistory());
console.log(epam.getFormattedListOfEmployees());