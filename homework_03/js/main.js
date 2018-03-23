function Company({name: name, owner: owner, maxCompanySize: maxCompanySize}) {
    let _name = name;
    let _owner = owner;
    let _maxCount = _checkForPositive(maxCompanySize) ? maxCompanySize : 3;
    let _employees = [];
    let _logs = '';

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

    this.addNewEmployee = function (employee) {
        if(employee instanceof Employee){
            if(_checkFreePlace()){
                let date = new Date();
                _employees.push(employee);
                employee.hire(_name, date);
                _logs += `\n${employee.getName()} starts working at ${_name} in ${date}`;
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
            _employees[id].fire(_name, date);
            _logs += `\n_${_employees[id].getName()} ends working at ${_name} in ${date}`;
            _employees.splice(id, 1);
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
        let employeesString = '';
        _employees.forEach(function (employee) {
            employeesString += `${employee.getName()} - works in ${_name} ${employee.getWorkTimeAtCompany(_name)} seconds\n`;
        });
        return employeesString;
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

function Employee({name: name, age: age, salary: salary, primarySkill: primarySkill}) {
    let _name = name;
    let _primarySkill = primarySkill;
    let _age = age;
    let _salary = salary;
    let _companyName;
    let _logs = '';
    let _time = [];
    let _totalTime = 0;

    function _hiredToCompanyLog() {
        _logs += `${_name} is hired to ${_companyName} in ${Date()}`;
    }

    function _firedFromCompanyLog() {
        _logs += `${_name} is fired from ${_companyName} in ${Date()}`;
    }

    function _checkSalary(amount) {
        return amount > _salary;
    }

    function _findCompanyName(name) {
        for(let i = 0; i < _time.length; i++){
            if(_time[i].companyName === name){
                return _time[i];
            }
        }
    }

    this.getWorkTimeAtCompany = function (name) {
        let tmp = _findCompanyName(name);
        if (tmp === undefined) {
            return `Company does not exist!`;
        } else {
            if (tmp.timeWhenFired) {
                return (tmp.timeWhenFired - tmp.timeWhenHired) / 1000;
            }
            return (new Date() - tmp.timeWhenHired) / 1000;
        }
    };

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

    this.hire = function (name, date) {
        _time.push({'companyName': name, 'timeWhenHired': date});
        _companyName = name;
        _hiredToCompanyLog();
    };
    
    this.fire = function (name, date) {
        _firedFromCompanyLog();
        _companyName = '';
        _findCompanyName(name)['timeWhenFired'] = date;
    };

    this.getHistory = function () {
        return _logs;
    };

    this.getWorkTimeInSeconds = function () {
        for(let i = 0; i < _time.length; i++){
            _totalTime += this.getWorkTimeAtCompany(_time[i].companyName);
        }
        return _totalTime;
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
epam.addNewEmployee(vasyl);
epam.addNewEmployee(ivan);
epam.addNewEmployee(orest);

setTimeout(() => {
    epam.removeEmployee(0);
    console.log(artem.getWorkTimeInSeconds()); // -> 5.5744444444444445
}, 5000);