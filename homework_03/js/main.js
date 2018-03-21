function Company(company) {
    let _name = company.name;
    let _owner = company.owner;
    let _maxCount = _checkForPositive(company.maxCompanySize) ? company.maxCompanySize : 3;
    let _employees = [];

    function _checkForPositive(value) {
        return value > 0;
    }

    function _checkFreePlace() {
        return _employees.length < _maxCount;
    }

    this.addNewEmployee = function (employee) {
        if(_checkFreePlace()){
            _employees.push(employee);
        } else {
            let min = _employees[0].getSalary();
            let index = 0;
            for (let i = 0; i < _employees.length; i++){
                if (min > _employees[i].getSalary()){
                    index = i;
                    min = _employees[i].getSalary();
                }
            }
            this.removeEmployee(index);
            _employees.push(employee);
        }
        
    };

    this.removeEmployee = function (id) {
        if(id < _employees.length && id >= 0){
            _employees.splice(id, 1);
        } else {
            console.log("Employee with id = " + id + " does not exist!")
        }
    };

    this.getAverageSalary = function () {
        let averageSalary = 0;
        _employees.forEach(function (employee) {
            averageSalary += employee.getSalary();
        });
        // return averageSalary / _employees.length;
        console.log(averageSalary / _employees.length);
    };

    this.getEmployees = function () {
        let employeesArray = [];
        _employees.forEach(function (employee) {
            employeesArray.push(employee.getProperties());
        });
        // return employeesArray;
        console.log(employeesArray);
        console.log();
    };

    this.getAverageAge = function () {
        let averageAge = 0;
        _employees.forEach(function (employee) {
            averageAge += employee.getAge();
        });
        // return averageSalary / _employees.length;
        console.log(averageAge / _employees.length);
    }
}

function Employee(employee) {
    let _name = employee.name;
    let _primarySkill = employee.primarySkill;
    let _age = employee.age;
    let _salary = employee.salary;

    function _checkSalary(amount) {
        return amount > _salary;
    }

    this.getProperties = function() {
        return {name: _name, age: _age, salary: _salary, primarySkill: _primarySkill};
    };

    this.getAge = function () {
        return _age;
    };

    this.getSalary = function () {
        // console.log(_salary);
        return _salary;
    };

    this.setSalary = function (amount) {
        if(_checkSalary(amount)){
            _salary = amount;
        } else {
            console.log("You cannot set smaller salary than employee has now!");
        }
    };
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
epam.addNewEmployee(anton);

epam.getEmployees();
// epam.removeEmployee(0);
epam.getEmployees();

anton.getProperties();

epam.getAverageSalary();
epam.getAverageAge();



