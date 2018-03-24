function Company({name: name, owner: owner, maxCompanySize: maxCompanySize}) {
    let _name = name;
    let _owner = owner;
    let _maxCount = (maxCompanySize > 0) ? maxCompanySize : 3;
    let _employees = [];
    let _logs = '';

    (function _createCompanyLog() {
        _logs += `${_name} was created in ${Date()}`;
    })();

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
            if(_employees.length === _maxCount){
                this.removeEmployee(_returnIndexOfSmallestSalary());
            }
            let date = new Date();
            _employees.push(employee);
            employee.hire(_name, date);
            _logs += `\n${employee.getName()} starts working at ${_name} in ${date}`;
        } else {
            console.log(`Please try to add Employee instance!`);
        }
    };

    this.removeEmployee = function (id) {
        if(!isNaN(id) && id < _employees.length && id >= 0){
            let date = new Date();
            _employees[id].fire(_name, date);
            _logs += `\n${_employees[id].getName()} ends working at ${_name} in ${date}`;
            _employees.splice(id, 1);
        } else {
            console.log(`Employee with id='${id}' does not exist!`);
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
            employeesString += `${employee.getName()} - works in ${_name} ` +
                               `${employee.getWorkTimeAtCompany(_name)} seconds\n`;
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

    function _hiredToCompanyLog(name) {
        _logs += `${_name} is hired to ${name} in ${Date()}\n`;
    }

    function _firedFromCompanyLog(name) {
        _logs += `${_name} is fired from ${name} in ${Date()}\n`;
    }

    function _checkSalary(amount) {
        return amount > _salary;
    }

    function _findCompanyName(name) {
        for(let i = 0; i < _time.length; i++){
            if(_time[i].companyName.toLocaleLowerCase() === name.toLowerCase()){
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
            _logs += `change salary from ${_salary} to ${amount}\n`;
            _salary = amount;
        } else if (!isNaN(amount)){
            _logs += `try to change salary from ${_salary} to ${amount}\n`;
            console.log(`You cannot set smaller salary than ${_name} has now!`);
        }
    };

    this.hire = function (name, date) {
        _time.push({'companyName': name, 'timeWhenHired': date});
        _companyName = name;
        _hiredToCompanyLog(name);
    };
    
    this.fire = function (name, date) {
        _firedFromCompanyLog(name);
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


let artem = new Employee({name: 'Artem', age: 15, salary: 1000, primarySkill: 'UX'});
let vova = new Employee({name: 'Vova', age: 16, salary: 2000, primarySkill: 'BE'});
let vasyl = new Employee({name: 'Vasyl', age: 25, salary: 1000, primarySkill: 'FE'});
let ivan = new Employee({name: 'Ivan', age: 35, salary: 5000, primarySkill: 'FE'});
let orest = new Employee({name: 'Orest', age: 29, salary: 300, primarySkill: 'AT'});
let anton = new Employee({name: 'Anton', age: 19, salary: 500, primarySkill: 'Manager'});

let epam = new Company({name: 'Epam', owner: 'Arkadii', maxCompanySize: 5});
epam.addNewEmployee(artem);
epam.addNewEmployee(vova);
epam.addNewEmployee(vasyl);
epam.addNewEmployee(ivan);
epam.addNewEmployee(orest);
epam.addNewEmployee(anton);

console.log(`> 1. epam.getHistory()`);
console.log(epam.getHistory());

console.log(`\n> 2. epam.getEmployees()`);
console.log(epam.getEmployees());

console.log(`\n> 3. epam.removeEmployee(2), vasyl.getHistory()`);
epam.removeEmployee('h');
epam.removeEmployee(2); //remove Vasyl
console.log(vasyl.getHistory());

console.log(`\n> 4. epam.getAverageSalary()`);
console.log(epam.getAverageSalary());

console.log(`\n> 5. epam.getAverageAge()`);
console.log(epam.getAverageAge());

console.log(`\n> 6. epam.addNewEmployee(5,6,9,5)`); //trying to add NOT Employee instance
epam.addNewEmployee(5,6,9,5);

setTimeout(() => {
    console.log(`\n> 9. epam.removeEmployee(0), artem.getWorkTimeInSeconds() `);
    epam.removeEmployee(0); //remove Artem
    console.log(artem.getWorkTimeInSeconds());
    console.log(artem.getHistory());
}, 5000);

console.log(`\n> 7. vova.setSalary()`);
vova.setSalary(900); // set wrong salary
vova.setSalary('salary'); //ignore
vova.setSalary(2500);
console.log(vova.getHistory());

console.log(`\n> 8. vova.getSalary()`);
console.log(vova.getSalary());

let someCompany = new Company({name: 'SomeCompany', owner: 'Owner', maxCompanySize:4});
someCompany.addNewEmployee(ivan);
setTimeout(() => {
    console.log(`\n> 10. ivan.getWorkTimeInSeconds()`);
    epam.removeEmployee(2); //remove Ivan from Epam
    console.log(ivan.getWorkTimeAtCompany(`Epam`));
    console.log(ivan.getWorkTimeAtCompany(`someCOMPANY`)); //ignore case
    console.log(ivan.getWorkTimeAtCompany(`WrongCompany`));
    console.log(ivan.getWorkTimeInSeconds()); //total time
}, 5000);

setTimeout(() => {
    console.log(`\n> 11. epam.getFormattedListOfEmployees()`);
    console.log(epam.getFormattedListOfEmployees());
}, 5000);